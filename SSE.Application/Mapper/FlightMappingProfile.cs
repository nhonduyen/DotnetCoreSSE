using AutoMapper;
using SSE.Application.Commands;
using SSE.Application.Response;
using SSE.Core.Entities;

namespace SSE.Application.Mapper
{
    internal class FlightMappingProfile : Profile
    {
        public FlightMappingProfile()
        {
            CreateMap<Flight, FlightResponse>().ReverseMap();
            CreateMap<Flight, CreateFlightCommand>().ReverseMap();
            CreateMap<Flight, EditFlightCommand>().ReverseMap();
        }
    }
}
