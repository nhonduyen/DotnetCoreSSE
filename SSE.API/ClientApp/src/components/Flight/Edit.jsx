import { Component } from "react";
import { getData, putData } from "../../services/AccessAPI";

export class Edit extends Component {
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
      this.getFlight = this.getFlight.bind(this);
      this.handleInputChange = this.handleInputChange.bind(this);
    }

    componentDidMount() {
        this.getFlight()
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
  
    async handleUpdateFlight(e) {
        e.preventDefault()
        const endPoint = 'api/flight/editflight/' + this.state.flight.id 
        const flight = await putData(endPoint, this.state.flight)
        if (flight) {
            const { history } = this.props
            history.push('/flights')
        }
    }
  
    async getFlight() {
        const { id } = this.props.match.params;
        const endPoint = 'api/flight/getflightdetails/' + id
        var result = await getData(endPoint, this.state.flight)

        this.setState({
            flight: result
        })
    }
  
    render() {
      return (
          <form onSubmit={this.handleUpdateFlight}>
              <div className="form-row">
                  <div className="form-group col">
                      <label htmlFor="Origin">Origin</label>
                      <input type="text" name="origin" className="form-control" id="txtOrigin" placeholder="Origin" value={this.state.flight?.origin || ''} onChange={this.handleInputChange} />
                  </div>
                  <div className="form-group col">
                      <label htmlFor="txtFlightCode">Flight Code</label>
                      <input type="text" name="flightCode" className="form-control" id="txtFlightCode" placeholder="Flight Code" value={this.state.flight?.flightCode || ''} onChange={this.handleInputChange} />
                  </div>
              </div>
              <div className="form-group">
                  <label htmlFor="txtArrival">Arrival</label>
                  <input type="text" name="arrival" className="form-control" id="txtArrival" placeholder="Arrival" value={this.state.flight?.arrival || ''} onChange={this.handleInputChange} />
              </div>
              <div className="form-group">
                  <label htmlFor="txtState">State</label>
                  <input type="text" name="state" className="form-control" id="txtState" placeholder="State" value={this.state.flight?.state || ''} onChange={this.handleInputChange} />
              </div>
              <button type="submit" className="btn btn-primary">Save</button>
          </form>
          
      );
    }
  }