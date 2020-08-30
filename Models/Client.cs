using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq.Expressions;

namespace ClientDbWebApp.Models
{
    public class Client
    {
        public int ID { get; set; }
        [Required]
        [StringLength(150)]
        [Display(Name = "Наименование Клиента")]
        public string ClientName { get; set; }

        [Required]
        [MinLength(10), MaxLength(12)]
        [RegularExpression(@"[0-9]*", ErrorMessage = "Пожалуйста, используйте только цифры")]
        [Display(Name = "ИНН Клиента")]
        public string ClientInn { get; set; }

        [Required]
        [Display(Name = "Тип Клиента")]
        public string ClientType { get; set; }

        [Display(Name = "Создан Клиент")]
        public DateTime ClientCreatedDate { get; set; }

        [Display(Name = "Обновлен Клиент")]
        public DateTime ClientUpdatedDate { get; set; }

        [Display(Name = "Список Учредителей")]
        public ICollection<Founder> Founders { get; set; }
    }
}
