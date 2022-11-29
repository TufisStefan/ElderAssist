import { useEffect, useState } from "react";
import MemoryGameCard from "../../../components/MemoryGameCard";
import { Stopwatch } from 'react-native-stopwatch-timer';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { MEMORY_CARDS } from "../../../constants";
import { LogBox } from 'react-native';



const MemoryGame = () => {

    const [isStopwatchStart, setIsStopwatchStart] = useState(true);
    const [resetStopwatch, setResetStopwatch] = useState(false);
    const [currentSelection, setCurrentSelection] = useState([]);
    const [selectedPairs, setSelectedPairs] = useState([]);
    const [gameCards, setGameCards] = useState([]);
    const [gameOver, setGameOver] = useState(false);


    LogBox.ignoreLogs(["Warning: componentWillReceiveProps"]);
    let screenDisabled = false;
    const generateRandomIndexes = (quantity, max) => {
        const set = new Set();
        while (set.size < quantity) {
            set.add(Math.floor(Math.random() * max) + 1);
        }
        return set;
    }
    const shuffle = (array) => {
        let currentIndex = array.length, randomIndex;

        while (currentIndex != 0) {

            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            [array[currentIndex], array[randomIndex]] = [
                array[randomIndex], array[currentIndex]];
        }

        return array;
    }


    const initializeGame = () => {
        const indexes = generateRandomIndexes(6, 12);
        let cards = MEMORY_CARDS.filter((card) => indexes.has(card.index));
        let clone = JSON.parse(JSON.stringify(cards));
        cards = cards.concat(clone);
        cards.map((card) => {
            let id = Math.random().toString(36).substring(7);
            card.id = id;
            card.isFlipped = false;
        });
        cards = shuffle(cards);
        setGameCards(cards);
    }

    const renderRows = () => {
        let rows = getRowContents();
        return rows.map((cards, index) => {
            return (<View key={index} style={styles.row}>
                {renderCards(cards)}
            </View>)
        })
    }

    const renderCards = (cards) => {
        return cards.map((card, index) => {
            return <MemoryGameCard
                key={index}
                isFlipped={card.isFlipped}
                cardImage={card.image}
                onClickCard={() => onClickCard(card.id)}
            />
        })
    }

    const onClickCard = (id) => {
        let index = gameCards.findIndex((card) => { return card.id === id });
        if (gameCards[index].isFlipped === false && selectedPairs.indexOf(gameCards[index].name) === -1) {
            updateState([index], true);

            setCurrentSelection(current => [...current, { index: index, name: gameCards[index].name }]);
        }
    }

    const updateState = (indexList, isFlipped) => {
        const newGameState = gameCards.map((obj, i) => {
            if (indexList.includes(i)) {
                return { ...obj, isFlipped: isFlipped };
            }
            else return obj;
        });
        setGameCards(newGameState);
    }

    const getRowContents = () => {
        let contentRows = [];
        let row = [];
        let count = 0;
        gameCards.forEach((card) => {
            count += 1;
            row.push(card);
            if (count == 3) {
                contentRows.push(row);
                count = 0;
                row = [];
            }
        });
        return contentRows;
    }

    useEffect(() => {
        if (gameCards.length === 0) {
            initializeGame();
        }
        if (currentSelection.length === 2) {
            screenDisabled = true;
            if (currentSelection[0].name === currentSelection[1].name) {
                setSelectedPairs(current => [...current, currentSelection[0].name]);
            }
            else {
                setTimeout(() => {
                    updateState([currentSelection[0].index, currentSelection[1].index], false);
                }, 1000);
            }
            setCurrentSelection([]);
        }
        if (selectedPairs.length === 6) {
            setGameOver(true);
        }
    }, [currentSelection]);

    const restartGame = () => {
        initializeGame();
        setSelectedPairs([]);
        setCurrentSelection([]);
        setGameOver(false);
        resetWatch();
        setTimeout(() => { startWatch(); }, 500);
    }
    const resetWatch = () => {
        setIsStopwatchStart(false);
        setResetStopwatch(true);
    }
    const startWatch = () => {
        setIsStopwatchStart(true);
        setResetStopwatch(false);
    }

    return (
        <View style={styles.container} pointerEvents={screenDisabled ? 'none' : 'auto'}>
            <Stopwatch
                laps
                start={isStopwatchStart}
                reset={resetStopwatch}
                options={options}
                getTime={(time) => {
                    if (gameOver === true) {
                        Alert.alert("Victory", `Congrats, you finished the game in ${time}`);
                        setIsStopwatchStart(false);
                        setGameOver(false);
                    }
                }}
            />
            {renderRows()}
            <TouchableOpacity style={styles.button} onPress={restartGame} activeOpacity={0.5}>
                <Text style={styles.text}>Restart</Text>
            </TouchableOpacity>
        </View>
    )
}

export default MemoryGame;

const options = {
    container: {
        backgroundColor: '#52307c',
        padding: 5,
        borderRadius: 5,
        width: 200,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20
    },
    text: {
        fontSize: 28,
        color: '#FFF',
        marginLeft: 7,
    },
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
    },
    row: {
        flex: 1,
        flexDirection: 'row',
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        margin: 12,
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        backgroundColor: '#52307c',
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
    },
})