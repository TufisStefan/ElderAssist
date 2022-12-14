import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Text } from "react-native-paper";
import { KEYBOARD_ROW_1, KEYBOARD_ROW_2, KEYBOARD_ROW_3 } from "../../../constants";

const Keyboard = ({ onKeyPress }) => {

    return (
        <View style={styles.keyboard}>
            <KeyBoardRow letters={KEYBOARD_ROW_1} onKeyPress={onKeyPress} />
            <KeyBoardRow letters={KEYBOARD_ROW_2} onKeyPress={onKeyPress} />
            <KeyBoardRow letters={KEYBOARD_ROW_3} onKeyPress={onKeyPress} />
            <View style={styles.keyboardRow}>
                <TouchableOpacity onPress={() => onKeyPress("ENTER")}>
                    <View style={styles.key}>
                        <Text style={styles.keyLetter} >ENTER</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View >
    )
}

const KeyBoardRow = ({ letters, onKeyPress }) => {
    return (
        <View style={styles.keyboardRow}>
            {letters.map(letter =>
            (
                <TouchableOpacity key={letter} onPress={() => onKeyPress(letter)}>
                    <View style={styles.key}>
                        <Text style={styles.keyLetter}>{letter}</Text>
                    </View>
                </TouchableOpacity>
            )
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    keyboard: {
        flexDirection: "column"
    },
    keyboardRow: {
        flexDirection: "row",
        justifyContent: "center",
        marginBottom: 10,
    },
    keyLetter: {
        fontWeight: "bold",
        fontSize: 20,
    },
    key: {
        backgroundColor: "#d3d6da",
        padding: 10,
        margin: 3,
        borderRadius: 5,
    }
})

export default Keyboard;