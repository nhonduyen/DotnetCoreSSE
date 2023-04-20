import { Component } from "react";
import { postData, putData } from "../../services/AccessAPI";
import { BASE_URL } from "../../services/Settings";

export class FlightForm extends Component {
    constructor(props) {
      super(props);
      this.state = {
        flight: {
            id: null,
            origin: null,
            flightCode: null,
            arrival: null,
            state: null
        }
      };
  
      this.handleUpdateFlight = this.handleUpdateFlight.bind(this);
      this.handleCreateFlight = this.handleCreateFlight.bind(this);
      this.handleInputChange = this.handleInputChange.bind(this);
    }

    componentDidMount() {
        if (this.props.selectedFlight) {
            this.setState({ flight: this.props.selectedFlight})
        }
    }

    handleInputChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        console.log(name)

        this.setState({
            ...this.state,
            flight: {
              ...this.state.flight,
              [name]: value
            },
        })
        console.log(value)
    }
  
    handleUpdateFlight() {
        
    }
  
    async handleCreateFlight() {
        const endPoint = 'api/flight/create'
        await postData(endPoint, this.state.flight)
    }
  
    render() {
      return (
          <form>
              <div className="form-row">
                  <div className="form-group col">
                      <label htmlFor="Origin">Origin</label>
                      <input type="text" name="origin" className="form-control" id="txtOrigin" placeholder="Origin" value={this.state.flight.origin} onChange={this.handleInputChange} />
                  </div>
                  <div className="form-group col">
                      <label htmlFor="txtFlightCode">Flight Code</label>
                      <input type="text" name="flightCode" className="form-control" id="txtFlightCode" placeholder="Flight Code" value={this.state.flight.flightCode} onChange={this.handleInputChange} />
                  </div>
              </div>
              <div className="form-group">
                  <label htmlFor="txtArrival">Arrival</label>
                  <input type="text" name="arrival" class="form-control" id="txtArrival" placeholder="Arrival" value={this.state.flight.arrival} onChange={this.handleInputChange} />
              </div>
              <div className="form-group">
                  <label htmlFor="txtState">State</label>
                  <input type="text" name="state" className="form-control" id="txtState" placeholder="State" value={this.state.flight.state} onChange={this.handleInputChange} />
              </div>
              <button type="button" class="btn btn-primary" onClick={this.handleUpdateFlight}>Save</button>
              <button type="button" class="btn btn-info" onClick={this.handleCreateFlight}>Create New</button>
          </form>
          
      );
    }
  }