using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using SSE.Application.Commands;
using SSE.Application.Queries;
using SSE.Application.Response;
using SSE.Core.Entities;

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
        public async Task GetAllFlightSSEAsync(CancellationToken ct = default)
        {
            _logger.LogInformation("Get all flights");
            var response = Response;
            response.Headers.Add("Content-Type", "text/event-stream");

            var flights = await _mediator.Send(new GetAllFlightQuery(), ct);
            var jsonFlights = JsonConvert.SerializeObject(flights);

            await response.WriteAsync(jsonFlights);
            await response.Body.FlushAsync();

            await Task.Delay(5 * 1000);
        }

        [HttpPost("Create")]
        [ProducesDefaultResponseType(typeof(bool))]
        public async Task<ActionResult> CreateUser(CreateFlightCommand command, CancellationToken ct = default)
        {
            _logger.LogInformation("Create Flight");
            return Ok(await _mediator.Send(command, ct));
        }

        [HttpGet("GetAll")]
        [ProducesDefaultResponseType(typeof(List<FlightResponse>))]
        public async Task<IActionResult> GetAllFlightAsync(CancellationToken ct = default)
        {
            _logger.LogInformation("Get all flights");
            return Ok(await _mediator.Send(new GetAllFlightQuery(), ct));
        }

        [HttpDelete("Delete/{flightId}")]
        [ProducesDefaultResponseType(typeof(bool))]
        public async Task<IActionResult> Delete(string flightId, CancellationToken ct = default)
        {
            _logger.LogInformation($"Delete user {flightId}");
            var result = await _mediator.Send(new DeleteFlightCommand(new Guid(flightId)), ct);
            return Ok(result);
        }

        [HttpGet("GetFlightDetails/{flightId}")]
        [ProducesDefaultResponseType(typeof(FlightResponse))]
        public async Task<IActionResult> GetFlightDetails(string flightId, CancellationToken ct = default)
        {
            _logger.LogInformation($"Get user {flightId}");
            var result = await _mediator.Send(new GetFlightByIdQuery(new Guid(flightId)), ct);
            return Ok(result);
        }

        [HttpPut("EditFlight/{id}")]
        [ProducesDefaultResponseType(typeof(bool))]
        public async Task<ActionResult> Edit(string id, [FromBody] EditFlightCommand command, CancellationToken ct = default)
        {
            if (id == command.Id.ToString())
            {
                _logger.LogInformation($"Get user profilr {id}");
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
