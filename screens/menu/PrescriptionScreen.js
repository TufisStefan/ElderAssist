
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SQLite from 'expo-sqlite';
import { useContext, useEffect, useState } from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import { AuthContext } from '../../context/AuthContext';
import PrescriptionService from '../../services/prescription.service';

const db = SQLite.openDatabase('db.prescriptionDb');
const PrescriptionScreen = () => {
    const [data, setData] = useState(null);
    const { username } = useContext(AuthContext);

    useEffect(() => {
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
                    PRIMARY KEY (Item_id, time_of_day_id) \
                    )'
            );
        })
        fetchData();
    }, []);

    const fetchData = () => {
        PrescriptionService.getPrescription(username).then(response => {
            console.log(response.data);
            response.data.prescriptionItems.forEach(item => {
                db.transaction((tx) => {
                    let itemId = null;
                    tx.executeSql("DELETE FROM items_times_of_day");
                    tx.executeSql("DELETE FROM prescription_items");
                    tx.executeSql('INSERT INTO prescription_items \
                    (medicament, quantity, intake_interval, available_until) \
                    values (?, ?, ?, ?)',
                        [item.medicament.name, item.quantity, item.daysBetweenAdministrations, item.administrationEndDate
                        ],
                        (_, resultSet) => {
                            item.id = resultSet.insertId;
                            item.timesOfDay.forEach(time => {
                                switch (time.name) {
                                    case "MORNING":
                                        tx.executeSql("INSERT INTO items_times_of_day (item_id, time_of_day_id) \
                                        values (?, ?)", [resultSet.insertId, 1]);
                                        break;
                                    case "NOON":
                                        tx.executeSql("INSERT INTO items_times_of_day (item_id, time_of_day_id) \
                                        values (?, ?)", [resultSet.insertId, 2]);
                                        break;
                                    case "EVENING":
                                        tx.executeSql("INSERT INTO items_times_of_day (item_id, time_of_day_id) \
                                        values (?, ?)", [resultSet.insertId, 3]);
                                        break;
                                }
                            })
                        },
                        (_, error) => console.log(error));

                })
            });
            db.transaction((tx) => {
                // tx.executeSql('SELECT * FROM items_times_of_day', null,
                //     (_, { rows: { _array } }) => console.log(_array));
                // tx.executeSql('SELECT * FROM times_of_day', null,
                //     (_, { rows: { _array } }) => console.log(_array));
                tx.executeSql(
                    "SELECT * FROM prescription_items",
                    null,
                    async (_, { rows: { _array } }) => {
                        await _array.forEach(async (item) => {
                            await tx.executeSql('SELECT times_of_day.name \
                            FROM items_times_of_day \
                            LEFT JOIN times_of_day ON items_times_of_day.time_of_day_id = times_of_day.id \
                            WHERE items_times_of_day.item_id = ?', [item.id],
                                (_, { rows: { _array } }) => {
                                    console.log(item);
                                    item.timesOfDay = _array;
                                    console.log(item.timesOfDay);

                                });
                        });
                        console.log(_array);
                        AsyncStorage.setItem('@prescription', JSON.stringify(_array));
                        setData(_array);
                    },
                    (_, error) => console.log(error)
                );
            });
        });

    }


    const getData = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('@prescription')
            return jsonValue != null ? JSON.parse(jsonValue) : null;
        } catch (e) {
            // error reading value
        }
    }

    return (
        <View>
            <Text>
                PrescriptionScreen
            </Text>
            {
                data && data.map((item) => {
                    getData().then(response => console.log(response));
                    console.log(item);
                    // for (let key in item) {
                    //     console.log(key);
                    //     console.log(item[key]);
                    // }
                    console.log(item.timesOfDay);
                    return (
                        <View key={item.id}>
                            <Text>{item.medicament}</Text>
                            <Text>{item.quantity}</Text>
                            <Text>{item.intake_interval}</Text>
                            <Text>{item.available_until}</Text>
                        </View>
                    )
                })
            }
        </View>
    )
}

export default PrescriptionScreen;