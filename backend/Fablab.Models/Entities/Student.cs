using System;
using Fablab.Models.Entities.Base;

namespace Fablab.Models.Entities
{
    public class Student : BaseEntity
    {
        public DateTime Date { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string Gender { get; set; }
        public int Age { get; set; }
        public string Type { get; set; }
        public int Invoice { get; set; }
        public int Month { get; set; }
    }
}