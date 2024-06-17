using API.Data;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;
using System.Text;

namespace API.Controllers
{
    public class AccountController : BaseApiController
    {
        private readonly DataContext _context;
        private readonly ITokenService _tokenService;
        public AccountController(DataContext context, ITokenService tokenService)
        {
            _context = context;
            _tokenService = tokenService;
        }

        [HttpPost("register")] // POST: api/account/register
        public async Task<ActionResult<UserCredentialsDto>>
            Register(RegisterDto registerDto)
        {
            if (await UsernameExists(registerDto.Username))
            {
                return BadRequest("Username already exists.");
            }
            if (await EmailExists(registerDto.Email))
            {
                return BadRequest("Email already exists.");
            }

            using var hmac = new HMACSHA512();

            var user = new User
            {
                FirstName = registerDto.FirstName,
                LastName = registerDto.LastName,
                Username = registerDto.Username.ToLower(),
                Email = registerDto.Email.ToLower(),
                PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(registerDto.Password)),
                PasswordSalt = hmac.Key
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return new UserCredentialsDto
            {
                Username = user.Username,
                Token = _tokenService.CreateToken(user)
            };
        }

        [HttpPost("login")]
        public async Task<ActionResult<UserCredentialsDto>> Login(LoginDto loginDto)
        {
            var user = await _context.Users.FirstOrDefaultAsync(x => x.Username == loginDto.Username || x.Email == loginDto.Username);

            if (user == null) return Unauthorized("Invalid username or email.");

            using var hmac = new HMACSHA512(user.PasswordSalt);

            var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(loginDto.Password));

            for (int i = 0; i < computedHash.Length; i++)
            {
                if (computedHash[i] != user.PasswordHash[i]) return Unauthorized("Invalid password");
            }

            return new UserCredentialsDto
            {
                Username = user.Username,
                Token = _tokenService.CreateToken(user)
            };
        }

        [Authorize]
        [HttpGet("getUserDetails")]
        public async Task<ActionResult<UserDto>> getUserDetails(string username)
        {
            var user = await _context.Users.FirstAsync(x => x.Username == username);
            if (user == null) return BadRequest("Bad request;");
            UserDto loggedUser = new UserDto
            {
                FirstName = user.FirstName,
                LastName = user.LastName,
                Email = user.Email,
                Username = user.Username
            };

            return Ok(loggedUser);
        }

        public async Task<bool> UsernameExists(string username)
        {
            return await _context.Users.AnyAsync(x => x.Username == username.ToLower());
        }
        public async Task<bool> EmailExists(string email)
        {
            return await _context.Users.AnyAsync(x => x.Email == email.ToLower());
        }

    }
}
