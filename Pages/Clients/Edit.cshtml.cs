using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using ClientDbWebApp.Data;
using ClientDbWebApp.Models;
using System.Text.Json;

namespace ClientDbWebApp.Pages.Clients
{
    public class EditModel : PageModel
    {
        public string ErrorMessage { get; set; }
        public int Id { get; set; }

        private readonly ClientDbWebApp.Data.ClientDbWebAppContext _context;

        public EditModel(ClientDbWebApp.Data.ClientDbWebAppContext context)
        {
            _context = context;
        }

        [BindProperty]
        public Client Client { get; set; }
        [BindProperty]
        public string JsonFounders { get; set; }

        public async Task<IActionResult> OnGetAsync(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }
            else
            {
                Id = (int)id;
            }
            Client = await _context.Clients
                .Include(c => c.Founders)
                .AsNoTracking()
                .FirstOrDefaultAsync(m => m.ID == id);

            JsonFounders = JsonSerializer.Serialize<ICollection<Founder>>(Client.Founders);

            if (Client == null)
            {
                return NotFound();
            }
            return Page();
        }

        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://aka.ms/RazorPagesCRUD.
        public async Task<IActionResult> OnPostAsync(int? id)
        {
            if (!ModelState.IsValid)
            {
                return Page();
            }

            if (Client.ClientType != "ИП")
            {
                if (JsonFounders != null)
                {
                    var missingRows = _context.Founders
                        .Where(i => i.Client.ID == id);
                    _context.Founders.RemoveRange(missingRows);
                    _context.SaveChanges();

                    Client.Founders = JsonSerializer.Deserialize<ICollection<Founder>>(JsonFounders);
                }
            }
            else JsonFounders = null;
            _context.Attach(Client).State = EntityState.Modified;

            try
            {
                Client.ClientUpdatedDate = DateTime.Now;
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ClientExists(Client.ID))
                {
                    return NotFound();
                }
                else
                {
                    ErrorMessage = "Такой ИНН уже существует";
                    return Page();
                }
            }

            return RedirectToPage("./Index");
        }

        private bool ClientExists(int id)
        {
            return _context.Clients.Any(e => e.ID == id);
        }
    }
}
