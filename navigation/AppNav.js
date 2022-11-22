import { NavigationContainer } from "@react-navigation/native"
import React, { useContext } from "react"
import { AuthContext, AuthProvider } from "../context/AuthContext"
import AuthNav from "../navigation/AuthNav"
import UsersTable from "../components/UsersTable"
import MainMenuNav from "./MainMenuNav"

const AppNav = () => {
    const { isLoading, userToken } = useContext(AuthContext);

    return (
        <NavigationContainer>
            {userToken !== null ?
                <MainMenuNav /> :
                <AuthNav />
            }
        </NavigationContainer>
    )
}

export default AppNav;