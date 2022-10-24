import axios from 'axios';

export const userApi = {
  register: (loginInfo: any) => {
    return axios.post('http://13.124.110.176:5000/user/signup', loginInfo, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  },
};
