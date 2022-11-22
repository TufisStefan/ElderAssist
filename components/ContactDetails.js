import { Alert, Text, View } from "react-native";
import * as Contacts from 'expo-contacts';
import { useState, useEffect } from "react";
import * as Linking from 'expo-linking';
import { StyleSheet } from "react-native";
import { IconButton } from "react-native-paper";

const ContactDetails = ({ route, navigation }) => {
    const { id } = route.params;
    const [isLoaded, setIsLoaded] = useState(false);
    const [contact, setContact] = useState(null);

    const handlePhoneCall = () => {
        console.log('call ' + contact.phoneNumbers[0].number);
        let phoneNumber = contact.phoneNumbers[0].number;
        phoneNumber = `tel:${phoneNumber}`;
        Linking.canOpenURL(phoneNumber).then(
            supported => {
                if (!supported) {
                    Alert.alert('Phone number not available');
                } else {
                    return Linking.openURL(phoneNumber);
                }
            }
        ).catch(error => console.log(error));
    }

    useEffect(() => {
        (async () => {
            const contact = await Contacts.getContactByIdAsync(id, {
                fields: [Contacts.Fields.PhoneNumbers],
            });
            if (contact) {
                setContact(contact);
                setIsLoaded(true);
            }
        })();
    }, []);

    return (

        <View style={styles.container}>
            {isLoaded &&
                <View style={styles.detailView}>
                    <Text style={styles.detailText}>{contact.name}</Text>
                    <Text style={styles.detailText}>{contact.phoneNumbers[0].number}</Text>
                </View>
            }
            <IconButton
                icon="phone"
                style={styles.icon}
                mode='outlined'
                size={80}
                iconColor='#000'
                containerColor='#00ff00'
                onPress={() => handlePhoneCall()}
            />
        </View>

    )
}

const styles = StyleSheet.create({
    detailText: {
        fontSize: 32,
        marginBottom: 20
    },
    detailView: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    icon: {
        marginTop: 100,
    }
})

export default ContactDetails;