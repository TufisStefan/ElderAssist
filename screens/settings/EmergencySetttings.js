
import { StyleSheet, TouchableOpacity, FlatList, View } from "react-native";
import { EMERGENCY_SETTINGS } from "../../constants";
import { Text, Switch } from 'react-native-paper';
import { useContext, useState } from "react";
import ContactModal from "../../components/ContactModal";
import { LocationContext } from "../../context/LocationContext";
import MessageModal from "../../components/MessageModal";
const EmergencySettings = () => {
    const [contactVisible, setContactVisible] = useState(false);
    const [messageVisible, setMessageVisible] = useState(false);

    const showContactModal = () => setContactVisible(true);
    const hideContactModal = () => setContactVisible(false);

    const showMessageModal = () => setMessageVisible(true);
    const hideMessageModal = () => setMessageVisible(false);

    const { isLocationOn, onToggleLocation } = useContext(LocationContext);


    const renderItem = ({ item, index }) => {

        return (
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
                        style={{ marginLeft: 60 }}
                    />
                }
            </TouchableOpacity>
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
        borderRadius: 10
    },
    settingsList: {
        marginTop: 20
    }
});

export default EmergencySettings;
