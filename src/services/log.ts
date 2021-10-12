import axios from './axios';

const LogService = {
  async getAllLogs(page?: number, limit?: number) {
    try {
      const res = await axios.get(`/logs?page=${page || null}&limit=${limit || null}`);

      return res.data;
    } catch (error) {
      return error;
    }
  }
}

export default LogService;