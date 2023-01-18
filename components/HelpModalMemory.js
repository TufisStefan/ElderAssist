import { Image, View } from 'react-native';
import { Modal, Portal, Text } from 'react-native-paper';
import { StyleSheet } from 'react-native';

const HelpModalMemory = (props) => {

    return (
        <Portal>
            <Modal visible={props.visible} onDismiss={props.hideModal} contentContainerStyle={{ backgroundColor: 'white', padding: 20 }} >
                <View>
                    <Text style={{ fontSize: 28, alignSelf: 'center', fontWeight: 'bold' }}>
                        How To Play:
                    </Text>
                    <Text style={styles.helpText}>
                        Tap on a question mark icon. The image behind it will be revealed.
                        Find the matching image to make a pair.{'\n'}
                    </Text>
                    <Image source={require('../assets/matching-pair.jpeg')} style={{ width: 190, height: 100 }} />
                    <Text style={styles.helpText}>
                        If the images don't match, they will hide again so remember their position!{'\n'}
                    </Text>

                    <Image source={require('../assets/non-matching-pair.jpeg')} style={{ width: 190, height: 100 }} />
                    <Text style={styles.helpText}>
                        Find all pairs to win!
                    </Text>
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
    helpText: {
        fontSize: 24,
        alignSelf: 'flex-start',
        fontWeight: '700'
    }
});
export default HelpModalMemory;