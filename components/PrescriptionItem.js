import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
    }),
})

const PrescriptionItem = ({ item }) => {

    // const triggerNotification = async (name) => {
    //     await Notifications.scheduleNotificationAsync({
    //         content: {
    //             title: `Take your ${name}`,
    //             body: 'Did you forget to take your meds',
    //             data: { data: 'goes here' },
    //         },
    //         trigger: {
    //             hour: 14,
    //             minute: 0,
    //             repeats: true
    //         },
    //     });
    // }

    // useEffect(() => {
    //     Notifications.cancelAllScheduledNotificationsAsync();
    //     triggerNotification();
    // })

    return (
        <TouchableOpacity >
            <View style={styles.itemContainer}>
                <Text style={styles.txt}>{item.medicament}</Text>
                <Text style={styles.txt}>{item.quantity}</Text>
                {/* <Text style={styles.txt}>{item.intake_interval}</Text>
                <Text style={styles.txt}>{item.available_until}</Text> */}
                <Text style={styles.txt}>{item.name}</Text>
            </View >
        </TouchableOpacity>
    );
};
const styles = StyleSheet.create({
    itemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: 10,
        paddingHorizontal: 5,
        borderWidth: 1,
        borderColor: 'black',
        backgroundColor: '#98fb98'
    },
    txt: {
        fontSize: 24,
    }
});

export default PrescriptionItem;