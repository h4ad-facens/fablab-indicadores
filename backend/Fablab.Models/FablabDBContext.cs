using System.IO;
using Fablab.Models.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace Fablab.Models
{
    public class FablabDBContext : DbContext
    {
        public DbSet<Member> Members { get; set; }
        public DbSet<Student> Students { get; set; }
        public DbSet<User> Users { get; set; }

        public FablabDBContext(DbContextOptions<FablabDBContext> options) : base(options)
        {
        }

        public FablabDBContext()
        {
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (optionsBuilder.IsConfigured)
                return;

            var configuration = new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile("appsettings.json")
                .Build();
            var connectionString = configuration["ConnectionString"];

            optionsBuilder.UseSqlServer(connectionString);
        }
    }
}