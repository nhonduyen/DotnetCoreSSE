using MediatR;
using SSE.Application.Commands;
using SSE.Application.Mapper;
using SSE.Application.Response;
using SSE.Core.Entities;
using SSE.Core.Repositories.Command;

namespace SSE.Application.Handlers.CommandHandler
{
    public class CreateFlightHandler : IRequestHandler<CreateFlightCommand, FlightResponse>
    {
        private readonly IFlightCommandRepository _flightCommandRepository;
        public CreateFlightHandler(IFlightCommandRepository flightCommandRepository)
        {
            _flightCommandRepository = flightCommandRepository;
        }
        public async Task<FlightResponse> Handle(CreateFlightCommand request, CancellationToken cancellationToken)
        {
            var flightEntity = FlightMapper.Mapper.Map<Flight>(request);

            if (flightEntity is null)
            {
                throw new ApplicationException($"There is a problem in mapper object {nameof(flightEntity)}");
            }

            var newFlight = await _flightCommandRepository.AddAsync(flightEntity, cancellationToken);
            var flightResponse = FlightMapper.Mapper.Map<FlightResponse>(newFlight);
            return flightResponse;
        }
    }
}
