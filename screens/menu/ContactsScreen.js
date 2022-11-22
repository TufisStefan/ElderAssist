import * as Contacts from 'expo-contacts';
import { useEffect, useState } from 'react';
import { FlatList, View } from "react-native";
import ContactListItem from "../../components/ContactListItem";
import { CONTACTS_PER_PAGE } from '../../constants';
import { IconButton, TextInput } from 'react-native-paper';

const ContactsScreen = ({ navigation }) => {
    const [contacts, setContacts] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        (async () => {
            const { status } = await Contacts.requestPermissionsAsync();
            if (status === 'granted') {
                const { data } = await Contacts.getContactsAsync({
                    fields: [Contacts.Fields.Image],
                });

                if (data.length > 0) {
                    setContacts(data.filter(item => (searchQuery === '' ? item : item.name.toLowerCase().includes(searchQuery.toLowerCase()))));
                }
            }
        })();
    }, [searchQuery]);

    const handlePreviousPage = () => {
        setCurrentPage((currentPage - 1 < 0) ? 0 : currentPage - 1)
    }

    const handleNextPage = () => {
        setCurrentPage(currentPage + 1)
    }

    const keyExtractor = (item, index) => {
        return item.id.toString() || index.toString();
    };

    const onPressContact = (contactId) => {
        navigation.navigate('ContactDetails', {
            id: contactId
        });
    }

    const onChangeSearch = (query) => {
        setCurrentPage(0);
        setSearchQuery(query);
    }

    const renderItem = ({ item, index }) => {
        return <ContactListItem onPressContact={() => onPressContact(item.id)} contact={item} />;

    };

    return (
        <View style={{ backgroundColor: '#ffffed', flex: 1 }}>
            <TextInput
                value={searchQuery}
                placeholder="Search"
                onChangeText={onChangeSearch}
                style={{
                    fontSize: 32,
                    backgroundColor: '#ffffed',
                    color: '#000',
                    marginTop: 10
                }}
                left={<TextInput.Icon icon="magnify" size={40} />}

            />
            <FlatList
                data={contacts.slice(CONTACTS_PER_PAGE * currentPage, (currentPage + 1) * CONTACTS_PER_PAGE)}
                renderItem={renderItem}
                keyExtractor={keyExtractor}
                showsVerticalScrollIndicator={false}
            />
            <View
                style={{
                    height: 100,
                    flexDirection: 'row',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                <IconButton
                    icon="arrow-left-bold-box"
                    iconColor='#f58216'
                    size={110}
                    disabled={currentPage === 0}
                    onPress={() => handlePreviousPage()}
                />
                <IconButton
                    icon="arrow-right-bold-box"
                    size={110}
                    iconColor='#f58216'
                    disabled={currentPage === Math.floor(contacts.length / CONTACTS_PER_PAGE)}
                    onPress={() => handleNextPage()}
                />
            </View>
        </View>
    );
};

export default ContactsScreen;