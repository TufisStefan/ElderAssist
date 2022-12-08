import { NavigationContainer } from "@react-navigation/native"
import React, { useContext, useEffect, useState } from "react"
import { AuthContext, AuthProvider } from "../context/AuthContext"
import AuthNav from "../navigation/AuthNav"
import MainMenuNav from "./MainMenuNav"

const AppNav = () => {
    const { userToken, isLoggedIn } = useContext(AuthContext);
    const [loggedIn, setLoggedIn] = useState(false);
    useEffect(() => {
        async function awaitData() {
            setLoggedIn(await isLoggedIn());
        }
        awaitData();
    })

    return (
        <NavigationContainer>
            {(loggedIn) ?
                <MainMenuNav /> :
                <AuthNav />
            }
        </NavigationContainer>
    )
}

export default AppNav;