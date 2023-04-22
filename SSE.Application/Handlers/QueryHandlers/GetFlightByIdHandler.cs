using MediatR;
using SSE.Application.Queries;
using SSE.Core.Entities;
using SSE.Core.Repositories.Query;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SSE.Application.Handlers.QueryHandlers
{
    public class GetFlightByIdHandler : IRequestHandler<GetFlightByIdQuery, Flight>
    {
        private readonly IFlightQueryRepository _flightQueryRepository;

        public GetFlightByIdHandler(IFlightQueryRepository flightQueryRepository)
        {
            _flightQueryRepository = flightQueryRepository;
        }

        public async Task<Flight> Handle(GetFlightByIdQuery request, CancellationToken cancellationToken)
        {
            return (Flight)await _flightQueryRepository.GetByIdAsync(request.Id, cancellationToken);
        }
    }
}
