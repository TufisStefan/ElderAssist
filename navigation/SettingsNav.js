import EmergencySettings from "../screens/settings/EmergencySetttings";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SettingsScreen from "../screens/menu/SettingsScreen";
const Stack = createNativeStackNavigator();

const SettingsNav = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Settings" component={SettingsScreen} />
            <Stack.Screen
                name="Emergency"
                component={EmergencySettings}
            />
        </Stack.Navigator>
    );
}

export default SettingsNav