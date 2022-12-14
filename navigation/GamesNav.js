import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MemoryGame from '../screens/games/MemoryGame/MemoryGame';
import WordleGame from '../screens/games/Wordle/Wordle';
import GamesScreen from "../screens/menu/GamesScreen";
const Stack = createNativeStackNavigator();

const GamesNav = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Games" component={GamesScreen} />
            <Stack.Screen
                name="MemoryGame"
                component={MemoryGame}
            />
            <Stack.Screen
                name="Wordle"
                component={WordleGame}
            />
        </Stack.Navigator>
    );
}

export default GamesNav