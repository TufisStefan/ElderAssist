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