import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Avatar } from 'react-native-paper';
const ContactListItem = ({ onPressContact, contact }) => {
    return (
        <TouchableOpacity onPress={onPressContact}>
            <View style={styles.contactCon}>
                <View style={styles.imgCon}>
                    {contact.imageAvailable ? <Avatar.Image size={80} source={contact.image} /> :
                        < View style={styles.placeholder}>
                            <Text style={styles.txt}>{contact.firstName.charAt(0) + (contact.lastName ? contact.lastName.charAt(0) : "")}</Text>
                        </View>
                    }
                </View>
                <View style={styles.contactDat}>
                    <Text style={styles.name}>
                        {contact.name}
                    </Text>
                </View>
            </View >
        </TouchableOpacity>
    );
};
const styles = StyleSheet.create({
    contactCon: {
        flex: 1,
        flexDirection: 'row',
        padding: 5,
        borderBottomWidth: 1,
        borderBottomColor: 'black',
        backgroundColor: '#fdefb2'
    },
    imgCon: {},
    placeholder: {
        width: 80,
        height: 80,
        borderRadius: 40,
        overflow: 'hidden',
        backgroundColor: '#dfc98a',
        alignItems: 'center',
        justifyContent: 'center',
    },
    contactDat: {
        flex: 1,
        justifyContent: 'center',
        paddingLeft: 5,
    },
    txt: {
        fontSize: 32,
    },
    name: {
        fontSize: 28,
    },
});
export default ContactListItem;