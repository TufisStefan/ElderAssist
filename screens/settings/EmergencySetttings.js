
import { StyleSheet, TouchableOpacity, FlatList, View } from "react-native";
import { EMERGENCY_SETTINGS } from "../../constants";
import { Text, Switch } from 'react-native-paper';
import { useContext, useEffect, useState } from "react";
import ContactModal from "../../components/ContactModal";
import { LocationContext } from "../../context/LocationContext";
import MessageModal from "../../components/MessageModal";
import AsyncStorage from "@react-native-async-storage/async-storage";
const EmergencySettings = () => {
    const [contactVisible, setContactVisible] = useState(false);
    const [messageVisible, setMessageVisible] = useState(false);

    const [contactInfo, setContactInfo] = useState("Not set.");
    const [messageInfo, setMessageInfo] = useState("Not set.");

    const showContactModal = () => setContactVisible(true);
    const hideContactModal = () => setContactVisible(false);

    const showMessageModal = () => setMessageVisible(true);
    const hideMessageModal = () => setMessageVisible(false);

    const { isLocationOn, onToggleLocation } = useContext(LocationContext);

    useEffect(() => {
        AsyncStorage.getItem("@emergency_no")
            .then((value) => {
                if (value !== null) {
                    setContactInfo(value);
                }
            });
        AsyncStorage.getItem("@emergency_msg")
            .then((value) => {
                if (value !== null) {
                    setMessageInfo(value);
                }
            })
    });

    const renderItem = ({ item, index }) => {

        return (
            <View>
                <TouchableOpacity
                    style={styles.settingsContainer}
                    onPress={() => {
                        if (item.type === 'contact') return showContactModal();
                        if (item.type === 'message') return showMessageModal();
                        return undefined;
                    }}
                >
                    <Text style={styles.settingsText}>{item.title}</Text>
                    {item.hasModal === false &&
                        <Switch
                            value={isLocationOn}
                            onValueChange={onToggleLocation}
                        />
                    }
                </TouchableOpacity>
                {item.hasModal === true &&
                    <View style={styles.infoContainer}>
                        <Text style={styles.settingsText}>
                            Current: {item.storageKey === "@emergency_no" ? contactInfo : messageInfo}
                        </Text>
                    </View>
                }
            </View>
        );
    };
    const keyExtractor = (item, index) => {
        return index.toString();
    };

    const containerStyle = { backgroundColor: 'white', padding: 20 };

    return (
        <View style={styles.settingsList}>
            <FlatList
                data={EMERGENCY_SETTINGS}
                renderItem={renderItem}
                keyExtractor={keyExtractor}
                showsVerticalScrollIndicator={false}
            />
            <ContactModal visible={contactVisible} hideModal={hideContactModal} />
            <MessageModal visible={messageVisible} hideModal={hideMessageModal} />
        </View>

    );
}

const styles = StyleSheet.create({
    settingsText: {
        fontSize: 24,
    },
    settingsContainer: {
        padding: 20,
        marginTop: 10,
        marginHorizontal: 10,
        backgroundColor: "#ccc",
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20
    },
    infoContainer: {
        padding: 20,
        marginHorizontal: 10,
        backgroundColor: "#e5e5e5",
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20
    },
    settingsList: {
        marginTop: 20
    }
});

export default EmergencySettings;
