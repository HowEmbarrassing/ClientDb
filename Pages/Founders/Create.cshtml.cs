using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.AspNetCore.Mvc.Rendering;
using ClientDbWebApp.Data;
using ClientDbWebApp.Models;

namespace ClientDbWebApp.Pages.Founders
{
    public class CreateModel : PageModel
    {
        private readonly ClientDbWebApp.Data.ClientDbWebAppContext _context;

        public CreateModel(ClientDbWebApp.Data.ClientDbWebAppContext context)
        {
            _context = context;
        }

        public IActionResult OnGet()
        {
            return Page();
        }

        [BindProperty]
        public Founder Founder { get; set; }

        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://aka.ms/RazorPagesCRUD.
        public async Task<IActionResult> OnPostAsync()
        {
            if (!ModelState.IsValid)
            {
                return Page();
            }

            _context.Founders.Add(Founder);
            await _context.SaveChangesAsync();

            return RedirectToPage("./Index");
        }
    }
}
