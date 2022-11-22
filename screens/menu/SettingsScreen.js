import { FlatList, TouchableOpacity, View } from "react-native";
import { SETTINGS } from "../../constants";
import { Text } from "react-native-paper";
import { StyleSheet } from "react-native";


const SettingsScreen = () => {

    const renderItem = ({ item, index }) => {
        return (
            <TouchableOpacity style={styles.settingsContainer}>
                <Text style={styles.settingsText}>{item}</Text>
            </TouchableOpacity>
        );
    };
    const keyExtractor = (item, index) => {
        return index.toString();
    };



    return (
        <View style={styles.settingsList}>
            <FlatList
                data={SETTINGS}
                renderItem={renderItem}
                keyExtractor={keyExtractor}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    settingsText: {
        fontSize: 24,
    },
    settingsContainer: {
        padding: 20,
        marginTop: 10,
        marginHorizontal: 10,
        backgroundColor: "#ccc",
        borderRadius: 10
    },
    settingsList: {
        marginTop: 20
    }
});

export default SettingsScreen;