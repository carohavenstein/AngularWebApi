using EmployeeCrudApi.Data;
using EmployeeCrudApi.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace EmployeeCrudApi.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        private ApplicationDbContext _context;

        public EmployeeController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<List<Employee>> GetAll()
        {
            return await _context.Employees.ToListAsync();
        }

        [HttpGet]
        public async Task<Employee> GetById(int id)
        {
            return await _context.Employees.FindAsync(id);
        }

        [HttpPost]
        public async Task<ActionResult> Create([FromBody] Employee employee)
        {
            // 1. Validar que el nombre del empleado no este repetido
            if (await _context.Employees.AnyAsync(e => e.Name == employee.Name))
            {
                return BadRequest("El nombre ya esta registrado");
            }

            // 2. Validar longitud mínima del nombre
            if (employee.Name.Length < 2)
            {
                return BadRequest("El nombre no puede tener menos de 2 caracteres");
            }

            // 3. Validar longitud máxima del nombre
            if (employee.Name.Length > 100)
            {
                return BadRequest("El nombre no puede tener más de 100 caracteres");
            }

            // 4. Validar que el nombre no contenga números
            if (Regex.IsMatch(employee.Name, @"\d"))
            {
                return BadRequest("El nombre no debe contener números");
            }
            /*
            // 5. Formatear el nombre: primera letra de los nombres en mayúscula y todo el apellido en mayúsculas
            var nameParts = employee.Name.Split(' ');
            for (int i = 0; i < nameParts.Length; i++)
            {
                if (i == nameParts.Length - 1)
                {
                    // Última parte (el apellido) en mayúsculas
                    nameParts[i] = nameParts[i].ToUpper();
                }
                else
                {
                    // Nombres con la primera letra en mayúscula
                    nameParts[i] = char.ToUpper(nameParts[i][0]) + nameParts[i].Substring(1).ToLower();
                }
            }
            employee.Name = string.Join(' ', nameParts);
            */

            // Guardar empleado
            employee.CreatedDate = DateTime.Now;
            await _context.Employees.AddAsync(employee);
            await _context.SaveChangesAsync();

            return Ok("Se agrego el empleado con exito.");
        }

        [HttpPut]
        public async Task Update([FromBody] Employee employee)
        {
            Employee employeeToUpdate = await _context.Employees.FindAsync(employee.Id);
            employeeToUpdate.Name = employee.Name;
            await _context.SaveChangesAsync();
        }

        [HttpDelete]
        public async Task Delete(int id)
        {
            var employeeToDelete = await _context.Employees.FindAsync(id);
            _context.Remove(employeeToDelete);
            await _context.SaveChangesAsync();
        }
    }
}
