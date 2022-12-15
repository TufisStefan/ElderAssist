import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
const PrescriptionItem = ({ item }) => {

    useEffect(() => {
        console.log(item);
    })

    return (
        <TouchableOpacity>
            <View style={styles.itemContainer}>
                <Text style={styles.txt}>{item.medicament}</Text>
                <Text style={styles.txt}>{item.quantity}</Text>
                <Text style={styles.txt}>{item.intake_interval}</Text>
                <Text style={styles.txt}>{item.available_until}</Text>
                <Text style={styles.txt}>{item.name}</Text>
            </View >
        </TouchableOpacity>
    );
};
const styles = StyleSheet.create({
    itemContainer: {
        flexDirection: 'row',
        paddingVertical: 10,
        paddingHorizontal: 5,
        borderWidth: 1,
        borderColor: 'black',
        backgroundColor: '#8ede02'
    },
    txt: {
        fontSize: 24,
    }
});

export default PrescriptionItem;