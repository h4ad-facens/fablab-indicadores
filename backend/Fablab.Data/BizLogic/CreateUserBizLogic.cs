using System.Data;
using System.Linq;
using Fablab.Data.Dtos.User;
using Fablab.Data.Utils;
using Fablab.Models;
using Fablab.Models.Entities;
using GenericBizRunner;

namespace Fablab.Data.BizLogic
{
    public interface ICreateUserBizLogic : IGenericActionWriteDb<CreateUserDTO, User> { }

    public class CreateUserBizLogic : BizActionStatus, ICreateUserBizLogic
    {
        private readonly FablabDBContext _context;

        public CreateUserBizLogic(FablabDBContext context)
        {
            _context = context;
        }

        public User BizAction(CreateUserDTO inputData)
        {
            if (_context.Set<User>().Any(user => user.Email == inputData.Email))
                throw new InvalidConstraintException("Já existe um usuário com esse e-mail");
            
            var item = new User
            {
                Email = inputData.Email,
                Password = inputData.Password.HashMD5(),
                Roles = "user"
            };
            
            _context.Add(item);
            
            Message = "A entidade foi criada com sucesso.";
            
            return item;
        }
    }
}