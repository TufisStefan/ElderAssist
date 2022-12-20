import React, { useContext, useState } from "react"
import { AuthContext } from "../../context/AuthContext"
import CustomButton from "../../components/CustomButton";

import {
    View,
    Text,
    TouchableOpacity,
} from 'react-native';
import { TextInput } from "react-native-paper";


const LoginScreen = ({ navigation }) => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const { login } = useContext(AuthContext);
    return (
        <View style={{
            paddingHorizontal: 25,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            flex: 1,
        }}>

            <Text
                style={{
                    fontSize: 32,
                    fontWeight: '500',
                    color: '#333',
                    marginBottom: 30,
                    alignSelf: 'center'
                }}>
                Login
            </Text>
            <TextInput
                label={'Username'}
                style={{ fontSize: 20, marginBottom: 10 }}
                keyboardType="default"
                value={username}
                left={<TextInput.Icon icon="account" size={35} />}
                onChangeText={text => setUsername(text)}
            />
            <TextInput
                label={'Password'}
                style={{ fontSize: 20, marginBottom: 20 }}
                left={<TextInput.Icon icon="lock" size={35} />}
                inputType="password"
                value={password}
                secureTextEntry={true}
                onChangeText={text => { setPassword(text) }}
            />

            <CustomButton label={"Login"} onPress={() => { login(username, password) }} />

            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    marginBottom: 30,
                }}>
                <Text style={{ fontSize: 20 }}>New to the app?</Text>
                <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                    <Text style={{ color: '#AD40AF', fontWeight: '700', fontSize: 20 }}> Register</Text>
                </TouchableOpacity>
            </View>
        </View >
    );
}

export default LoginScreen;