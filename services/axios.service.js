import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TOKEN_KEY } from "../constants";

const axiosService = axios.create();

axiosService.interceptors.request.use(
    async (config) => {
        const user = JSON.parse(await AsyncStorage.getItem(TOKEN_KEY));
        if (user && user.token) {
            config.headers["Authorization"] = "Bearer " + user.token;
        }
        return config;
    },
    (error) => {
        Promise.reject(error);
    }
);

export default axiosService;