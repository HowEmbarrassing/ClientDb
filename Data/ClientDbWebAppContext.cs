using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using ClientDbWebApp.Models;

namespace ClientDbWebApp.Data
{
    public class ClientDbWebAppContext : DbContext
    {
        public ClientDbWebAppContext (DbContextOptions<ClientDbWebAppContext> options)
            : base(options)
        {
        }

        public DbSet<Client> Clients { get; set; }
        public DbSet<Founder> Founders { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Client>()
                .HasAlternateKey(c => c.ClientInn);
        }
    }
}
