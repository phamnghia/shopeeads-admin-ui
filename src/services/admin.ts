import axios from './axios';

const AdminService = {
  async listAdmin() {
    const res = await axios.get('/admin');

    return res.data;
  }
}


export default AdminService;