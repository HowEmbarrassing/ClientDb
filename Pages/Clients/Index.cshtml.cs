using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;
using ClientDbWebApp.Data;
using ClientDbWebApp.Models;

namespace ClientDbWebApp.Pages.Clients
{
    public class IndexModel : PageModel
    {
        private readonly ClientDbWebApp.Data.ClientDbWebAppContext _context;

        public IndexModel(ClientDbWebApp.Data.ClientDbWebAppContext context)
        {
            _context = context;
        }
        public string CurrentFilter { get; set; }

        public IList<Client> Client { get;set; }

        public async Task OnGetAsync(string searchString)
        {
            CurrentFilter = searchString;
            IQueryable<Client> clientsIQ = from c in _context.Clients
                                           select c;
            if (!String.IsNullOrEmpty(searchString))
            {
                clientsIQ = clientsIQ.Where(c => c.ClientName.Contains(searchString)
                || c.ClientInn.Contains(searchString));
            }
            Client = await clientsIQ.AsNoTracking().ToListAsync();
        }
    }
}
