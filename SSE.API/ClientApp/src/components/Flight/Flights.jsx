import { Component } from "react";
import { BASE_URL } from "../../services/Settings";
import { deleteData } from "../../services/AccessAPI";

export class Flights extends Component {
    constructor(props) {
        super(props);
        this.state = {
            flights: [],
            selectedFlight: null,
            loading: true
        };
        this.eventSource = null;
        this.onFlightEdit = this.onFlightEdit.bind(this);
        this.onFlightCreate = this.onFlightCreate.bind(this);
        this.onSubcribeSSE = this.onSubcribeSSE.bind(this);
        this.onUnsubcribeSSE = this.onUnsubcribeSSE.bind(this);
        this.updateFlightState = this.updateFlightState.bind(this);
    }


    componentDidMount() {
        this.onSubcribeSSE();
    }

    componentWillUnmount() {
        this.onUnsubcribeSSE()
    }

    onFlightCreate() {
        const { history } = this.props;
        history.push('flight/create/');
    }


    onFlightEdit(id) {
        const { history } = this.props;
        history.push('flight/edit/' + id);
    }

    async onFlightDelete(id) {
        const endPoint = 'api/flight/delete/' + id
        const result = await deleteData(endPoint)
        if (result) {
            console.log('delete success ' + id)
        }
    }

    updateFlightState(flights) {
        this.setState({
            flights: flights
        }, () => console.log(this.state.flights));
    }

    onSubcribeSSE() {
        this.eventSource = new EventSource(BASE_URL + 'api/flight/sse', { withCredentials: false } );

        this.eventSource.onmessage = (event) => {
            const data = JSON.parse(event.data)
            console.log('receive data', data)
            this.setState({loading: false});
            this.updateFlightState(data)
        }

        this.eventSource.onopen = (event) => {
            console.log('Start receiving message')
        }

        this.eventSource.onerror = (event) => {
            console.log('error sse')
            console.log(event)
            if (event.eventPhase === EventSource.CLOSED) {
                console.log('Connection closed');
                this.eventSource.close();
            }
        }
    }

    onUnsubcribeSSE() {
        console.log('Close SSE')
        this.eventSource.close()
    }

    renderAllFlightTable(flights) {
        return (
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Origin</th>
                        <th>Flight Code</th>
                        <th>Arrival</th>
                        <th>State</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        flights.map(flight => (
                            <tr key={flight.Id}>
                                <td>{flight.Origin}</td>
                                <td>{flight.FlightCode}</td>
                                <td>{flight.Arrival}</td>
                                <td>{flight.State}</td>
                                <td><button id="btnEdit" onClick={() => this.onFlightEdit(flight.Id)} className="btn btn-success">Edit</button> ||
                                    <button id="btnDelete" onClick={() => this.onFlightDelete(flight.Id)} className="btn btn-danger">Delete</button></td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        );
    }

    render() {
        let content = this.state.loading ? (
            <p>
                <em>Loading...</em>
            </p>
        ) : (
            this.renderAllFlightTable(this.state.flights)
        )

        return (
            <div>
                <h3>List of Flights</h3>
                <button onClick={() => this.onFlightCreate()} className="btn btn-primary">Create New</button>
                {content}
            </div>
        );
    }
}
