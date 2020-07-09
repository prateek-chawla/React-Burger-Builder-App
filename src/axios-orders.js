import axios from 'axios'
import {FIREBASE_BASE_URL} from './urls'

const axiosInstance = axios.create({
	baseURL: FIREBASE_BASE_URL,
});

export default axiosInstance