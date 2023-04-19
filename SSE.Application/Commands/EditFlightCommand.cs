using MediatR;
using SSE.Application.Response;

namespace SSE.Application.Commands
{
    public class EditFlightCommand : IRequest<FlightResponse>
    {

        public Guid Id { get; set; }
        public string Origin { get; set; }
        public string FlightCode { get; set; }
        public string Arrival { get; set; }
        public string State { get; set; }
    }
}
