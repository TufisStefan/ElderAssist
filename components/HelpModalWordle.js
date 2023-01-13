import { Image, View } from 'react-native';
import { Modal, Portal, Text } from 'react-native-paper';
import { StyleSheet } from 'react-native';

const HelpModalWordle = (props) => {

    return (
        <Portal>
            <Modal visible={props.visible} onDismiss={props.hideModal} contentContainerStyle={{ backgroundColor: 'white', padding: 20 }} >
                <View>
                    <Text style={{ fontSize: 28, alignSelf: 'center', fontWeight: 'bold' }}>
                        How To Play:
                    </Text>
                    <Text style={{ fontSize: 24, alignSelf: 'flex-start', fontWeight: '700' }}>
                        Guess a 5-letter word.
                        Each letter block will change color and show how close the guess was.{'\n'}
                        Example:
                    </Text>
                    <Image source={require('../assets/wordle-example.jpeg')} style={{ width: 300, height: 60 }} />
                    <Text style={{ fontSize: 24, alignSelf: 'flex-start', fontWeight: '700' }}>
                        GREEN (H) means the letter is correctly placed.{'\n'}
                        YELLOW (I) means the letter is in the word but not in that spot.{'\n'}
                        GRAY (C,A and R) means the letter is not in the word at all. {'\n'}
                        Example:
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
    }
});
export default HelpModalWordle;