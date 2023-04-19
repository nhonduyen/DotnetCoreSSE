using MediatR;

namespace SSE.Application.Commands
{
    public class DeleteFlightCommand : IRequest<String>
    {
        public Guid Id { get; private set; }

        public DeleteFlightCommand(Guid Id)
        {
            this.Id = Id;
        }
    }
}
