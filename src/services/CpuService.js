// src/services/CpuService.js

import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/cpu';

class CpuService {
    getAllCpus() {
        return axios.get(API_BASE_URL);
    }

    getCpuById(id) {
        return axios.get(API_BASE_URL + '/' + id);
    }

    createCpu(cpu) {
        return axios.post(API_BASE_URL, cpu);
    }

    updateCpu(id, cpu) {
        return axios.put(API_BASE_URL + '/' + id, cpu);
    }

    deleteCpu(id) {
        return axios.delete(API_BASE_URL + '/' + id);
    }
}

export default new CpuService();
