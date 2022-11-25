
import { useState } from 'react';
import { View } from 'react-native';
import { Modal, Portal, Text, Button, TextInput } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ContactModal = (props) => {
    const [telephoneNumber, setTelephoneNumber] = useState("");

    const onChangeNumber = async (input) => {
        setTelephoneNumber(input);
    }
    const saveEmergencyNumber = async () => {
        await AsyncStorage.setItem("@emergency_no", telephoneNumber);
        props.hideModal();
    }

    return (
        <Portal>
            <Modal visible={props.visible} onDismiss={props.hideModal} contentContainerStyle={{ backgroundColor: 'white', padding: 20 }} >
                <View>
                    <Text style={{ fontSize: 24, alignSelf: 'center' }}>Introduce the emergency contact telephone number:</Text>
                    <TextInput value={telephoneNumber}
                        onChangeText={onChangeNumber}
                        keyboardType='numeric'
                        style={{
                            fontSize: 32,
                            backgroundColor: '#eeeeee',
                            color: '#000',
                            marginTop: 20
                        }} />
                    <View style={styles.buttonContainer}>
                        <Button mode="contained" style={styles.button} onPress={saveEmergencyNumber}>
                            Save
                        </Button>
                        <Button mode="contained" style={styles.button} onPress={props.hideModal}>
                            Cancel
                        </Button>
                    </View>
                </View>
            </Modal>
        </Portal>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: "#d0efff"
    },
    buttonContainer: {
        height: 100,
        flexDirection: 'row',
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    button: {
        borderColor: '#000',
        borderWidth: 2,
        marginHorizontal: 5,

    },
});
export default ContactModal;