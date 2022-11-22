import React, { useContext, useState } from "react"
import { AuthContext } from "../../context/AuthContext"

import AntIcons from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import InputField from "../../components/InputField";
import CustomButton from "../../components/CustomButton";

import {
    View,
    Text,
    TouchableOpacity,
} from 'react-native';


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
                    fontFamily: 'Roboto',
                    fontSize: 32,
                    fontWeight: '500',
                    color: '#333',
                    marginBottom: 30,
                    alignSelf: 'center'
                }}>
                Login
            </Text>

            <InputField
                label={'Username'}
                icon={
                    <AntIcons
                        name="user"
                        size={20}
                        color="#666"
                        style={{ marginRight: 5 }}
                    />
                }
                keyboardType="default"
                value={username}
                onChangeText={text => setUsername(text)}
            />

            <InputField
                label={'Password'}
                icon={
                    <Ionicons
                        name="ios-lock-closed-outline"
                        size={20}
                        color="#666"
                        style={{ marginRight: 5 }}
                    />
                }
                inputType="password"
                fieldButtonLabel={"Forgot?"}
                fieldButtonFunction={() => { }}
                value={password}
                onChangeText={text => { setPassword(text) }}
            />

            <CustomButton label={"Login"} onPress={() => { login(username, password) }} />

            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    marginBottom: 30,
                }}>
                <Text>New to the app?</Text>
                <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                    <Text style={{ color: '#AD40AF', fontWeight: '700' }}> Register</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default LoginScreen;