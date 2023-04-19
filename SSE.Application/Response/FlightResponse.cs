namespace SSE.Application.Response
{
    public class FlightResponse
    {
        public Guid Id { get; set; }
        public string Origin { get; set; }
        public string FlightCode { get; set; }
        public string Arrival { get; set; }
        public string State { get; set; }
    }
}
