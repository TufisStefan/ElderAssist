import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';

const axiosService = axios.create();

axiosService.interceptors.request.use(
    async (config) => {
        const user = JSON.parse(await AsyncStorage.getItem("@user"));
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