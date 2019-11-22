using System;

namespace Fablab.Data.Dtos.Student
{
    public class CreateStudentDto
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