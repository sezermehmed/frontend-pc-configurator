// src/services/MotherboardService.js

import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/motherboard';

class MotherboardService {
    getAllMotherboard() {
        return axios.get(API_BASE_URL);
    }

    getMotherboardById(id) {
        return axios.get(API_BASE_URL + '/' + id);
    }

    createMotherboard(Motherboard) {
        return axios.post(API_BASE_URL, Motherboard);
    }

    updateMotherboard(id, Motherboard) {
        return axios.put(API_BASE_URL + '/' + id, Motherboard);
    }

    deleteMotherboard(id) {
        return axios.delete(API_BASE_URL + '/' + id);
    }
}

export default new MotherboardService();
 