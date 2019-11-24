using System.Collections.Generic;
using System.Threading.Tasks;
using Fablab.Base;
using Fablab.Data;
using Fablab.Data.BizLogic;
using Fablab.Data.Dtos.Member;
using Fablab.Models;
using Fablab.Models.Entities;
using GenericBizRunner;
using GenericServices;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Fablab.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class MembersController : ControllerBase
    {
        /// <summary>
        ///     A referência para o banco de dados
        /// </summary>
        private readonly FablabDBContext _context;

        /// <summary>
        ///     Construtor padrão
        /// </summary>
        public MembersController(FablabDBContext context)
        {
            _context = context;
        }

        /// <summary>
        ///     Método que retorna todas as entidades
        /// </summary>
        /// <param name="service">O serviço que lida com as entidades</param>
        /// <returns></returns>
        [HttpGet]
        public async Task<ActionResult<WebApiMessageAndResult<List<Member>>>> GetManyAsync(
            [FromServices] ICrudServices service)
        {
            return service.Response(await service.ReadManyNoTracked<Member>().ToListAsync());
        }

        /// <summary>
        ///     Método que retorna apenas uma entidade
        /// </summary>
        /// <param name="id">A identificação da entidade</param>
        /// <param name="service">O serviço que lida com as entidades</param>
        /// <returns></returns>
        [HttpGet("{id}", Name = "GetSingleMember")]
        public async Task<ActionResult<WebApiMessageAndResult<Member>>> GetSingleAsync(int id,
            [FromServices] ICrudServicesAsync service)
        {
            return service.Response(await service.ReadSingleAsync<Member>(id));
        }

        /// <summary>
        ///     Método que cria uma entidade
        /// </summary>
        /// <param name="item">As informações para criar essa entidade</param>
        /// <param name="service">O serviço que lida com as entidades</param>
        /// <returns></returns>
        [ProducesResponseType(typeof(Member), 201)]
        [HttpPost]
        public ActionResult<Member> Post(CreateMemberDto item, [FromServices] IActionService<ICreateMemberBizLogic> service)
        {
            var result = service.RunBizAction<Member>(item);

            return service.Status.Response(this, "GetSingleMember", new {id = result?.Id}, result);
        }

        /// <summary>
        ///     Método usado para atualizar uma entidade
        /// </summary>
        /// <param name="dto">As informações para a alteração da entidade</param>
        /// <param name="service">O serviço que lida com as entidades</param>
        /// <returns></returns>
        [Route("")]
        [HttpPut]
        public async Task<ActionResult<WebApiMessageOnly>> Update(ChangeMemberDto dto, [FromServices] ICrudServices service)
        {
            var member = await _context.Set<Member>().FirstOrDefaultAsync(m => m.Id == dto.Id);
            
            if (member == null)
                return StatusCode(404, new
                {
                    Message = "O membro com essa identificação não foi encontrado",
                    Status = 404
                });

            member.Age = dto.Age ?? member.Age;
            member.Email = dto.Email ?? member.Email;
            member.Job = dto.Job ?? member.Job;
            member.Name = dto.Name ?? member.Name;
            member.Tags = dto.Tags ?? member.Tags;
            member.Group = dto.Group ?? member.Group;
            member.Phone = dto.Phone ?? member.Phone;
            member.Gender = dto.Gender ?? member.Gender;
            member.Address = dto.Address ?? member.Address;
            member.Twitter = dto.Twitter ?? member.Twitter;
            member.Website = dto.Website ?? member.Website;
            member.Facebook = dto.Facebook ?? member.Facebook;
            member.Interest = dto.Interest ?? member.Interest;
            member.Projects = dto.Projects ?? member.Projects;
            member.Last_name = dto.Last_name ?? member.Last_name;
            member.Signature = dto.Signature ?? member.Signature;
            member.Newsletter = dto.Newsletter ?? member.Newsletter;
            member.Cad_software = dto.Cad_software ?? member.Cad_software;
            member.Invoice_disabled = dto.Invoice_disabled ?? member.Invoice_disabled;
            member.Validated_training = dto.Validated_training ?? member.Validated_training;
            member.Number_Invoices = dto.Number_Invoices ?? member.Number_Invoices;
            member.Ecocience = dto.Ecocience ?? member.Ecocience;
            member.Organization = dto.Organization ?? member.Organization;
            member.Organization_Address = dto.Organization_Address ?? member.Organization_Address;
            member.Aux_Group = dto.Aux_Group ?? member.Aux_Group;
            member.Aux_Training = dto.Aux_Training ?? member.Aux_Training;
            member.Aux_Group_Training = dto.Aux_Group_Training ?? member.Aux_Group_Training;
            
            service.UpdateAndSave(member);
            
            return service.Response();
        }

        /// <summary>
        ///     Método usado para deletar uma entidade
        /// </summary>
        /// <param name="id">A identificação da entidade que será removida</param>
        /// <param name="service">O serviço que lida com as entidades</param>
        /// <returns></returns>
        [HttpDelete("{id}")]
        public ActionResult<WebApiMessageOnly> Delete(int id, [FromServices] ICrudServices service)
        {
            service.DeleteAndSave<Member>(id);

            return service.Response();
        }
    }
}