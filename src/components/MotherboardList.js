// src/components/MotherboardList.js

import React, {Component, useState} from 'react';
import { Link } from 'react-router-dom';
import MotherboardService from '../services/MotherboardService';
class MotherboardList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Motherboards: [],
    };
  }

  componentDidMount() {
    this.refreshMotherboards();
  }



  refreshMotherboards() {
    MotherboardService.getAllMotherboard()
      .then((response) => {
        this.setState({ Motherboards: response.data });
      })
      .catch((error) => {
        console.error('Error retrieving Motherboards:', error);
      });
  }
    refreshMotherboardById() {
        MotherboardService.getAllMotherboard()
            .then((response) => {
                this.setState({ Motherboards: response.data });
            })
            .catch((error) => {
                console.error('Error retrieving Motherboards:', error);
            });
    }

 handleRefreshMotherboardById(id) {
    MotherboardService.getMotherboardById(id)
        .then((value) => {
            this.refreshMotherboards()
        })
        .catch((error) => {
            console.error('Error refreshing Motherboard: ', error)
        });
 }
  handleDelete = (id) => {
    MotherboardService.deleteMotherboard(id)
      .then(() => {
        this.refreshMotherboards();
      })
      .catch((error) => {
        console.error('Error deleting Motherboard:', error);
      });

  };

  

  render() {
    return (
      <div>
        <h2>Motherboard List</h2>
        <Link to="/Motherboard">Add Motherboard</Link>

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
            {this.state.Motherboards.map((Motherboard) => (
              <tr key={Motherboard.id}>
                <td>{Motherboard.id}</td>
                <td>{Motherboard.name}</td>
                <td>{Motherboard.socket}</td>
                <td>{Motherboard.price}</td>

                <td>
                  <Link to={`/Motherboards/${Motherboard.id}`}>Edit</Link>
                  <button onClick={() => this.handleDelete(Motherboard.id)}>
                    Delete
                  </button>
                  <button onClick={() => this.handleRefreshMotherboardById( Motherboard.id)}>
                    Refresh Motherboard
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

export default MotherboardList;
