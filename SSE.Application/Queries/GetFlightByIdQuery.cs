using MediatR;
using SSE.Core.Entities;

namespace SSE.Application.Queries
{
    public class GetFlightByIdQuery : IRequest<Flight>
    {
        public Guid Id { get; private set; }

        public GetFlightByIdQuery(Guid Id)
        {
            this.Id = Id;
        }

    }
}
