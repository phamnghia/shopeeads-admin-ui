import axios from './axios';

const UserService = {
  async getAllUser(page?: number, limit?: number) {
    try {
      const res = await axios.get(`/users?page=${page || null}&limit=${limit || null}`);

      return res.data;
    } catch (error) {
      return error;
    }
  },
  async findUser(text: string, page?: number, limit?: number) {
    try {
      const res = await axios.post(`/users/find-user?page=${page}&limit=${limit}`, { 
        text
      });

      return res.data;
    } catch (error) {
      return error;
    }
  },
  async getUser(userId: string) {
    try {
      const res = await axios.get(`/users/${userId}`);

      return res.data
    } catch (error) {
      return error;
    }
  },
  async getUserShop(userId: string) {
    try {
      const res = await axios.get(`/shops/${userId}`);
      return res.data;
    } catch (error) {
      return error;
    }
  },
  async deleteUserPlan(userId: string, planId: string) {
    try {
      const res = await axios.delete(`/users/${userId}/delete-plan`, {
        data: {
          planId
        }
      });

      return res.data;
    } catch (error) {
      return error;
    }
  },
  async addUserPlan(userId: string, expiredTime: Date, planId: string) {
    try {
      const res = await axios.post(`/users/${userId}/add-plan`, {
        expiredTime,
        planId
      });

      return res.data;
    } catch (error) {
      return error;
    }
  },
  async changePassword(userId: string, password: string) {
    try {
      const res = await axios.put(`/users/${userId}`, {
        password,
      })

      return res.data;
    } catch (error) {
      return error;
    }
  },
  async getUserByPlan(planId: string) {
    try {
      const res = await axios.post('/users/list-user-by-plan', {
        planId: planId
      });

      return res.data;
    } catch (error) {
      return error;
    }
  }
}

export default UserService;