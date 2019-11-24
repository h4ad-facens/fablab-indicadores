using Fablab.Data.Dtos.Member;
using Fablab.Models;
using Fablab.Models.Entities;
using GenericBizRunner;

namespace Fablab.Data.BizLogic
{
    public interface ICreateMemberBizLogic : IGenericActionWriteDb<CreateMemberDto, Member> { }

    public class CreateMemberBizLogic : BizActionStatus, ICreateMemberBizLogic
    {
        private readonly FablabDBContext _context;

        public CreateMemberBizLogic(FablabDBContext context)
        {
            _context = context;
        }

        public Member BizAction(CreateMemberDto inputData)
        {
            var item = new Member
            {
                Age = inputData.Age,
                Job = inputData.Job,
                Name = inputData.Name,
                Tags = inputData.Tags,
                Group = inputData.Group,
                Phone = inputData.Phone,
                Email = inputData.Email,
                Gender = inputData.Gender,
                Address = inputData.Address,
                Website = inputData.Website,
                Twitter = inputData.Twitter,
                Facebook = inputData.Facebook,
                Interest = inputData.Interest,
                Projects = inputData.Projects,
                Last_name = inputData.Last_name,
                Signature = inputData.Signature,
                Newsletter = inputData.Newsletter,
                Cad_software = inputData.Cad_software,
                Invoice_disabled = inputData.Invoice_disabled,
                Validated_training = inputData.Validated_training,
                Number_Invoices = inputData.Number_Invoices,
                Ecocience = inputData.Ecocience,
                Organization = inputData.Organization,
                Organization_Address = inputData.Organization_Address,
                Aux_Group = inputData.Aux_Group,
                Aux_Training = inputData.Aux_Training,
                Aux_Group_Training = inputData.Aux_Group_Training
            };
            
            _context.Add(item);
            
            Message = "A entidade foi criada com sucesso.";
            
            return item;
        }
    }
}