using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace ClientDbWebApp.Models
{
    public class Founder
    {
        [JsonIgnore]
        public int ID { get; set; }
        [Required]
        [StringLength(150)]
        [JsonPropertyName("name")]
        [Display(Name = "ФИО Учредителя")]
        public string FounderFullName { get; set; }

        [Required]
        [MinLength(12), MaxLength(12)]
        [RegularExpression(@"[0-9]*", ErrorMessage = "Пожалуйста, используйте только цифры")]
        [JsonPropertyName("inn")]
        [Display(Name = "ИНН Учредителя")]
        public string FounderInn { get; set; }

        [JsonPropertyName("createdDate")]
        [Display(Name = "Создан")]
        public DateTime FounderCreatedDate { get; set; }

        [JsonPropertyName("updatedDate")]
        [Display(Name = "Обновлен")]
        public DateTime FounderUpdatedDate { get; set; }

        [JsonIgnore]
        public Client Client { get; set; }
    }
}
