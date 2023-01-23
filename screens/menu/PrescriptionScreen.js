import * as SQLite from 'expo-sqlite';
import { useEffect, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import PrescriptionService from '../../services/prescription.service';
import PrescriptionItem from '../../components/PrescriptionItem';
import * as Network from 'expo-network';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
    }),
})

const db = SQLite.openDatabase('db.prescriptionDb');
const PrescriptionScreen = () => {
    const [data, setData] = useState(null);
    useEffect(() => {
        if (data === null) {
            db.transaction(tx => {
                tx.executeSql(
                    'CREATE TABLE IF NOT EXISTS prescription_items ( \
                    id INTEGER PRIMARY KEY AUTOINCREMENT,\
                    medicament TEXT, \
                    quantity INTEGER, \
                    intake_interval INTEGER, \
                    available_until TEXT \
                    )', null,
                    () => {
                    },
                    (error) => {
                        console.log(error.message);
                    }
                );
                tx.executeSql(
                    'CREATE TABLE IF NOT EXISTS times_of_day ( \
                    id INTEGER PRIMARY KEY AUTOINCREMENT, \
                    name TEXT \
                    )'
                );
                tx.executeSql(
                    'CREATE TABLE IF NOT EXISTS items_times_of_day( \
                    item_id INTEGER REFERENCES prescription_items(id), \
                    time_of_day_id INTEGER REFERENCES times_of_day(id), \
                    PRIMARY KEY (item_id, time_of_day_id) \
                    )'
                );
                // tx.executeSql("DELETE FROM times_of_day");
                // tx.executeSql('INSERT INTO times_of_day (name) VALUES (?), (?), (?)', ["MORNING", "NOON", "EVENING"]);
            })
            fetchData();
        }
        else {
            triggerNotifications();
        }
    }, [data]);

    const fetchData = async () => {
        const networkStatus = await Network.getNetworkStateAsync();
        if (networkStatus.isInternetReachable) {
            await AsyncStorage.getItem("@username").then(
                (username) => PrescriptionService.getPrescription(username).then(response => {
                    console.log(response.data);
                    savePrescriptionItems(response);
                }),
                error => {
                    console.log(error);
                }
            );
        }
        db.transaction((tx) => {
            tx.executeSql('SELECT * FROM items_times_of_day', null,
                (_, { rows: { _array } }) => console.log(_array));
            // tx.executeSql('SELECT * FROM times_of_day', null,
            //     (_, { rows: { _array } }) => console.log(_array));

            tx.executeSql('SELECT \
                    prescription_items.medicament, \
                    prescription_items.quantity, \
                    prescription_items.intake_interval, \
                    prescription_items.available_until, \
                    items_times_of_day.time_of_day_id, \
                     times_of_day.name \
                     FROM prescription_items\
                     INNER JOIN items_times_of_day ON items_times_of_day.item_id = prescription_items.id \
                     INNER JOIN times_of_day ON items_times_of_day.time_of_day_id = times_of_day.id \
                     ', null,
                (_, { rows: { _array } }) => {
                    console.log(_array);
                    setData(_array);
                },
                (_, error) => console.log("eroare: " + error));
        });
    }

    const saveTimesOfDay = async (tx, item, resultSet) => {
        console.log(resultSet)
        await asyncForEach(item.timesOfDay, async (time) => {
            switch (time.name) {
                case "MORNING":
                    tx.executeSql("INSERT INTO items_times_of_day (item_id, time_of_day_id) \
            values (?, ?)", [resultSet.insertId, 1], (_, resultSet) => console.log(resultSet));
                    tx.executeSql('SELECT * FROM items_times_of_day', null,
                        (_, { rows: { _array } }) => console.log(_array));
                    break;
                case "NOON":
                    tx.executeSql("INSERT INTO items_times_of_day (item_id, time_of_day_id) \
            values (?, ?)", [resultSet.insertId, 2], (_, resultSet) => console.log(resultSet));
                    tx.executeSql('SELECT * FROM items_times_of_day', null,
                        (_, { rows: { _array } }) => console.log(_array));
                    break;
                case "EVENING":
                    tx.executeSql("INSERT INTO items_times_of_day (item_id, time_of_day_id) \
            values (?, ?)", [resultSet.insertId, 3], (_, resultSet) => console.log(resultSet));
                    tx.executeSql('SELECT * FROM items_times_of_day', null,
                        (_, { rows: { _array } }) => console.log(_array));
                    break;
            }
        })
    }

    const savePrescriptionItems = async (response) => {
        await asyncForEach(response.data.prescriptionItems, async (item) => {
            await db.transaction(async (tx) => {
                await tx.executeSql("DELETE FROM items_times_of_day");
                await tx.executeSql("DELETE FROM prescription_items");
                await tx.executeSql('INSERT INTO prescription_items \
        (medicament, quantity, intake_interval, available_until) \
        values (?, ?, ?, ?)',
                    [item.medicament.name, item.quantity, item.daysBetweenAdministrations, item.administrationEndDate
                    ],
                    (_, resultSet) => {
                        item.id = resultSet.insertId;
                        saveTimesOfDay(tx, item, resultSet);
                    },
                    (_, error) => {
                        console.log(error);
                    });
            })
        });
    }

    async function asyncForEach(array, callback) {
        for (let index = 0; index < array.length; index++) {
            await callback(array[index], index, array);
        }
    }

    const triggerNotifications = () => {
        Notifications.cancelAllScheduledNotificationsAsync();
        data.forEach(async element => {

            const today = new Date();
            const date = new Date(element.available_until);
            if (date < today) {
                return
            }
            let min = 0;
            let hr = 8;
            switch (element.name) {
                case "NOON":
                    hr = 14;
                    break;
                case "EVENING":
                    hr = 20;
                    break;
            }
            await Notifications.scheduleNotificationAsync({
                content: {
                    title: `Take ${element.quantity} ${element.medicament}`,
                    body: 'It is time to take your medicine!',
                    data: { data: 'goes here' },
                },
                trigger: {
                    hour: hr,
                    minute: min,
                    repeats: true
                },
            });
        });
    }


    return (
        <View>
            <View style={styles.header}>
                <Text style={styles.headerText}>
                    Name
                </Text>
                <Text style={styles.headerText}>
                    Quantity
                </Text>
                <Text style={styles.headerText}>
                    Day Time
                </Text>
            </View>
            {
                data && data
                    .filter(item => new Date(item.available_until) > new Date())
                    .sort((a, b) => a.time_of_day_id - b.time_of_day_id)
                    .map((item, index) => {
                        return (
                            <PrescriptionItem item={item} key={index} />
                        )
                    })
            }
        </View>
    );
}

const styles = StyleSheet.create({
    headerText: {
        fontSize: 24,
        fontWeight: '700',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: 10,
        paddingHorizontal: 5,
    }
})

export default PrescriptionScreen;