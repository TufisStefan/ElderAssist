import { useEffect, useState } from "react"
import { StyleSheet, View } from "react-native";
import { Avatar } from "react-native-paper";
import { TouchableOpacity } from "react-native";
import { HIDDEN_CARD } from "../constants";


const MemoryGameCard = ({ isFlipped, cardImage, onClickCard }) => {

    const [cardSource, setCardSource] = useState(HIDDEN_CARD.image);

    useEffect(() => {
        if (isFlipped === true) {
            setCardSource(cardImage);
        }
        else {
            setCardSource(HIDDEN_CARD.image);
        }
    }, [isFlipped]);

    return (
        <TouchableOpacity style={styles.card} onPress={onClickCard} disabled={isFlipped}>
            <Avatar.Image size={110} source={cardSource} />
        </TouchableOpacity>
    )
}

export default MemoryGameCard;

const styles = StyleSheet.create({
    card: {
        width: 110,
        height: 110,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 110,
        flex: 1
    },
})