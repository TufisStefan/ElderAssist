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
                iconName="minus-box-multiple"
                navigation={navigation}
                navigateTo="MemoryGame"
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