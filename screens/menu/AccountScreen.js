
import { TouchableOpacity, Text, View, Vibration } from "react-native";
import { StyleSheet } from "react-native";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import CustomButton from "../../components/CustomButton";
import { IconButton, TextInput } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { VibrationContext } from "../../context/VibrationContext";


const AccountScreen = ({ navigation }) => {
    const { logout } = useContext(AuthContext);
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [info, setInfo] = useState("");
    const [isEditable, setIsEditable] = useState(false);

    const { isVibrationOn } = useContext(VibrationContext);


    const handleEditPress = () => {
        if (isEditable) {
            AsyncStorage.setItem("@elder_name", name);
            AsyncStorage.setItem("@elder_phone", phoneNumber);
            AsyncStorage.setItem("@elder_address", address);
            AsyncStorage.setItem("@elder_info", info);
        }
        toggleEditable();
    }

    const toggleEditable = () => {
        setIsEditable(!isEditable);
    }

    useEffect(() => {
        AsyncStorage.getItem("@elder_name")
            .then((value) => {
                if (value !== null) {
                    setName(value);
                }
            });
        AsyncStorage.getItem("@elder_phone")
            .then((value) => {
                if (value !== null) {
                    setPhoneNumber(value);
                }
            })
        AsyncStorage.getItem("@elder_address")
            .then((value) => {
                if (value !== null) {
                    setAddress(value);
                }
            })
        AsyncStorage.getItem("@elder_info")
            .then((value) => {
                if (value !== null) {
                    setInfo(value);
                }
            })
    }, []);

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.editButton}
                onPress={() => {
                    if (isVibrationOn === true) {
                        Vibration.vibrate(200);
                    }
                    handleEditPress();
                }}
            >
                {!isEditable &&
                    <View style={styles.editView}>
                        <IconButton
                            icon="account-edit"
                            iconColor='#fff'
                            size={40}
                            style={{ margin: 0 }}
                        />
                        <Text style={styles.editText}>
                            Edit
                        </Text>
                    </View>
                }
                {isEditable &&
                    <View style={styles.editView}>
                        <IconButton
                            icon="check-circle-outline"
                            iconColor='#fff'
                            size={40}
                            style={{ margin: 0 }}
                        />
                        <Text style={styles.editText}>
                            Save
                        </Text>
                    </View>
                }
            </TouchableOpacity>
            <TextInput
                value={name}
                onChangeText={input => setName(input)}
                style={{ fontSize: 24, marginBottom: 10 }}
                disabled={!isEditable}
                label="Full Name"
                left={<TextInput.Icon icon="account" size={35} />}
            />
            <TextInput
                value={address}
                onChangeText={input => setAddress(input)}
                style={{ fontSize: 24, marginBottom: 10 }}
                disabled={!isEditable}
                label="Address"
                left={<TextInput.Icon icon="home" size={35} />}
            />
            <TextInput
                value={phoneNumber}
                onChangeText={input => setPhoneNumber(input)}
                style={{ fontSize: 24, marginBottom: 10 }}
                disabled={!isEditable}
                label="Phone Number"
                left={<TextInput.Icon icon="phone" size={35} />}
            />
            <TextInput
                value={info}
                onChangeText={input => setInfo(input)}
                style={{ fontSize: 24, marginBottom: 10 }}
                disabled={!isEditable}
                label="Additional Info"
                multiline={true}
                left={<TextInput.Icon icon="information" size={35} />}
            />
            <CustomButton onPress={logout} label="Logout" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        margin: 20,
    },
    editButton: {
        backgroundColor: "#AD40AF",
        padding: 15,
        borderRadius: 15,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: "center",
        width: 160,
        height: 80,
        marginBottom: 20
    },
    editText: {
        fontSize: 28,
        color: "#fff",
        fontWeight: 'bold'
    },
    editView: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    }
});

export default AccountScreen;