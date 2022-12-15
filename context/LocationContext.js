import React, { createContext, useEffect, useState } from 'react';
import * as Location from 'expo-location';

const LocationContext = createContext();


const LocationProvider = ({ children }) => {
    const [isLocationOn, setIsLocationOn] = useState(false);
    const [status, requestPermission] = Location.useForegroundPermissions();

    const onToggleLocation = async () => {
        setIsLocationOn(!isLocationOn);
        console.log(isLocationOn);
        if (!isLocationOn === true) {
            await requestPermission();

        }
    }
    return (
        <LocationContext.Provider value={{ status, onToggleLocation, isLocationOn }}>{children}</LocationContext.Provider>
    );
}

export { LocationContext, LocationProvider };