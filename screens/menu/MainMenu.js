import { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { IconButton, Text } from 'react-native-paper';
import MenuItem from '../../components/MenuItem';
import { DOUBLE_TAP_DELAY } from '../../constants';

const MainMenu = ({ navigation }) => {
    const [lastTap, setLastTap] = useState(0);
    const onPressEmergency = () => {
        const time = new Date().getTime();
        const delta = time - lastTap;
        if (delta < DOUBLE_TAP_DELAY) {
            console.log("Double tap!");
            setLastTap(0);
        }
        else {
            console.log("Single tap!");
            setLastTap(time);
            setTimeout(() => { setLastTap(0) }, DOUBLE_TAP_DELAY);
        }
    }

    return (
        <View style={{}}>
            <View style={styles.buttonContainer}>
                <IconButton
                    icon='cog'
                    mode='contained'
                    iconColor='#000'
                    size={60}
                    style={{ backgroundColor: "#aaa", borderWidth: 2, borderColor: "#000" }}
                    onPress={() => { navigation.navigate("Settings") }} />
                <TouchableOpacity style={styles.emergencyButton}
                    activeOpacity={0.5}
                    onPress={() => { onPressEmergency() }}
                >
                    {lastTap === 0
                        ? <View style={styles.emergencyView}>
                            <IconButton
                                icon="alarm-light"
                                iconColor='#fff'
                                size={40}
                                style={{ margin: 0 }}
                            />
                            <Text style={styles.emergencyText}>
                                Emergency
                            </Text>
                        </View>
                        : <Text style={styles.emergencyText}>
                            Press Again!
                        </Text>}

                </TouchableOpacity>
                <IconButton
                    icon='account'
                    mode='contained'
                    iconColor='#000'
                    size={60}
                    style={{ backgroundColor: "#aaa", borderWidth: 2, borderColor: "#000" }}
                    onPress={() => { console.log("settings") }} />
            </View>
            <View>
                <MenuItem text='Camera' iconName='camera' bgColor='#29c5f6' navigateTo='Camera' navigation={navigation} />
                <MenuItem text='Contacts' iconName='contacts' bgColor='#ffe338' navigateTo='Contacts' navigation={navigation} />
                <MenuItem text='Medication' iconName='pill' bgColor='#a4de02' navigateTo='Camera' navigation={navigation} />
                <MenuItem text='Games' iconName='gamepad-variant' bgColor='#c175ff' navigateTo='Camera' navigation={navigation} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    buttonContainer: {
        marginTop: 50,
        flexDirection: 'row',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    emergencyButton: {
        backgroundColor: "#f00",
        padding: 15,
        borderRadius: 15,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center'
    },
    emergencyText: {
        fontSize: 24,
        color: "#fff"
    },
    emergencyView: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default MainMenu
