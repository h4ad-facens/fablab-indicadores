using System.ComponentModel.DataAnnotations;
using GenericServices;

namespace Fablab.Data.Dtos.User
{
    public class ChangeUserDTO : ILinkToEntity<Models.Entities.User>
    {
        [Required]
        public int Id { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
    }
}