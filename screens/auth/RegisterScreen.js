
import React, { useState } from 'react';
import {
    SafeAreaView,
    View,
    Text,
    TouchableOpacity,
} from 'react-native';

import InputField from '../../components/InputField';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AuthService from '../../services/auth.service';
import CustomButton from '../../components/CustomButton';

const RegisterScreen = ({ navigation }) => {

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');


    const handleRegister = () => {

        setMessage("");
        AuthService.register(username, email, password).then((response) => {
            setMessage(response.data.message);
        },
            (error) => {
                const resMessage = error.message || error.toString();
                setMessage(resMessage);
            });

    };
    return (
        <SafeAreaView style={{ flex: 1, justifyContent: 'center' }}>
            <View
                showsVerticalScrollIndicator={false}
                style={{
                    paddingHorizontal: 25,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    flex: 1,
                }}>

                <Text
                    style={{
                        fontFamily: 'Roboto',
                        fontSize: 28,
                        fontWeight: '500',
                        color: '#333',
                        marginBottom: 30,
                        alignSelf: 'center'
                    }}>
                    Register
                </Text>

                <InputField
                    label={'Username'}
                    icon={
                        <Ionicons
                            name="person-outline"
                            size={20}
                            color="#666"
                            style={{ marginRight: 5 }}
                        />
                    }
                    value={username}
                    onChangeText={text => setUsername(text)}
                />

                <InputField
                    label={'Email'}
                    icon={
                        <MaterialIcons
                            name="alternate-email"
                            size={20}
                            color="#666"
                            style={{ marginRight: 5 }}
                        />
                    }
                    keyboardType="email-address"
                    value={email}
                    onChangeText={text => setEmail(text)}
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
                    value={password}
                    onChangeText={text => setPassword(text)}
                />

                <CustomButton label={'Register'} onPress={() => { handleRegister() }} />

                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        marginBottom: 30,
                    }}>
                    <Text>Already registered?</Text>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Text style={{ color: '#AD40AF', fontWeight: '700' }}> Login</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default RegisterScreen;