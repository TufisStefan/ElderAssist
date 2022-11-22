import { TouchableOpacity, View } from 'react-native';
import { Text } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const MenuItem = (props) => {
    return (
        <TouchableOpacity
            style={{
                backgroundColor: props.bgColor,
                padding: 20,
                alignItems: 'center',
                borderRadius: 20,
                marginHorizontal: 20,
                marginVertical: 10
            }}
            onPress={() => props.navigation.navigate(props.navigateTo)}>
            <MaterialCommunityIcons name={props.iconName} size={50} style={{

            }} />
            <Text
                style={{
                    textAlign: 'center',
                    fontWeight: '700',
                    fontSize: 30,
                }}>{props.text}</Text>
        </TouchableOpacity>
    )
}

export default MenuItem