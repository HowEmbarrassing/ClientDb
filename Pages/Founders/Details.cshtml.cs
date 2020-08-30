using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;
using ClientDbWebApp.Data;
using ClientDbWebApp.Models;

namespace ClientDbWebApp.Pages.Founders
{
    public class DetailsModel : PageModel
    {
        private readonly ClientDbWebApp.Data.ClientDbWebAppContext _context;

        public DetailsModel(ClientDbWebApp.Data.ClientDbWebAppContext context)
        {
            _context = context;
        }

        public Founder Founder { get; set; }

        public async Task<IActionResult> OnGetAsync(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            Founder = await _context.Founders.FirstOrDefaultAsync(m => m.ID == id);

            if (Founder == null)
            {
                return NotFound();
            }
            return Page();
        }
    }
}
