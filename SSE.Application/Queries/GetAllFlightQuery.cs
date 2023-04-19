using MediatR;
using SSE.Core.Entities;

namespace SSE.Application.Queries
{
    public class GetAllFlightQuery : IRequest<List<Flight>>
    {
    }
}
