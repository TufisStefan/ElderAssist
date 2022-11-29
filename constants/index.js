//auth.service.js
export const AUTHURL = "https://127c-2a02-2f04-743-6200-1422-42a7-1a7-5cbf.eu.ngrok.io/api/auth/";
export const USERURL = "https://127c-2a02-2f04-743-6200-1422-42a7-1a7-5cbf.eu.ngrok.io/api/test/";
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
    { title: "Set up emergency contact", hasModal: true, type: 'contact' },
    { title: "Change emergency message", hasModal: true, type: 'message' },
    { title: "Allow location send", hasModal: false }
]


export const MAPS_URL = "http://www.google.com/maps/place/";

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