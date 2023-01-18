import { FlatList, TouchableOpacity, View } from "react-native";
import { SETTINGS } from "../../constants";
import { Switch, Text } from "react-native-paper";
import { StyleSheet } from "react-native";
import { useContext } from "react";
import { VibrationContext } from "../../context/VibrationContext";


const SettingsScreen = ({ navigation }) => {

    const { isVibrationOn, onToggleVibration } = useContext(VibrationContext);
    const renderItem = ({ item, index }) => {
        return (
            <TouchableOpacity style={styles.settingsContainer} onPress={() => { navigation.navigate(item.route) }}>
                <Text style={styles.settingsText}>{item.title}</Text>
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
            <TouchableOpacity style={styles.settingsContainer}>
                <Text style={styles.settingsText}>Vibration Feedback</Text>
                <Switch
                    value={isVibrationOn}
                    onChange={onToggleVibration}
                />
            </TouchableOpacity>
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
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: "#ccc",
        borderRadius: 10
    },
    settingsList: {
        marginTop: 20
    }
});

export default SettingsScreen;