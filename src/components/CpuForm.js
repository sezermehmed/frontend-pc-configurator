// src/components/CpuForm.js

import React, {Component} from 'react';
import CpuService from '../services/CpuService';

class CpuForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: this.props.match.params.id || null,
            name: '',
            socket: '',
            price: '',
        };
    }

    componentDidMount() {
        if (this.state.id) {
            CpuService.getCpuById(this.state.id)
                .then((response) => {
                    const cpu = response.data;
                    this.setState({
                        name: cpu.name,
                        socket: cpu.socket,
                        price: cpu.price,
                    });
                })
                .catch((error) => {
                    console.error('Error retrieving cpu:', error);
                });
        }
    }

    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value});
    };

    handleSubmit = (event) => {
        event.preventDefault();

        const cpu = {
            name: this.state.name,
            socket: this.state.socket,
            price: this.state.price,
        };

        if (this.state.id) {
            CpuService.updateCpu(this.state.id, cpu)
                .then(() => {
                    this.props.history.push('/cpus');
                })
                .catch((error) => {
                    console.error('Error updating cpu:', error);
                });
        } else {
            CpuService.createCpu(cpu)
                .then(() => {
                    this.props.history.push('/cpus');
                })
                .catch((error) => {
                    console.error('Error creating cpu:', error);
                });
        }
    };

    render() {
        return (
            <div>
                <h2>{this.state.id ? 'Edit' : 'Add'} CPU</h2>
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <label>Name:</label>
                        <input
                            type="text"
                            name="name"
                            value={this.state.name}
                            onChange={this.handleChange}
                        />
                    </div>
                    <div>
                        <label>Socket:</label>
                        <input
                            type="text"
                            name="socket"
                            value={this.state.socket}
                            onChange={this.handleChange}
                        />
                    </div>
                    <div>
                        <label>Price:</label>
                        <input
                            type="text"
                            name="price"
                            value={this.state.price}
                            onChange={this.handleChange}
                        />
                    </div>
                    <button type="submit">
                        {this.state.id ? 'Update' : 'Create'} CPU
                    </button>
                </form>
            </div>
        );
    }
}

export default CpuForm;
