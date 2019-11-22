using Fablab.Data.Dtos.Student;
using Fablab.Models;
using Fablab.Models.Entities;
using GenericBizRunner;

namespace Fablab.Data.BizLogic
{
    public interface ICreateStudentBizLogic : IGenericActionWriteDb<CreateStudentDto, Student> { }

    public class CreateStudentBizLogic : BizActionStatus, ICreateStudentBizLogic
    {
        private readonly FablabDBContext _context;

        public CreateStudentBizLogic(FablabDBContext context)
        {
            _context = context;
        }

        public Student BizAction(CreateStudentDto inputData)
        {
            var item = new Student
            {
                Age = inputData.Age,
                Name = inputData.Name,
                Phone = inputData.Phone,
                Email = inputData.Email,
                Gender = inputData.Gender,
                Date = inputData.Date,
                Type = inputData.Type,
                Month = inputData.Month,
                Invoice = inputData.Invoice
            };
            
            _context.Add(item);
            
            Message = "A entidade foi criada com sucesso.";
            
            return item;
        }
    }
}