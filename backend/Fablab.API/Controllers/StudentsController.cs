using System.Collections.Generic;
using System.Threading.Tasks;
using Fablab.Base;
using Fablab.Data;
using Fablab.Data.BizLogic;
using Fablab.Data.Dtos.Student;
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
    public class StudentsController : ControllerBase
    {
        /// <summary>
        ///     A referência para o banco de dados
        /// </summary>
        private readonly FablabDBContext _context;

        /// <summary>
        ///     Construtor padrão
        /// </summary>
        public StudentsController(FablabDBContext context)
        {
            _context = context;
        }

        /// <summary>
        ///     Método que retorna todas as entidades
        /// </summary>
        /// <param name="service">O serviço que lida com as entidades</param>
        /// <returns></returns>
        [HttpGet]
        public async Task<ActionResult<WebApiMessageAndResult<List<Student>>>> GetManyAsync(
            [FromServices] ICrudServices service)
        {
            return service.Response(await service.ReadManyNoTracked<Student>().ToListAsync());
        }

        /// <summary>
        ///     Método que retorna apenas uma entidade
        /// </summary>
        /// <param name="id">A identificação da entidade</param>
        /// <param name="service">O serviço que lida com as entidades</param>
        /// <returns></returns>
        [HttpGet("{id}", Name = "GetSingleStudent")]
        public async Task<ActionResult<WebApiMessageAndResult<Student>>> GetSingleAsync(int id,
            [FromServices] ICrudServicesAsync service)
        {
            return service.Response(await service.ReadSingleAsync<Student>(id));
        }

        /// <summary>
        ///     Método que cria uma entidade
        /// </summary>
        /// <param name="item">As informações para criar essa entidade</param>
        /// <param name="service">O serviço que lida com as entidades</param>
        /// <returns></returns>
        [ProducesResponseType(typeof(Student), 201)]
        [HttpPost]
        public ActionResult<Student> Post(CreateStudentDto item, [FromServices] IActionService<ICreateStudentBizLogic> service)
        {
            var result = service.RunBizAction<Student>(item);

            return service.Status.Response(this, "GetSingleStudent", new {id = result?.Id}, result);
        }

        /// <summary>
        ///     Método usado para atualizar uma entidade
        /// </summary>
        /// <param name="dto">As informações para a alteração da entidade</param>
        /// <param name="service">O serviço que lida com as entidades</param>
        /// <returns></returns>
        [Route("")]
        [HttpPut]
        public async Task<ActionResult<WebApiMessageOnly>> Update(ChangeStudentDto dto, [FromServices] ICrudServices service)
        {
            var student = await _context.Set<Student>().FirstOrDefaultAsync(m => m.Id == dto.Id);
            
            if (student == null)
                return StatusCode(404, new
                {
                    Message = "O membro com essa identificação não foi encontrado",
                    Status = 404
                });

            student.Age = dto.Age ?? student.Age;
            student.Date = dto.Date ?? student.Date;
            student.Name = dto.Name ?? student.Name;
            student.Type = dto.Type ?? student.Type;
            student.Email = dto.Email ?? student.Email;
            student.Month = dto.Month ?? student.Month;
            student.Phone = dto.Phone ?? student.Phone;
            student.Gender = dto.Gender ?? student.Gender;
            student.Invoice = dto.Invoice ?? student.Invoice;
            
            service.UpdateAndSave(student);
            
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
            service.DeleteAndSave<Student>(id);

            return service.Response();
        }
    }
}