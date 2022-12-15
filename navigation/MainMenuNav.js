import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainMenu from '../screens/menu/MainMenu';
import ContactsScreen from '../screens/menu/ContactsScreen';
import ContactDetails from '../components/ContactDetails';
import CameraScreen from '../screens/menu/CameraScreen';
import SettingsNav from './SettingsNav';
import AccountScreen from '../screens/menu/AccountScreen';
import GamesNav from './GamesNav';
import PrescriptionScreen from '../screens/menu/PrescriptionScreen';

const Stack = createNativeStackNavigator();

const MainMenuNav = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="MainMenu"
                component={MainMenu}
                options={{ headerShown: false }}
            />
            <Stack.Screen name="Contacts" component={ContactsScreen} />
            <Stack.Screen name="ContactDetails" component={ContactDetails} />
            <Stack.Screen name="Camera" component={CameraScreen} />
            <Stack.Screen name="SettingsNav" component={SettingsNav} options={{ headerShown: false }} />
            <Stack.Screen name="Account" component={AccountScreen} />
            <Stack.Screen name="GamesNav" component={GamesNav} options={{ headerShown: false }} />
            <Stack.Screen name="Medication" component={PrescriptionScreen} />
        </Stack.Navigator>
    );
};

export default MainMenuNav;