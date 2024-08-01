using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using System.Threading.Tasks;
using WebApplication1.Models;



namespace WebApplication1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    
    public class ProductController : ControllerBase
    {
        ProjectContext db;

        public ProductController (ProjectContext db)
        {
            this.db = db;
        }

        [HttpGet]
        public ActionResult getall()
        {
            List<Product> products = db.Products.ToList();
            if (products == null)
                return NotFound();
            else
                return Ok(products);
        }

        //get by id
        [HttpGet("{id}")]
        public ActionResult getById(int id)
        {
            Product product = db.Products.FirstOrDefault(c => c.Id == id);
            if (product == null) return NotFound();
            else
            {
                return Ok(product);
            }
        }


        //add
        [HttpPost]
        [Authorize(Roles = "admin")]
        public ActionResult add(Product s)
        {
            if (s == null) return BadRequest();
            else
            {
                db.Products.Add(s);
                db.SaveChanges();
                return Created("created", s);
            }
        }


        //edit course
        [HttpPut("{id}")]
        [Authorize(Roles = "admin")]
        public ActionResult edit(Product s, int id)
        {
            s.Id = id;
            if (s == null) return NotFound();
            if (s.Id != id) return BadRequest();
            db.Entry(s).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
            db.SaveChanges();
            return NoContent();
        }


        //delete course
        [HttpDelete("{id}")]
        [Authorize(Roles = "admin")]
        public ActionResult delete(int id)
        {
                Product product = db.Products.FirstOrDefault(c => c.Id == id);
            if (product == null) return NotFound();
            else
            {

                db.Products.Remove(product);
                db.SaveChanges();
                List<Product> products = db.Products.ToList();
                return Ok(products);
            }

        }


    }
}
