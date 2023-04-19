using Microsoft.EntityFrameworkCore;
using SSE.Core.Repositories.Command.Base;
using SSE.Infrastructure.Data;

namespace SSE.Infrastructure.Repositories.Command.Base
{
    public class CommandRepository<T> : ICommandRepository<T> where T : class
    {
        protected readonly FlightContext _context;

        public CommandRepository(FlightContext context)
        {
            _context = context;
        }
        public async Task<T> AddAsync(T entity, CancellationToken ct = default)
        {
            await _context.Set<T>().AddAsync(entity);
            await _context.SaveChangesAsync(ct);
            return entity;
        }

        public async Task<List<T>> AddRangeAsync(List<T> entity, CancellationToken ct = default)
        {
            await _context.Set<T>().AddRangeAsync(entity);
            await _context.SaveChangesAsync(ct);
            return entity;
        }

        public async Task UpdateAsync(T entity, CancellationToken ct = default)
        {
            _context.Entry(entity).State = EntityState.Modified;
            await _context.SaveChangesAsync(ct);
        }

        public async Task DeleteAsync(T entity, CancellationToken ct = default)
        {
            _context.Set<T>().Remove(entity);
            await _context.SaveChangesAsync(ct);
        }
    }
}
