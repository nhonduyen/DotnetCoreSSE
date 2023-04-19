using MediatR;
using SSE.Application.Commands;
using SSE.Application.Mapper;
using SSE.Application.Response;
using SSE.Core.Entities;
using SSE.Core.Repositories.Command;
using SSE.Core.Repositories.Query;

namespace SSE.Application.Handlers.CommandHandler
{
    public class EditFlightHandler : IRequestHandler<EditFlightCommand, FlightResponse>
    {
        private readonly IFlightCommandRepository _flightCommandRepository;
        private readonly IFlightQueryRepository _flightQueryRepository;

        public EditFlightHandler(IFlightCommandRepository flightCommandRepository, IFlightQueryRepository flightQueryRepository)
        {
            _flightCommandRepository = flightCommandRepository;
            _flightQueryRepository = flightQueryRepository;
        }

        public async Task<FlightResponse> Handle(EditFlightCommand request, CancellationToken cancellationToken)
        {
            var customerEntity = FlightMapper.Mapper.Map<Flight>(request);

            if (customerEntity is null)
            {
                throw new ApplicationException("There is a problem in mapper");
            }

            try
            {
                await _flightCommandRepository.UpdateAsync(customerEntity, cancellationToken);
            }
            catch (Exception exp)
            {
                throw new ApplicationException(exp.Message);
            }

            var modifiedFlight = await _flightQueryRepository.GetByIdAsync(request.Id, cancellationToken);
            var flightResponse = FlightMapper.Mapper.Map<FlightResponse>(modifiedFlight);

            return flightResponse;
        }
    }
}
