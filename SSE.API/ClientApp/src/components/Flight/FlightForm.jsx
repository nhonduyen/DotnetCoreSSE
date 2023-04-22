import { Component } from "react";
import { postData, putData } from "../../services/AccessAPI";
import { BASE_URL } from "../../services/Settings";

export class FlightForm extends Component {
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
  
      this.handleUpdateFlight = this.handleUpdateFlight.bind(this);
      this.handleCreateFlight = this.handleCreateFlight.bind(this);
      this.handleInputChange = this.handleInputChange.bind(this);
    }

    componentDidMount() {
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
            },
        })
    }
  
    async handleUpdateFlight() {
        const endPoint = 'api/flight/editflight/' + this.state.flight.Id 
        await postData(endPoint, this.state.flight)
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
                      <input type="text" name="Origin" className="form-control" id="txtOrigin" placeholder="Origin" value={this.props.flight?.Origin || ''} onChange={this.handleInputChange} />
                  </div>
                  <div className="form-group col">
                      <label htmlFor="txtFlightCode">Flight Code</label>
                      <input type="text" name="FlightCode" className="form-control" id="txtFlightCode" placeholder="Flight Code" value={this.props.flight?.FlightCode || ''} onChange={this.handleInputChange} />
                  </div>
              </div>
              <div className="form-group">
                  <label htmlFor="txtArrival">Arrival</label>
                  <input type="text" name="Arrival" class="form-control" id="txtArrival" placeholder="Arrival" value={this.props.flight?.Arrival || ''} onChange={this.handleInputChange} />
              </div>
              <div className="form-group">
                  <label htmlFor="txtState">State</label>
                  <input type="text" name="State" className="form-control" id="txtState" placeholder="State" value={this.props?.State || ''} onChange={this.handleInputChange} />
              </div>
              <button type="button" className="btn btn-primary" onClick={this.handleUpdateFlight}>Save</button>
              <button type="button" className="btn btn-info" onClick={this.handleCreateFlight}>Create New</button>
          </form>
          
      );
    }
  }