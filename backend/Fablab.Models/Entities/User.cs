using Fablab.Models.Entities.Base;

namespace Fablab.Models.Entities
{
    public class User : BaseEntity
    {
        public string Email { get; set; }
        public string Password { get; set; }
        public string Roles { get; set; }
    }
}