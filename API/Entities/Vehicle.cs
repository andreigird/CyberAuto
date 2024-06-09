using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities
{
    [Table("Vehicles")]
    public class Vehicle
    {
        public int Id { get; set; }
        public string Vin { get; set; }
        public string RegistrationNumber { get; set; }
        public string Manufacturer { get; set; }
        public string ModelName { get; set; }
        public string ModelVariant { get; set; }
        public string Engine { get; set; }
        public DateTime MakeYear { get; set; }
    }
}
