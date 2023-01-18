import { StyleSheet, View } from "react-native";
import Block from "./Block";

const GuessRow = ({ guess, word, guessed }) => {

    return (
        <View style={styles.guessRow}>
            <Block index={0} guess={guess} word={word} guessed={guessed} />
            <Block index={1} guess={guess} word={word} guessed={guessed} />
            <Block index={2} guess={guess} word={word} guessed={guessed} />
            <Block index={3} guess={guess} word={word} guessed={guessed} />
            <Block index={4} guess={guess} word={word} guessed={guessed} />
        </View>
    )
}

const styles = StyleSheet.create({
    guessRow: {
        flexDirection: "row",
        justifyContent: "center",
    }
})

export default GuessRow;