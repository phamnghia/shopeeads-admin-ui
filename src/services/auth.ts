import axios from './axios';

const AuthService = {
  async login(username: string, password: string) {
    try {
      const res = await axios.post('/login', {
        username,
        password
      });

      return res.data;
    } catch (error) {
      return error;
    }
  }
}

export default AuthService;