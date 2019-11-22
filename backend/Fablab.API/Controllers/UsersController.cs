using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Principal;
using System.Threading.Tasks;
using Fablab.Base;
using Fablab.Data;
using Fablab.Data.BizLogic;
using Fablab.Data.Dtos.Student;
using Fablab.Data.Dtos.User;
using Fablab.Data.Payload;
using Fablab.Data.Proxies;
using Fablab.Data.Utils;
using Fablab.Models;
using Fablab.Models.Entities;
using Fablab.Models.JWT;
using GenericBizRunner;
using GenericServices;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

namespace Fablab.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        /// <summary>
        ///     A referência para o banco de dados
        /// </summary>
        private readonly FablabDBContext _context;

        /// <summary>
        ///     Construtor padrão
        /// </summary>
        public UsersController(FablabDBContext context)
        {
            _context = context;
        }

        /// <summary>
        ///     Método que autentica um usuário
        /// </summary>
        /// <param name="loginPayload">As informações de Login</param>
        /// <param name="signingConfigurations">As configurações do JWT</param>
        /// <param name="tokenConfigurations">As configurações do Token do JWT</param>
        /// <returns></returns>
        [ProducesResponseType(typeof(TokenProxy), 200)]
        [HttpPost("Auth")]
        [AllowAnonymous]
        public async Task<ActionResult<TokenProxy>> Authenticate(
            [FromBody] LoginPayload loginPayload,
            [FromServices] SigningConfigurations signingConfigurations,
            [FromServices] TokenConfigurations tokenConfigurations
        )
        {
            var user = await _context.Set<User>().FirstOrDefaultAsync(u => u.Email == loginPayload.Email);

            if (user == null)
                return StatusCode(404, new
                {
                    Message = "O usuário com esse e-mail não foi encontrado",
                    Status = 404
                });

            if (user.Password != loginPayload.Password.HashMD5())
                return BadRequest(new
                {
                    Message = "A senha está incorreta.",
                    Status = 400
                });

            var identity = new ClaimsIdentity(
                new[]
                {
                    new Claim(ClaimTypes.Name, user.Id.ToString()),
                    new Claim(ClaimTypes.Role, user.Roles)
                }
            );

            var dataCriacao = DateTime.Now;
            var dataExpiracao = dataCriacao + TimeSpan.FromSeconds(tokenConfigurations.Seconds);

            var handler = new JwtSecurityTokenHandler();
            var securityToken = handler.CreateToken(new SecurityTokenDescriptor
            {
                Issuer = tokenConfigurations.Issuer,
                Audience = tokenConfigurations.Audience,
                SigningCredentials = signingConfigurations.SigningCredentials,
                Subject = identity,
                NotBefore = dataCriacao,
                Expires = dataExpiracao
            });

            var token = handler.WriteToken(securityToken);


            return StatusCode(200, new TokenProxy
            {
                Created = dataCriacao.ToString("yyyy-MM-dd HH:mm:ss"),
                Expiration = dataExpiracao.ToString("yyyy-MM-dd HH:mm:ss"),
                Token = $"Bearer {token}"
            });
        }

        /// <summary>
        ///     Método que retorna todas as entidades
        /// </summary>
        /// <param name="service">O serviço que lida com as entidades</param>
        /// <returns></returns>
        [HttpGet]
        [Authorize(Roles = "admin")]
        public async Task<ActionResult<WebApiMessageAndResult<List<User>>>> GetManyAsync(
            [FromServices] ICrudServices service)
        {
            return service.Response(await service.ReadManyNoTracked<User>().ToListAsync());
        }

        /// <summary>
        ///     Método que retorna apenas uma entidade
        /// </summary>
        /// <param name="id">A identificação da entidade</param>
        /// <param name="service">O serviço que lida com as entidades</param>
        /// <returns></returns>
        [HttpGet("{id}", Name = "GetSingleUser")]
        [Authorize(Roles = "admin")]
        public async Task<ActionResult<WebApiMessageAndResult<User>>> GetSingleAsync(int id,
            [FromServices] ICrudServicesAsync service)
        {
            return service.Response(await service.ReadSingleAsync<User>(id));
        }

        /// <summary>
        ///     Método que cria uma entidade
        /// </summary>
        /// <param name="item">As informações para criar essa entidade</param>
        /// <param name="service">O serviço que lida com as entidades</param>
        /// <returns></returns>
        [ProducesResponseType(typeof(User), 201)]
        [HttpPost]
        [AllowAnonymous]
        public ActionResult<User> Post(CreateUserDTO item, [FromServices] IActionService<ICreateUserBizLogic> service)
        {
            var result = service.RunBizAction<User>(item);

            return service.Status.Response(this, "GetSingleUser", new {id = result?.Id}, result);
        }

        /// <summary>
        ///     Método usado para deletar uma entidade
        /// </summary>
        /// <param name="id">A identificação da entidade que será removida</param>
        /// <param name="service">O serviço que lida com as entidades</param>
        /// <returns></returns>
        [HttpDelete("{id}")]
        [Authorize(Roles = "admin")]
        public ActionResult<WebApiMessageOnly> Delete(int id, [FromServices] ICrudServices service)
        {
            service.DeleteAndSave<User>(id);

            return service.Response();
        }
    }
}