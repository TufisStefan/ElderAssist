//auth.service.js
const URL_ROOT = "https://d34b-188-26-112-194.eu.ngrok.io";
export const AUTHURL = `${URL_ROOT}/api/auth/`;
export const USERURL = `${URL_ROOT}/api/test/`;
export const PRESCRIPTIONURL = `${URL_ROOT}/prescription/`;
export const TOKEN_KEY = "@user";

//ContactsScreen.js
export const CONTACTS_PER_PAGE = 6;

//MainMenu.js
export const DOUBLE_TAP_DELAY = 3000;

//SettingsScreen.js
export const SETTINGS = [
    { title: "Emergency Settings", route: "Emergency" },
    { title: "Placeholder1", route: "Emergency" },
    { title: "Placeholder2", route: "Emergency" }
];

//EmergencySettings.js
export const EMERGENCY_SETTINGS = [
    { title: "Set up emergency contact", hasModal: true, type: 'contact', storageKey: '@emergency_no' },
    { title: "Change emergency message", hasModal: true, type: 'message', storageKey: '@emergency_msg' },
    { title: "Allow location send", hasModal: false }
]


export const MAPS_URL = "http://www.google.com/maps/place/";

//Wordle.js
export const KEYBOARD_ROW_1 = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
export const KEYBOARD_ROW_2 = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];
export const KEYBOARD_ROW_3 = ["Z", "X", "C", "V", "B", "N", "M", "⌫"];


export const DEFAULT_GUESS = {
    0: "",
    1: "",
    2: "",
    3: "",
    4: "",
    5: "",
}

//MemoryGame.js
export const MEMORY_CARDS = [

    {
        index: 1,
        name: 'rabbit',
        image: require('../assets/memory-game/002-rabbit.png'),
    },
    {

        index: 2,
        name: 'koala',
        image: require('../assets/memory-game/003-koala.png'),
    },
    {

        index: 3,
        name: 'dog',
        image: require('../assets/memory-game/004-dog.png'),
    },
    {

        index: 4,
        name: 'dog-1',
        image: require('../assets/memory-game/005-dog-1.png'),
    },
    {

        index: 5,
        name: 'panda',
        image: require('../assets/memory-game/006-panda.png'),
    },
    {

        index: 6,
        name: 'giraffe',
        image: require('../assets/memory-game/007-giraffe.png'),
    },
    {

        index: 7,
        name: 'puffer-fish',
        image: require('../assets/memory-game/008-puffer-fish.png'),
    },
    {

        index: 8,
        name: 'bear-1',
        image: require('../assets/memory-game/009-bear-1.png'),
    },
    {

        index: 9,
        name: 'chicken',
        image: require('../assets/memory-game/010-chicken.png'),
    },
    {

        index: 10,
        name: 'meerkat',
        image: require('../assets/memory-game/011-meerkat.png'),
    },
    {

        index: 11,
        name: 'snake',
        image: require('../assets/memory-game/012-snake.png'),
    },
    {
        index: 12,
        name: 'bear',
        image: require('../assets/memory-game/001-bear.png'),
    },

];

export const HIDDEN_CARD = {
    index: 0,
    name: 'question-mark',
    image: require('../assets/memory-game/000-question-mark.png'),
};