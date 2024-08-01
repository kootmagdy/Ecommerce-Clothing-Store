using System.ComponentModel.DataAnnotations;

namespace WebApplication1.Models
{
    public class RegisterUser
    {
        [Required]
        [StringLength(50, MinimumLength = 3)]
        public string UserName { get; set; }

        [Required]
        [DataType(DataType.Password)]
        [StringLength(100, MinimumLength = 6)]
        public string Password { get; set; }

        [Required]
        [DataType(DataType.Password)]
        [Compare("Password")]
        public string ConfirmPassword { get; set; }

        [Required]
        [StringLength(200)]
        public string Address { get; set; }
    }
}
