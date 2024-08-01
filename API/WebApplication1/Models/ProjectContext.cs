using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using WebApplication1.Models;
namespace WebApplication1.Models
{
    public class ProjectContext :IdentityDbContext<ApplicationUser>
    {
        public ProjectContext(DbContextOptions<ProjectContext> options) : base(options)
        {
        }

        public DbSet<Product> Products { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
         
        optionsBuilder.UseSqlServer("Server=DESKTOP-J1DPMU3;Database=angularDB;Trusted_Connection=True;TrustServerCertificate=True;");
      
        }
    }
}
