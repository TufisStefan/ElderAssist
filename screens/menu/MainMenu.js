import { useContext, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { IconButton, Text } from 'react-native-paper';
import MenuItem from '../../components/MenuItem';
import { DOUBLE_TAP_DELAY, MAPS_URL } from '../../constants';
import { LocationContext } from '../../context/LocationContext';
import * as Location from 'expo-location';
import * as SMS from 'expo-sms';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MainMenu = ({ navigation }) => {

    const { status, isLocationOn } = useContext(LocationContext);
    const [lastTap, setLastTap] = useState(0);
    const onPressEmergency = async () => {
        const time = new Date().getTime();
        const delta = time - lastTap;
        if (delta < DOUBLE_TAP_DELAY) {
            let location = "";
            if (status.granted === true && isLocationOn) {
                location = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.BestForNavigation });
                console.log(location);
            }
            let contact = await AsyncStorage.getItem("@emergency_no");
            let message = await AsyncStorage.getItem("@emergency_msg");
            sendSMS(location, contact, message);
            setLastTap(0);
        }
        else {
            setLastTap(time);
            setTimeout(() => { setLastTap(0) }, DOUBLE_TAP_DELAY);
        }
    }

    const sendSMS = async (location, contact, message) => {
        const isAvailable = await SMS.isAvailableAsync();
        if (isAvailable) {
            if (location !== "") {
                message = message + ` Location: ${MAPS_URL}${location.coords.latitude},${location.coords.longitude}`;
            }
            SMS.sendSMSAsync(contact, message);
        } else {
            console.log("No message medium");
        }
    };
    return (
        <View style={{}}>
            <View style={styles.buttonContainer}>
                <IconButton
                    icon='cog'
                    mode='contained'
                    iconColor='#000'
                    size={60}
                    style={{ backgroundColor: "#aaa", borderWidth: 2, borderColor: "#000" }}
                    onPress={() => { navigation.navigate("SettingsNav") }} />
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
                        :
                        <View style={styles.emergencyView}>
                            <Text style={styles.emergencyText}>
                                Press Again!
                            </Text>
                        </View>}

                </TouchableOpacity>
                <IconButton
                    icon='account'
                    mode='contained'
                    iconColor='#000'
                    size={60}
                    style={{ backgroundColor: "#aaa", borderWidth: 2, borderColor: "#000" }}
                    onPress={() => { navigation.navigate("Account") }} />
            </View>
            <View>
                <MenuItem text='Camera' iconName='camera' bgColor='#29c5f6' navigateTo='Camera' navigation={navigation} />
                <MenuItem text='Contacts' iconName='contacts' bgColor='#ffe338' navigateTo='Contacts' navigation={navigation} />
                <MenuItem text='Medication' iconName='pill' bgColor='#a4de02' navigateTo='Medication' navigation={navigation} />
                <MenuItem text='Games' iconName='gamepad-variant' bgColor='#c175ff' navigateTo='GamesNav' navigation={navigation} />
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
        borderWidth: 2,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center'
    },
    emergencyText: {
        fontSize: 28,
        color: "#fff",
        fontWeight: 'bold'
    },
    emergencyView: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: 180,
        height: 55,
    }
});

export default MainMenu
