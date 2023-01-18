import React, { useContext } from 'react';

import { Text, View, TouchableOpacity, Vibration } from 'react-native';
import { VibrationContext } from '../context/VibrationContext';

const CustomSwitch = ({
    selectionMode,
    option1,
    option2,
    selectionColor,
    updateToggledMode
}) => {
    const { isVibrationOn } = useContext(VibrationContext);

    return (
        <View style={{ marginTop: 10, alignSelf: 'center' }}>
            <View
                style={{
                    height: 50,
                    width: 280,
                    backgroundColor: 'white',
                    borderRadius: 25,
                    borderWidth: 1,
                    borderColor: selectionColor,
                    flexDirection: 'row',
                    justifyContent: 'center',
                    padding: 2,
                }}>
                <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => {
                        if (isVibrationOn === true) {
                            Vibration.vibrate(200);
                        }
                        updateToggledMode(1);
                    }}
                    style={{
                        flex: 1,

                        backgroundColor: selectionMode == 1 ? selectionColor : 'white',
                        borderRadius: 25,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                    <Text
                        style={{
                            color: selectionMode == 1 ? 'white' : selectionColor, fontSize: 28, fontWeight: '500'
                        }}>
                        {option1}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    TouchableOpacity
                    activeOpacity={1}
                    onPress={() => {
                        if (isVibrationOn === true) {
                            Vibration.vibrate(200);
                        }
                        updateToggledMode(2);
                    }}
                    style={{
                        flex: 1,

                        backgroundColor: selectionMode == 2 ? selectionColor : 'white',
                        borderRadius: 25,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                    <Text
                        style={{
                            color: selectionMode == 2 ? 'white' : selectionColor, fontSize: 28, fontWeight: '500'
                        }}>
                        {option2}
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default CustomSwitch;