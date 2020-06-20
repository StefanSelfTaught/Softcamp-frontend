import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000/api/v1',
});

const BootcampsService = {
  index() {
    return axiosInstance.get('/bootcamps');
  },

  create(bootcamp) {
    return axiosInstance.post('/bootcamps', { bootcamp });
  },

  show(id) {
    return axiosInstance.get(`/bootcamps${id}`);
  },
};

export default { BootcampsService };
