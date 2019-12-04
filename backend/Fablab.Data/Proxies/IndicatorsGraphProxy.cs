namespace Fablab.Data.Proxies
{
    public class IndicatorsGraphProxy
    {
        public int TotalMembers { get; set; }
        
        public int TotalStudents { get; set; }
        
        public IndicatorsProxy TotalStudentsPerMonth { get; set; }
    }
}