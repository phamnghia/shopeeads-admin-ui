import axios from './axios';

const CampaignService = {
  async listErrorCampaigns() {
    try {
      const res = await axios.post('/campaigns/list-error-campaign');

      return res.data;
    } catch (error) {
      return error;
    }
  },
}

export default CampaignService;