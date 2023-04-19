using Microsoft.EntityFrameworkCore;
using SSE.Core.Repositories.Query.Base;
using SSE.Infrastructure.Data;
using System.Linq.Expressions;

namespace SSE.Infrastructure.Repositories.Query.Base
{
    public class QueryRepository<T> : IQueryRepository<T> where T : class
    {
        protected readonly FlightContext _context;

        public QueryRepository(FlightContext context)
        {
            _context = context;
        }

        public async Task<IReadOnlyList<T>> GetAllAsync(CancellationToken ct = default)
        {
            var results = await _context.Set<T>().AsNoTracking().ToListAsync(ct);
            return results;
        }

        public async Task<IReadOnlyList<T>> FindByConditionAsync(Expression<Func<T, bool>> expression, CancellationToken ct = default)
        {
            var results = await _context.Set<T>().AsNoTracking().Where(expression).ToListAsync(ct);
            return results;
        }
    }
}
