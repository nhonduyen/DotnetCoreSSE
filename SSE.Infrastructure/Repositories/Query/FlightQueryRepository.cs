using SSE.Core.Entities;
using SSE.Core.Repositories.Query;
using SSE.Infrastructure.Data;
using SSE.Infrastructure.Repositories.Query.Base;

namespace SSE.Infrastructure.Repositories.Query
{
    public class FlightQueryRepository : QueryRepository<Flight>, IFlightQueryRepository
    {
        public FlightQueryRepository(FlightContext context) : base(context)
        {
        }

        public async Task<Flight> GetByIdAsync(Guid id, CancellationToken ct = default)
        {
            var flights = await base.FindByConditionAsync(x => x.Id == id, ct);
            return flights.FirstOrDefault();
        }
    }
}
