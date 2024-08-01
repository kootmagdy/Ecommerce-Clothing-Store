#nullable disable
using System.ComponentModel.DataAnnotations;
using System.Security;

namespace WebApplication1.Models
{
    public class Product

    {
        [Key]
        public int Id { get; set; }

        [StringLength(50)]
        public string Name { get; set; }

        public decimal? Price { get; set; }

        public int?  Quantity { get; set; }

        public string Description { get; set; }
        public string Image { get; set; }


    }
}
