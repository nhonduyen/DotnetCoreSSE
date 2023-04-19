using SSE.Core.Entities.Base;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SSE.Core.Entities
{
    public class Flight : BaseEntity
    {
        [MaxLength(50)]
        public string Origin { get; set; }
        [MaxLength(50)]
        [Column(TypeName = "VARCHAR")]
        public string FlightCode { get; set; }
        [MaxLength(50)]
        public string Arrival { get; set; }
        [MaxLength(50)]
        public string State { get; set; }
    }
}
