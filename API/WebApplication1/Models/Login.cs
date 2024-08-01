using System.ComponentModel.DataAnnotations;

namespace WebApplication1.Models
{
    public class Login
    {
        public string UserName { get; set; }
        [DataType(DataType.Password)]
        public string Password { get; set; }
    }
}
