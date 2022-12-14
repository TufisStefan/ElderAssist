import { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, TouchableOpacity, View } from "react-native"
import { Button, Text } from "react-native-paper";
import { DEFAULT_GUESS } from "../../../constants";
import GuessRow from "./GuessRow";
import Keyboard from "./Keyboard";
import { WORDS } from "./words";

const WordleGame = () => {
    const [activeWord, setActiveWord] = useState(WORDS[0])
    const [guessIndex, setGuessIndex] = useState(0);
    const [guesses, setGuesses] = useState(DEFAULT_GUESS);
    const [gameComplete, setGameComplete] = useState(false);

    const handleKeyPress = (letter) => {
        const guess = guesses[guessIndex];

        if (letter === "ENTER") {
            if (guess.length !== 5) {
                alert("Word too short.")
                return
            }

            if (!WORDS.includes(guess)) {
                alert("Not a valid word.")
                return
            }

            if (guess === activeWord) {
                setGuessIndex(guessIndex + 1)
                setGameComplete(true);
                alert("You won!");
                return
            }
            if (guessIndex < 5) {
                setGuessIndex(guessIndex + 1);
            } else {
                setGameComplete(true);
                alert("You lost! The word was " + activeWord);
                return
            }
        }

        if (letter === "⌫") {
            setGuesses({ ...guesses, [guessIndex]: guess.slice(0, -1) })
            return
        }

        if (guess.length >= 5) {
            return
        }

        setGuesses({ ...guesses, [guessIndex]: guess + letter });
    }


    useEffect(() => {
        if (!gameComplete) {
            setActiveWord(WORDS[Math.floor(Math.random() * WORDS.length)]);
            setGuesses(DEFAULT_GUESS);
            setGuessIndex(0);
        }
    }, [gameComplete])

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.guessContainer}>
                <GuessRow
                    guess={guesses[0]}
                    word={activeWord}
                    guessed={guessIndex > 0} />
                <GuessRow
                    guess={guesses[1]}
                    word={activeWord}
                    guessed={guessIndex > 1} />
                <GuessRow
                    guess={guesses[2]}
                    word={activeWord}
                    guessed={guessIndex > 2} />
                <GuessRow
                    guess={guesses[3]}
                    word={activeWord}
                    guessed={guessIndex > 3} />
                <GuessRow
                    guess={guesses[4]}
                    word={activeWord}
                    guessed={guessIndex > 4} />
                <GuessRow
                    guess={guesses[5]}
                    word={activeWord}
                    guessed={guessIndex > 5} />
            </View>
            <View>
                {gameComplete ? (
                    <View style={styles.gameCompleteWrapper}>
                        <View>
                            <TouchableOpacity
                                style={styles.button}
                                onPress={() => {
                                    setGameComplete(false)
                                }}
                            >
                                <Text style={styles.buttonText}>RESET</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                ) : null}
                <Keyboard onKeyPress={handleKeyPress} />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: "space-between",
        flex: 1,
    },
    guessContainer: {
        marginTop: 10,
    },
    gameCompleteWrapper: {
        alignItems: "center",
    },
    bold: {
        fontWeight: "bold",
    },
    buttonText: {
        fontWeight: "bold",
        fontSize: 24,
    },
    button: {
        backgroundColor: "#f97354",
        padding: 12,
        marginBottom: 20,
        borderRadius: 5,
    }
})

export default WordleGame;