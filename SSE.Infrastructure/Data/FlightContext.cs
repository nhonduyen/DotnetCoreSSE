using Microsoft.EntityFrameworkCore;
using SSE.Core.Entities;

namespace SSE.Infrastructure.Data
{
    public class FlightContext : DbContext
    {
        public FlightContext(DbContextOptions<FlightContext> options) : base(options)
        {

        }

        public DbSet<Flight> Flight { get; set; }
    }
}
