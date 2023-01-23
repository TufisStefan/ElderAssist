import { View } from 'react-native';
import { Button, Modal, Portal, Text } from 'react-native-paper';
import { StyleSheet } from 'react-native';

const InfoModal = (props) => {

    return (
        <Portal>
            <Modal visible={props.visible} onDismiss={props.hideModal} contentContainerStyle={{ backgroundColor: 'white', padding: 20 }} >
                <View style>
                    <View>
                        <Text style={{ fontSize: 24, fontWeight: '600' }}>
                            {props.text}
                        </Text>
                    </View>
                    <View style={styles.buttonContainer}>
                        <Button mode="contained" style={styles.button} onPress={props.hideModal}>
                            OK
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
        alignContent: 'center',
        backgroundColor: "#d0efff"
    },
    buttonContainer: {
        height: 100,
        flexDirection: 'row',
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
    },
});
export default InfoModal;