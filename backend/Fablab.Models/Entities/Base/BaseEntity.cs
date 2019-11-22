using System.ComponentModel.DataAnnotations;

namespace Fablab.Models.Entities.Base
{
    public class BaseEntity
    {
        [Key] public int Id { get; set; }
    }
}