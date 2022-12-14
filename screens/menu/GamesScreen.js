import { StyleSheet } from "react-native";
import { View } from "react-native";
import MenuItem from "../../components/MenuItem";



const GamesScreen = ({ navigation }) => {

    return (
        <View style={styles.container}>
            <MenuItem
                text="Memory Game"
                bgColor="#7600bc"
                textFont='#fff'
                iconName="checkbox-multiple-marked"
                navigation={navigation}
                navigateTo="MemoryGame"
            />
            <MenuItem
                text="Wordle"
                bgColor="#7600bc"
                textFont='#fff'
                iconName="file-word-box"
                navigation={navigation}
                navigateTo="Wordle"
            />
        </View>
    )
}

export default GamesScreen;

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#f0ceff",
        flex: 1
    }
});