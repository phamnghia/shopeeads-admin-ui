import axios from './axios';

const PlanService = {
  async getAllPlans() {
    try {
      const res = await axios.get('/plans');

      return res.data;
    } catch (error) {
      return error;
    }
  },
}

export default PlanService