using MediatR;
using SSE.Application.Response;

namespace SSE.Application.Commands
{
    public class CreateFlightCommand : IRequest<FlightResponse>
    {
        public string Origin { get; set; }
        public string FlightCode { get; set; }
        public string Arrival { get; set; }
        public string State { get; set; }
        public DateTime CreatedDate { get; set; }

        public CreateFlightCommand()
        {
            this.CreatedDate = DateTime.UtcNow;
        }
    }
}
