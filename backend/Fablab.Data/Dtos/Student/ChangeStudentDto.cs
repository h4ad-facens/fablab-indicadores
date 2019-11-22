using System;
using System.ComponentModel.DataAnnotations;
using Fablab.Models;
using GenericServices;

namespace Fablab.Data.Dtos.Student
{
    public class ChangeStudentDto : ILinkToEntity<Models.Entities.Student>
    {
        [Required]
        public int Id { get; set; }
        
        public DateTime? Date { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string Gender { get; set; }
        public int? Age { get; set; }
        public string Type { get; set; }
        public int? Invoice { get; set; }
        public int? Month { get; set; }
    }
}