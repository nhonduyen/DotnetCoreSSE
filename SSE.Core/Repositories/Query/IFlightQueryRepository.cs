using SSE.Core.Entities;

namespace SSE.Core.Repositories.Query
{
    public interface IFlightQueryRepository
    {
        Task<IReadOnlyList<Flight>> GetAllAsync(CancellationToken cancellationToken = default);
        Task<Flight> GetByIdAsync(Guid id, CancellationToken cancellationToken = default);
    }
}
