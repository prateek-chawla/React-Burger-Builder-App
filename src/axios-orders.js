import axios from 'axios'

const axiosInstance = axios.create({
	baseURL: "https://react-burger-builder-5c613.firebaseio.com/",
});

export default axiosInstance