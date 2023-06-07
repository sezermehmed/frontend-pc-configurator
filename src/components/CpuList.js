// src/components/CpuList.js

import React, {Component, useState} from 'react';
import { Link } from 'react-router-dom';
import CpuService from '../services/CpuService';
import CpuListStyle from './style/CpuListStyle.css';
class CpuList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cpus: [],
    };
  }

  componentDidMount() {
    this.refreshCpus();
  }



  refreshCpus() {
    CpuService.getAllCpus()
      .then((response) => {
        this.setState({ cpus: response.data });
      })
      .catch((error) => {
        console.error('Error retrieving cpus:', error);
      });
  }
    refreshCpuById() {
        CpuService.getAllCpus()
            .then((response) => {
                this.setState({ cpus: response.data });
            })
            .catch((error) => {
                console.error('Error retrieving cpus:', error);
            });
    }

 handleRefreshCpuById(id) {
    CpuService.getCpuById(id)
        .then((value) => {
            this.refreshCpus()
        })
        .catch((error) => {
            console.error('Error refreshing cpu: ', error)
        });
 }
  handleDelete = (id) => {
    CpuService.deleteCpu(id)
      .then(() => {
        this.refreshCpus();
      })
      .catch((error) => {
        console.error('Error deleting cpu:', error);
      });

  };

  

  render() {
    return (
      <div>
        <h2>CPU List</h2>
        <Link to="/cpu">Add CPU</Link>

        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Socket</th>
              <th>Supported Memory</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {this.state.cpus.map((cpu) => (
              <tr key={cpu.id}>
                <td>{cpu.id}</td>
                <td>{cpu.name}</td>
                <td>{cpu.socket}</td>
                <td>{cpu.supportedMemory}</td>
                <td>{cpu.price}</td>

                <td>
                  <Link to={`/cpus/${cpu.id}`}>Edit</Link>
                  <button onClick={() => this.handleDelete(cpu.id)}>
                    Delete
                  </button>
                  <button onClick={() => this.handleRefreshCpuById( cpu.id)}>
                    Refresh Cpu
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default CpuList;
