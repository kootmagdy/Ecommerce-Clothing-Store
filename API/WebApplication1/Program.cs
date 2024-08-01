
//using Microsoft.AspNetCore.Identity;
//using Microsoft.EntityFrameworkCore;
//using Microsoft.Extensions.Configuration;
//using WebApplication1.Models;

//namespace WebApplication1
//{
//    public class Program
//    {
//        public static void Main(string[] args)
//        {


//            var builder = WebApplication.CreateBuilder(args);

//            // Add services to the container.

//            builder.Services.AddControllers();
//            // Add session services
//           builder.Services.AddDistributedMemoryCache();
//            builder.Services.AddSession(options =>
//            {
//                options.IdleTimeout = TimeSpan.FromMinutes(30);
//                options.Cookie.HttpOnly = true;
//                options.Cookie.IsEssential = true;
//            });


//            builder.Services.AddDbContext<ProjectContext>(options =>
//           options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

//            //Register Identity Service (userManager -roleMnager- SigninManager)
//            builder.Services.AddIdentity<ApplicationUser, IdentityRole>(
//                options =>
//                {
//                    options.Password.RequireNonAlphanumeric = false;
//                    options.Password.RequiredLength = 5;
//                }


//                   ).AddEntityFrameworkStores<ProjectContext>();

//            builder.Services.AddCors(options =>
//                {
//                    options.AddPolicy("CorsPolicy",
//                        builder => builder
//                            .WithOrigins("http://localhost:4200") // Your Angular app's URL
//                            .AllowAnyMethod()
//                            .AllowAnyHeader()
//                            .AllowCredentials());
//                });

//            builder.Services.AddControllers();

//            // Add authentication services
//            builder.Services.AddAuthentication();

//            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
//            builder.Services.AddEndpointsApiExplorer();
//            builder.Services.AddSwaggerGen();

//            var app = builder.Build();



//            app.UseCors("CorsPolicy");

//            // Configure the HTTP request pipeline.
//            if (app.Environment.IsDevelopment())
//            {
//                app.UseSwagger();
//                app.UseSwaggerUI();
//            }

//            app.UseHttpsRedirection();


//            // Use authentication and authorization
//            app.UseAuthentication();
//            app.UseAuthorization();

//            // Use session middleware
//            app.UseSession();
//            app.MapControllers();

//            app.Run();
//        }
//    }
//}



using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using WebApplication1.Models;

namespace WebApplication1
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.
            builder.Services.AddControllers();

            // Add session services
            builder.Services.AddDistributedMemoryCache();
            builder.Services.AddSession(options =>
            {
                options.IdleTimeout = TimeSpan.FromMinutes(30);
                options.Cookie.HttpOnly = true;
                options.Cookie.IsEssential = true;
                options.Cookie.SecurePolicy = CookieSecurePolicy.Always; // Ensure cookie is only sent over HTTPS
                options.Cookie.SameSite = SameSiteMode.None; // Ensure SameSite is None
            });

            // Configure cookie settings
            builder.Services.ConfigureApplicationCookie(options =>
            {
                options.Cookie.HttpOnly = true;
                options.Cookie.SecurePolicy = CookieSecurePolicy.Always;
                options.Cookie.SameSite = SameSiteMode.None; // Ensure SameSite is None
                options.ExpireTimeSpan = TimeSpan.FromMinutes(30);
                options.SlidingExpiration = true;
            });

            builder.Services.AddDbContext<ProjectContext>(options =>
                options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

            // Register Identity Service (userManager - roleManager - SigninManager)
            builder.Services.AddIdentity<ApplicationUser, IdentityRole>(
                options =>
                {
                    options.Password.RequireNonAlphanumeric = false;
                    options.Password.RequiredLength = 5;
                }
            ).AddEntityFrameworkStores<ProjectContext>();

            builder.Services.AddCors(options =>
            {
                options.AddPolicy("CorsPolicy",
                    builder => builder
                        .WithOrigins("http://localhost:4200") // Your Angular app's URL
                        .AllowAnyMethod()
                        .AllowAnyHeader()
                        .AllowCredentials());
            });

            builder.Services.AddControllers();

            // Add authentication services
            builder.Services.AddAuthentication();

            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            var app = builder.Build();

            app.UseCors("CorsPolicy");

            // Configure the HTTP request pipeline.
            app.UseHttpsRedirection();

            // Use authentication and authorization
            app.UseAuthentication();
            app.UseAuthorization();

            // Use session middleware
            app.UseSession();

            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.MapControllers();

            app.Run();

        }
    }
}

