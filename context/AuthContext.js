import React, { createContext, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import AuthService from '../services/auth.service';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [userToken, setUserToken] = useState(null);

    const login = (username, password) => {
        setIsLoading(true)
        AuthService.login(username, password).then((response) => {
            setUserToken(response.token);
        });
        setIsLoading(false);
    };

    const logout = () => {
        setIsLoading(true);
        setUserToken(null);
        AuthService.logout;
        setIsLoading(false);
    }

    const isLoggedIn = async () => {
    }

    return (
        <AuthContext.Provider value={{ login, logout, isLoading, userToken }}>{children}</AuthContext.Provider>
    );
}

export { AuthContext, AuthProvider };