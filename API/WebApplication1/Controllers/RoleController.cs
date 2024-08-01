using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using WebApplication1.Models;

namespace WebApplication1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = "admin")]
    public class RoleController : ControllerBase
    {
        private readonly RoleManager<IdentityRole> _roleManager;

        public RoleController(RoleManager<IdentityRole> roleManager)
        {
            _roleManager = roleManager;
        }
        
        [HttpPost]
        public async Task<IActionResult> AddRole([FromBody] Role newRoleVM)
        {
            if (newRoleVM == null || string.IsNullOrWhiteSpace(newRoleVM.RoleName))
            {
                return BadRequest("Invalid role name.");
            }

            var roleExists = await _roleManager.RoleExistsAsync(newRoleVM.RoleName);
            if (roleExists)
            {
                return Conflict("Role already exists.");
            }

            var role = new IdentityRole(newRoleVM.RoleName);
            var result = await _roleManager.CreateAsync(role);

            if (result.Succeeded)
            {
                return Ok();
            }

            return StatusCode(StatusCodes.Status500InternalServerError, "Error creating role.");
        }
    }
}