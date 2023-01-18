import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useEffect, useState } from "react";


const VibrationContext = createContext();

const VibrationProvider = ({ children }) => {

    const [isVibrationOn, setIsVibrationOn] = useState(false);

    useEffect(() => {
        AsyncStorage.getItem("@vibrationOn").then((value) => {
            if (value !== null) {
                setIsVibrationOn(JSON.parse(value));
            }
        })
    })

    const onToggleVibration = () => {
        AsyncStorage.setItem("@vibrationOn", JSON.stringify(!isVibrationOn));
        setIsVibrationOn(!isVibrationOn);
    }
    return (
        <VibrationContext.Provider value={{ isVibrationOn, onToggleVibration }} >{children}</VibrationContext.Provider>
    )
}

export { VibrationContext, VibrationProvider }