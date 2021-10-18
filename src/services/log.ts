import axios from './axios';

const LogService = {
  async getAllLogs(page?: number, limit?: number) {
    try {
      const res = await axios.get(`/logs?page=${page || null}&limit=${limit || null}`);

      return res.data;
    } catch (error) {
      return error;
    }
  },
  async getLogsByUser(userId: string, page?: number, limit?: number) {
      const res = await axios.post(`/logs/get-logs-by-user?page=${page || null}&limit=${limit || null}`, {
        userId,
      })

      console.log(res);
      return res.data;
  }
}

export default LogService;