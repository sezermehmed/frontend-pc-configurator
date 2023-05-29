// src/components/MemoryList.js

import React, {Component, useState} from 'react';
import { Link } from 'react-router-dom';
import MemoryService from '../services/MemoryService';
import CpuService from '../services/CpuService';
class MemoryList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Memorys: [],
    };
  }

  componentDidMount() {
    this.refreshMemorys();
  }



  refreshMemorys() {
    MemoryService.getAllMemorys()
      .then((response) => {
        this.setState({ Memorys: response.data });
      })
      .catch((error) => {
        console.error('Error retrieving Memorys:', error);
      });
  }
    refreshMemoryById() {
        MemoryService.getAllMemorys()
            .then((response) => {
                this.setState({ Memorys: response.data });
            })
            .catch((error) => {
                console.error('Error retrieving Memorys:', error);
            });
    }

 handleRefreshMemoryById(id) {
    MemoryService.getMemoryById(id)
        .then((value) => {
            this.refreshMemorys()
        })
        .catch((error) => {
            console.error('Error refreshing Memory: ', error)
        });
 }
  handleDelete = (id) => {
    MemoryService.deleteMemory(id)
      .then(() => {
        this.refreshMemorys();
      })
      .catch((error) => {
        console.error('Error deleting Memory:', error);
      });

  };

  

  render() {
    return (
      <div>
        <h2>Memory List</h2>
        <Link to="/Memory">Add Memory</Link>

        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Socket</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {this.state.Memorys.map((Memory) => (
              <tr key={Memory.id}>
                <td>{Memory.id}</td>
                <td>{Memory.name}</td>
                <td>{Memory.socket}</td>
                <td>{Memory.price}</td>

                <td>
                  <Link to={`/Memorys/${Memory.id}`}>Edit</Link>
                  <button onClick={() => this.handleDelete(Memory.id)}>
                    Delete
                  </button>
                  <button onClick={() => this.handleRefreshMemoryById( Memory.id)}>
                    Refresh Memory
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

export default MemoryList;
