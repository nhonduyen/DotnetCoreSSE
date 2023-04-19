using SSE.Core.Entities;
using SSE.Core.Repositories.Command;
using SSE.Infrastructure.Data;
using SSE.Infrastructure.Repositories.Command.Base;

namespace SSE.Infrastructure.Repositories.Command
{
    public class FlightCommandRepository : CommandRepository<Flight>, IFlightCommandRepository
    {
        public FlightCommandRepository(FlightContext context) : base(context)
        {

        }
    }
}
