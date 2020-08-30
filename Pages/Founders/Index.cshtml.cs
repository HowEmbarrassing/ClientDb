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
    public class IndexModel : PageModel
    {
        private readonly ClientDbWebApp.Data.ClientDbWebAppContext _context;

        public IndexModel(ClientDbWebApp.Data.ClientDbWebAppContext context)
        {
            _context = context;
        }

        public IList<Founder> Founder { get;set; }

        public async Task OnGetAsync()
        {
            Founder = await _context.Founders.ToListAsync();
        }
    }
}
