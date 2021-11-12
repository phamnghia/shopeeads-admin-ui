import axios from './axios';

const ShopService = {
  async getErrorShops() {
    const res = await axios.post('/shops/get-error-shops');
    
    return res.data;
  }
}

export default ShopService;