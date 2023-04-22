import { Component } from "react";
import { postData } from "../../services/AccessAPI";

export class Create extends Component {
    constructor(props) {
      super(props);
      this.state = {
        flight: {
            Id: null,
            Origin: null,
            FlightCode: null,
            Arrival: null,
            State: null
        }
      };
  
      this.handleCreateFlight = this.handleCreateFlight.bind(this);
      this.handleInputChange = this.handleInputChange.bind(this);
    }


    handleInputChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            ...this.state,
            flight: {
              ...this.state.flight,
              [name]: value
            }
        })
    }
  
    async handleCreateFlight(e) {
        e.preventDefault()
        const endPoint = 'api/flight/create'
        const flight = await postData(endPoint, this.state.flight)
        if (flight) {
            const { history } = this.props
            history.push('/flights')
        }
    }
  
    render() {
      return (
          <form onSubmit={this.handleCreateFlight}>
              <div className="form-row">
                  <div className="form-group col">
                      <label htmlFor="Origin">Origin</label>
                      <input type="text" name="Origin" className="form-control" id="txtOrigin" placeholder="Origin" value={this.state.flight?.Origin || ''} onChange={this.handleInputChange} />
                  </div>
                  <div className="form-group col">
                      <label htmlFor="txtFlightCode">Flight Code</label>
                      <input type="text" name="FlightCode" className="form-control" id="txtFlightCode" placeholder="Flight Code" value={this.state.flight?.FlightCode || ''} onChange={this.handleInputChange} />
                  </div>
              </div>
              <div className="form-group">
                  <label htmlFor="txtArrival">Arrival</label>
                  <input type="text" name="Arrival" class="form-control" id="txtArrival" placeholder="Arrival" value={this.state.flight?.Arrival || ''} onChange={this.handleInputChange} />
              </div>
              <div className="form-group">
                  <label htmlFor="txtState">State</label>
                  <input type="text" name="State" className="form-control" id="txtState" placeholder="State" value={this.state.flight?.State || ''} onChange={this.handleInputChange} />
              </div>
              <button type="submit" className="btn btn-info">Create</button>
          </form>
          
      );
    }
  }