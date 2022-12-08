
import { useState } from 'react';
import { View } from 'react-native';
import { Modal, Portal, Text, Button, TextInput } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MessageModal = (props) => {
    const [message, setMessage] = useState("");

    const onChangeMessage = async (input) => {
        setMessage(input);
    }
    const saveMessage = async () => {
        await AsyncStorage.setItem("@emergency_msg", message);
        props.hideModal();
    }

    return (
        <Portal>
            <Modal visible={props.visible} onDismiss={props.hideModal} contentContainerStyle={{ backgroundColor: 'white', padding: 20 }} >
                <View>
                    <Text style={{ fontSize: 24, alignSelf: 'center' }}>Introduce the message sent in case of emergency:</Text>
                    <TextInput value={message}
                        onChangeText={onChangeMessage}
                        style={{
                            fontSize: 32,
                            backgroundColor: '#eeeeee',
                            color: '#000',
                            marginTop: 20
                        }} />
                    <View style={styles.buttonContainer}>
                        <Button mode="contained" style={styles.button} onPress={saveMessage}>
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
export default MessageModal;