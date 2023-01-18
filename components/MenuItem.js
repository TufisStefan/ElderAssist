import { TouchableOpacity, Vibration } from 'react-native';
import { Text } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useContext } from 'react';
import { VibrationContext } from '../context/VibrationContext';

const MenuItem = (props) => {
    const { isVibrationOn } = useContext(VibrationContext);
    return (
        <TouchableOpacity
            style={{
                backgroundColor: props.bgColor,
                padding: 20,
                alignItems: 'center',
                borderRadius: 20,
                borderWidth: 2,
                marginHorizontal: 20,
                marginVertical: 10
            }}
            onPress={async () => {
                props.navigation.navigate(props.navigateTo);
                if (isVibrationOn === true) {
                    Vibration.vibrate(200);
                }
            }}
        >
            <MaterialCommunityIcons name={props.iconName} size={50} style={{
                color: props.textFont
            }} />
            <Text
                style={{
                    textAlign: 'center',
                    fontWeight: '700',
                    fontSize: 30,
                    color: props.textFont
                }}>{props.text}</Text>
        </TouchableOpacity>
    )
}

export default MenuItem