using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
   
    public class UsersController : BaseApiController
    {
        private readonly DataContext _dataContext;

        public UsersController(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        [HttpGet(Name = "users")] // GET /users
        public async Task<ActionResult<User>> GetUsers()
        {
            var users = await _dataContext.Users.ToListAsync();
            if (users == null) return NotFound();
            
            return Ok(users);
        }

        [HttpGet("{id}")] // GET /users/1
        public async Task<ActionResult<User>> GetUser(int id)
        {
            var user = await _dataContext.Users.SingleOrDefaultAsync(x => x.Id == id);
            if (user == null) return NotFound();

            return Ok(user);
        }

        //[HttpPost("register")]
        //public Task<ActionResult>

    }
}
