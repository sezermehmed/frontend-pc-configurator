import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/memory';

class MemoryService {
    getAllMemory() {
        return axios.get(API_BASE_URL);
    }

    getMemoryById(id) {
        return axios.get(API_BASE_URL + '/' + id);
    }

    createMemory(memory) {
        return axios.post(API_BASE_URL, memory);
    }

    updateMemory(id, memory) {
        return axios.put(API_BASE_URL + '/' + id, memory);
    }

    deleteMemory(id) {
        return axios.delete(API_BASE_URL + '/' + id);
    }
}

export default new MemoryService();
 