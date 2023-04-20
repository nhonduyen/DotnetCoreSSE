import { Component } from "react";
import { getData } from "../../services/AccessAPI";
import { BASE_URL } from "../../services/Settings";
import { FlightForm } from "./FlightForm";

export class Flights extends Component {
    constructor(props) {
        super(props);
        this.state = {
            flights: [],
            selectedFlight: null,
            loading: true
        };
        this.eventSource = null;
        this.onUserCreate = this.onUserCreate.bind(this);
        this.onUserDelete = this.onUserDelete.bind(this);
        this.onSubcribeSSE = this.onSubcribeSSE.bind(this);
        this.onUnsubcribeSSE = this.onUnsubcribeSSE.bind(this);
        this.updateFlightState = this.updateFlightState.bind(this);
    }


    componentDidMount() {
        this.onSubcribeSSE();
    }

    componentWillUnmount() {
        this.onUnsubcribeSSE()
        this.eventSource.removeEventListener('flightStateUpdate', this.updateFlightState)
    }

    onUserCreate() {
        const { history } = this.props;
        history.push('/admin/user/create');
    }


    onUserEdit(id) {
        const { history } = this.props;
        history.push('/admin/user/edit/' + id);
    }

    onUserDelete(id) {
        const { history } = this.props;
        history.push('/admin/user/delete/' + id);
    }

    updateFlightState(flights) {
        this.setState(Object.assign({}, {flights: flights}));
    }

    onSubcribeSSE() {
        this.eventSource = new EventSource(BASE_URL + 'api/flight/sse', { withCredentials: false } );

        this.eventSource.onmessage = (event) => {
            console.log('receive data')
            const data = JSON.parse(event.data)
            this.setState({loading: false});
            this.updateFlightState(data)
            console.log(data)
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

        this.eventSource.addEventListener('flightStateUpdate', (event) => {
            this.updateFlightState(JSON.parse(event.data))
        });
    }

    onUnsubcribeSSE() {
        console.log('Close SSE')
        this.eventSource.close()
    }

    getAllUsersData() {
        getData('api/User/GetAll').then(
            (result) => {
                if (result) {
                    this.setState({
                        users: result,
                        loading: false
                    });
                }
            }
        );

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
                            <tr key={flight.id}>
                                <td>{flight.origin}</td>
                                <td>{flight.flightCode}</td>
                                <td>{flight.arrival}</td>
                                <td>{flight.state}</td>
                                <td><button onClick={() => this.onUserEdit(flight.id)} className="btn btn-success">Edit</button> ||
                                    <button onClick={() => this.onUserDelete(flight.id)} className="btn btn-danger">Delete</button></td>
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
                <button onClick={() => this.onUserCreate()} className="btn btn-primary">Create new user</button>
                <FlightForm flight={this.state.selectedFlight} />
                {content}
            </div>
        );
    }
}
