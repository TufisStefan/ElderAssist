import { StyleSheet, View } from "react-native"
import { Text } from "react-native-paper";

const Block = ({ index, guess, word, guessed }) => {


    const blockStyles = [styles.guessBlock];
    const textStyles = [styles.guessLetter];

    const letter = guess[index];
    const wordLetter = word[index];

    if (letter === wordLetter && guessed) {
        blockStyles.push(styles.guessCorrect);
        textStyles.push(styles.guessedLetter);
    } else if (word.includes(letter) && guessed) {
        blockStyles.push(styles.guessInWord);
        textStyles.push(styles.guessedLetter);
    } else if (guessed) {
        blockStyles.push(styles.guessNotInWord);
        textStyles.push(styles.guessedLetter);
    }

    return (
        <View style={blockStyles} >
            <Text style={textStyles}>{letter}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    guessLetter: {
        fontSize: 28,
        fontWeight: "bold",
        color: "#4e5153",
    },
    guessBlock: {
        borderColor: "#91979a",
        borderWidth: 2,
        width: 50,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        margin: 5,
    },

    guessedLetter: {
        color: "#fff",
    },
    guessCorrect: {
        backgroundColor: "#6aaa64",
        borderColor: "#6aaa64",
    },
    guessInWord: {
        backgroundColor: "#c9b458",
        borderColor: "#c9b458",
    },
    guessNotInWord: {
        backgroundColor: "#787c7e",
        borderColor: "#787c7e",
    },
});

export default Block;