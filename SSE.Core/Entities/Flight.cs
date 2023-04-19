using SSE.Core.Entities.Base;

namespace SSE.Core.Entities
{
    public class Flight : BaseEntity
    {
        public string Origin { get; set; }
        public string FlightCode { get; set; }
        public string Arrival { get; set; }
        public string State { get; set; }
    }
}
