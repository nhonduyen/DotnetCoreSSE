import { Component } from "react";
import { getData } from "../../services/AccessAPI";
import { BASE_URL } from "../../services/Settings";

export class Flights extends Component {
    constructor(props) {
        super(props);
        this.state = {
            flights: [],
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
        this.setState(Object.assign({}, {data: flights}));
    }

    onSubcribeSSE() {
        this.eventSource = new EventSource(BASE_URL + 'api/flight/sse', { withCredentials: false } );

        this.eventSource.onmessage = (event) => {
            console.log('receive data')
            const data = JSON.parse(event.data)
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

    renderAllUsersTable(users) {
        return (
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Full Name</th>
                        <th>User Name</th>
                        <th>Email</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users.map(user => (
                            <tr key={user.id}>
                                <td>{user.fullName}</td>
                                <td>{user.userName}</td>
                                <td>{user.email}</td>
                                <td><button onClick={() => this.onUserEdit(user.id)} className="btn btn-success">Edit</button> ||
                                    <button onClick={() => this.onUserDelete(user.id)} className="btn btn-danger">Delete</button></td>
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
            this.renderAllUsersTable(this.state.users)
        )

        return (
            <div>
                <h3>List of Users</h3>
                <button onClick={() => this.onUserCreate()} className="btn btn-primary">Create new user</button>
                {content}
            </div>
        );
    }
}
