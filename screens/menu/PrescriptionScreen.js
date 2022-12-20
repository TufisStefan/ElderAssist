import * as SQLite from 'expo-sqlite';
import { useContext, useEffect, useState } from 'react';
import { View } from 'react-native';
import PrescriptionService from '../../services/prescription.service';
import PrescriptionItem from '../../components/PrescriptionItem';
import * as Network from 'expo-network';
import AsyncStorage from '@react-native-async-storage/async-storage';

const db = SQLite.openDatabase('db.prescriptionDb');
const PrescriptionScreen = () => {
    const [data, setData] = useState(null);
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
            // tx.executeSql("DELETE FROM times_of_day");
            // tx.executeSql('INSERT INTO times_of_day (name) VALUES (?), (?), (?)', ["MORNING", "NOON", "EVENING"]);
        })
        fetchData();
    }, []);

    const fetchData = async () => {
        const networkStatus = await Network.getNetworkStateAsync();
        if (networkStatus.isInternetReachable) {
            AsyncStorage.getItem("@username").then(
                (username) => PrescriptionService.getPrescription(username).then(response => {
                    response.data.prescriptionItems.forEach(item => {
                        db.transaction((tx) => {
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
                })
            );
        }
        db.transaction((tx) => {
            // tx.executeSql('SELECT * FROM items_times_of_day', null,
            //     (_, { rows: { _array } }) => console.log(_array));
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
                    setData(_array);
                },
                (_, error) => console.log("eroare: " + error));
        });
    }


    return (
        <View>
            {
                data && data
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

export default PrescriptionScreen;