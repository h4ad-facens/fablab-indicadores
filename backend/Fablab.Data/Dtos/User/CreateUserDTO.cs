using System.ComponentModel.DataAnnotations;

namespace Fablab.Data.Dtos.User
{
    public class CreateUserDTO
    {
        [Required(ErrorMessage = "É necessário enviar o e-mail do usuário.")]
        public string Email { get; set; }
        
        [Required(ErrorMessage = "É necessário enviar a senha do usuário.")]
        public string Password { get; set; }
    }
}