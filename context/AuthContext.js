import React, { createContext, useState } from 'react';
import AuthService from '../services/auth.service';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [userToken, setUserToken] = useState(null);

    const login = (username, password) => {
        setIsLoading(true);
        AuthService.login(username, password).then((response) => {
            setUserToken(response.token);
        });
        setIsLoading(false);
    };

    const logout = () => {
        setIsLoading(true);
        setUserToken(null);
        AuthService.logout();
        setIsLoading(false);
    }

    const isLoggedIn = async () => {
        const user = await AuthService.getCurrentUser();
        return user !== null;
    }

    return (
        <AuthContext.Provider value={{ login, logout, isLoading, userToken, isLoggedIn }}>{children}</AuthContext.Provider>
    );
}

export { AuthContext, AuthProvider };