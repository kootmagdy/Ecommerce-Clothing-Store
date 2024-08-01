using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using WebApplication1.Models;

namespace WebApplication1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;

        public LoginController(UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager)
        {
            _userManager = userManager;
            _signInManager = signInManager;
        }

        [HttpPost]
        public async Task<IActionResult> Login([FromBody] Login uservm)
        {
            if (uservm == null || !ModelState.IsValid)
            {
                return BadRequest("Invalid login request.");
            }

            var user = await _userManager.FindByNameAsync(uservm.UserName);
            if (user == null)
            {
                return Unauthorized("Invalid username or password.");
            }

            var result = await _signInManager.PasswordSignInAsync(uservm.UserName, uservm.Password, isPersistent: false, lockoutOnFailure: false);
            if (result.Succeeded)
            {
                // Set session variables
                HttpContext.Session.SetString("UserName", user.UserName);
                HttpContext.Session.SetString("UserId", user.Id);
                return Ok();
            }

            if (result.IsLockedOut)
            {
                return Unauthorized("User account is locked out.");
            }

            return Unauthorized("Invalid username or password.");
        }

        [HttpGet("logout")]
        public IActionResult Logout()
        {
            _signInManager.SignOutAsync().Wait();
            HttpContext.Session.Clear(); // Clear all session data
            return Ok();
        }
    }
}
