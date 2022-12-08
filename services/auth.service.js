import axios from "axios"
import jwtDecode from "jwt-decode";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AUTHURL, TOKEN_KEY } from '../constants/index';

const register = (username, email, password) => {
    return axios.post(AUTHURL + "signup", {
        username,
        email,
        password
    });
};

const login = (username, password) => {

    return axios.post(AUTHURL + "signin", {
        username,
        password
    }).then(async (response) => {
        if (response.data.token) {
            const token = jwtDecode(response.data.token);
            response.data.roles = Object.entries(token["Role"]).map(([, v]) => v.authority);
            await AsyncStorage.setItem(TOKEN_KEY, JSON.stringify(response.data))
        }
        return response.data;
    });
};

const logout = async () => {
    await AsyncStorage.removeItem(TOKEN_KEY);
    const user = await AsyncStorage.getItem(TOKEN_KEY);
}

const getCurrentUser = async () => {
    const user = await AsyncStorage.getItem(TOKEN_KEY);
    return user;
}

const AuthService = {
    register,
    login,
    logout,
    getCurrentUser
};

export default AuthService