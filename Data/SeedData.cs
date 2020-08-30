using System;
using ClientDbWebApp.Data;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.EntityFrameworkCore;
using ClientDbWebApp.Models;

namespace ClientDbWebApp.Data
{
    public class SeedData
    {
        public static void Initialize(IServiceProvider serviceProvider)
        {
            using (var context = new ClientDbWebAppContext(
                serviceProvider.GetRequiredService<
                    DbContextOptions<ClientDbWebAppContext>>()))
            {
                if (context.Clients.Any())
                {
                    return;
                }

                Founder founder1 = new Founder()
                {
                    FounderFullName = "Василий Сергеевич Шолохов",
                    FounderInn = "123123123123",
                    FounderCreatedDate = DateTime.Now,
                    FounderUpdatedDate = DateTime.Now,
                };
                Founder founder2 = new Founder()
                {
                    FounderFullName = "Артем Иванович Петров",
                    FounderInn = "321321321321",
                    FounderCreatedDate = DateTime.Now,
                    FounderUpdatedDate = DateTime.Now,
                };

                ICollection<Founder> newFounders = new HashSet<Founder>();
                newFounders.Add(founder1);
                newFounders.Add(founder2);

                context.Clients.AddRange(
                    new Client
                    {
                        ClientName = "Антон Семенович Семенов",
                        ClientInn = "123456789041",
                        ClientType = "ИП",
                        ClientCreatedDate = DateTime.Parse("12.04.2019 08:12:34"),
                        ClientUpdatedDate = DateTime.Parse("17.05.2019 18:42:12"),
                        Founders = null
                    },
                    new Client
                    {
                        ClientName = "ООО Призма",
                        ClientInn = "1234567890",
                        ClientType = "ЮрЛицо",
                        ClientCreatedDate = DateTime.Parse("12.02.2019 08:12:34"),
                        ClientUpdatedDate = DateTime.Parse("17.02.2019 18:42:12"),
                        Founders = newFounders
                    },
                    new Client
                    {
                        ClientName = "Иван Иванович Иванов",
                        ClientInn = "123456789012",
                        ClientType = "ИП",
                        ClientCreatedDate = DateTime.Parse("12.04.2019 08:12:34"),
                        ClientUpdatedDate = DateTime.Parse("17.05.2019 18:42:12"),
                        Founders = null
                    }
                    );
                context.SaveChanges();
            }
        }
    }
}
