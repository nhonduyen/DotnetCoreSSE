using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using SSE.Application.Commands;
using SSE.Application.Mapper;
using SSE.Application.Queries;
using SSE.Application.Response;
using SSE.Core.Entities;
using System.Text;

namespace SSE.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FlightController : ControllerBase
    {
        private readonly IMediator _mediator;
        private readonly ILogger<FlightController> _logger;

        public FlightController(IMediator mediator, ILogger<FlightController> logger)
        {
            _mediator = mediator;
            _logger = logger;
        }

        [HttpGet("SSE")]
        public async Task GetAllFlightSSEAsync(CancellationToken stoppingToken)
        {
            Response.Headers.Add("Content-Type", "text/event-stream");
            Response.Headers.Add("Cache-Control", "no-cache");

            while (!stoppingToken.IsCancellationRequested)
            {
                _logger.LogInformation($"Get all flights SSE {DateTime.UtcNow}");
                var flights = await _mediator.Send(new GetAllFlightQuery(), stoppingToken);
                var jsonFlights = JsonConvert.SerializeObject(flights);

                var bytes = Encoding.ASCII.GetBytes($"data: {jsonFlights}\n\n");

                await Response.Body.WriteAsync(bytes, stoppingToken);
                await Response.Body.FlushAsync();
                Response.Body.Close();

                await Task.Delay(5 * 1000);
            }
        }

        [HttpPost("Create")]
        [ProducesDefaultResponseType(typeof(bool))]
        public async Task<ActionResult<FlightResponse>> CreateFlight(CreateFlightCommand command, CancellationToken ct = default)
        {
            _logger.LogInformation("Create Flight");
            return Ok(await _mediator.Send(command, ct));
        }

        [HttpGet("GetAll")]
        [ProducesDefaultResponseType(typeof(List<FlightResponse>))]
        public async Task<IActionResult> GetAllFlightAsync(CancellationToken ct)
        {
            _logger.LogInformation("Get all flights");
            return Ok(await _mediator.Send(new GetAllFlightQuery(), ct));
        }

        [HttpDelete("Delete/{flightId}")]
        [ProducesDefaultResponseType(typeof(bool))]
        public async Task<IActionResult> Delete(string flightId, CancellationToken ct)
        {
            _logger.LogInformation($"Delete flight {flightId}");
            var result = await _mediator.Send(new DeleteFlightCommand(new Guid(flightId)), ct);
            return Ok(result);
        }

        [HttpGet("GetFlightDetails/{flightId}")]
        [ProducesDefaultResponseType(typeof(FlightResponse))]
        public async Task<ActionResult<FlightResponse>> GetFlightDetails(string flightId, CancellationToken ct)
        {
            _logger.LogInformation($"Get flight {flightId}");
            var flight = await _mediator.Send(new GetFlightByIdQuery(new Guid(flightId)), ct);
            var flightResponse = FlightMapper.Mapper.Map<FlightResponse>(flight);
            return Ok(flightResponse);
        }

        [HttpPut("EditFlight/{id}")]
        [ProducesDefaultResponseType(typeof(bool))]
        public async Task<ActionResult> Edit(string id, [FromBody] EditFlightCommand command, CancellationToken ct)
        {
            if (id == command.Id.ToString())
            {
                _logger.LogInformation($"Get flight {id}");
                var result = await _mediator.Send(command, ct);
                return Ok(result);
            }
            else
            {
                return BadRequest();
            }
        }

    }
}
