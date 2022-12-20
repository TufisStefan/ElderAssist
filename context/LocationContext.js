import React, { createContext, useEffect, useState } from 'react';
import * as Location from 'expo-location';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LocationContext = createContext();


const LocationProvider = ({ children }) => {
    const [isLocationOn, setIsLocationOn] = useState(false);
    const [status, requestPermission] = Location.useForegroundPermissions();

    useEffect(() => {
        AsyncStorage.getItem("@locationOn").then((value) => {
            if (value !== null) {
                console.log(value);
                setIsLocationOn(JSON.parse(value));
            }
        })
    })

    const onToggleLocation = async () => {
        AsyncStorage.setItem("@locationOn", JSON.stringify(!isLocationOn));
        setIsLocationOn(!isLocationOn);
        if (!isLocationOn === true) {
            await requestPermission();

        }
    }
    return (
        <LocationContext.Provider value={{ status, onToggleLocation, isLocationOn }}>{children}</LocationContext.Provider>
    );
}

export { LocationContext, LocationProvider };