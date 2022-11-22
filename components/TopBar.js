import * as React from 'react';
import { Appbar } from 'react-native-paper';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const TopBar = (props) => {
    const { logout } = useContext(AuthContext);

    return (
        <Appbar.Header>
            <Appbar.Content title={props.title} />
            <Appbar.Action icon="logout" onPress={() => {
                logout();
            }} />
        </Appbar.Header>
    );
}
export default TopBar;