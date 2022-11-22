import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainMenu from '../screens/menu/MainMenu';
import ContactsScreen from '../screens/menu/ContactsScreen';
import ContactDetails from '../components/ContactDetails';
import CameraScreen from '../screens/menu/CameraScreen';
import SettingsScreen from '../screens/menu/SettingsScreen';

const Stack = createNativeStackNavigator();

const MainMenuNav = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="MainMenu"
                component={MainMenu}
                options={{ title: 'Menu', headerShown: false }}
            />
            <Stack.Screen name="Contacts" component={ContactsScreen} />
            <Stack.Screen name="ContactDetails" component={ContactDetails} />
            <Stack.Screen name="Camera" component={CameraScreen} />
            <Stack.Screen name="Settings" component={SettingsScreen} />
        </Stack.Navigator>
    );
};

export default MainMenuNav;