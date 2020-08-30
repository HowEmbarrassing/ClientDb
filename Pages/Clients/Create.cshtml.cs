using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.AspNetCore.Mvc.Rendering;
using ClientDbWebApp.Data;
using ClientDbWebApp.Models;
using System.Text.Json;
using System.Text.Json.Serialization;
using System.IO;

namespace ClientDbWebApp.Pages.Clients
{
    public class CreateModel : PageModel
    {
        private readonly ClientDbWebApp.Data.ClientDbWebAppContext _context;
        public string ErrorMessage { get; set; }
        [BindProperty]
        public string JsonFounders { get; set; }

        public CreateModel(ClientDbWebApp.Data.ClientDbWebAppContext context)
        {
            _context = context;
        }

        public IActionResult OnGet()
        {
            return Page();
        }

        [BindProperty]
        public Client Client { get; set; }

        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://aka.ms/RazorPagesCRUD.
        public async Task<IActionResult> OnPostAsync()
        {
            if (!ModelState.IsValid)
            {
                return Page();
            }
            Client.ClientCreatedDate = DateTime.Now;
            Client.ClientUpdatedDate = Client.ClientCreatedDate;
            if (Client.ClientType != "ИП")
            {
                if (JsonFounders != null)
                {
                    Client.Founders = JsonSerializer.Deserialize<ICollection<Founder>>(JsonFounders);
                }
            }
            else JsonFounders = null;
            _context.Clients.Add(Client);
            
            try
            {
                await _context.SaveChangesAsync();
            }
            catch
            {
                ErrorMessage = "Такой ИНН уже существует";
                return Page();
            }

            return RedirectToPage("./Index");
        }
    }
}
