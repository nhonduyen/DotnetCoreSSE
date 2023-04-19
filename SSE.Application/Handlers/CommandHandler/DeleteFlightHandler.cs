using MediatR;
using SSE.Application.Commands;
using SSE.Core.Repositories.Command;
using SSE.Core.Repositories.Query;

namespace SSE.Application.Handlers.CommandHandler
{
    public class DeleteFlightHandler : IRequestHandler<DeleteFlightCommand, String>
    {
        private readonly IFlightCommandRepository _flightCommandRepository;
        private readonly IFlightQueryRepository _flightQueryRepository;
        public DeleteFlightHandler(IFlightCommandRepository flightCommandRepository, IFlightQueryRepository flightQueryRepository)
        {
            _flightCommandRepository = flightCommandRepository;
            _flightQueryRepository = flightQueryRepository;
        }

        public async Task<string> Handle(DeleteFlightCommand request, CancellationToken cancellationToken)
        {
            try
            {
                var customerEntity = await _flightQueryRepository.GetByIdAsync(request.Id);

                await _flightCommandRepository.DeleteAsync(customerEntity, cancellationToken);
            }
            catch (Exception exp)
            {
                throw (new ApplicationException(exp.Message));
            }

            return "Customer information has been deleted!";
        }
    }
}
