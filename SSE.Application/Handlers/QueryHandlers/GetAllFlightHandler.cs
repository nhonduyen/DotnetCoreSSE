using MediatR;
using SSE.Application.Queries;
using SSE.Core.Entities;
using SSE.Core.Repositories.Query;

namespace SSE.Application.Handlers.QueryHandlers
{
    public class GetAllFlightHandler : IRequestHandler<GetAllFlightQuery, List<Flight>>
    {
        private readonly IFlightQueryRepository _flightQueryRepository;

        public GetAllFlightHandler(IFlightQueryRepository flightQueryRepository)
        {
            _flightQueryRepository = flightQueryRepository;
        }

        public async Task<List<Flight>> Handle(GetAllFlightQuery request, CancellationToken cancellationToken)
        {
            return (List<Flight>)await _flightQueryRepository.GetAllAsync(cancellationToken);
        }
    }
}
