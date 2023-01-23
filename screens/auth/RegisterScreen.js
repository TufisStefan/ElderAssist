
import React, { useState } from 'react';
import {
    SafeAreaView,
    View,
    Text,
    TouchableOpacity,
} from 'react-native';

import AuthService from '../../services/auth.service';
import CustomButton from '../../components/CustomButton';
import { TextInput } from 'react-native-paper';
import InfoModal from '../../components/InfoModal';

const RegisterScreen = ({ navigation }) => {

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [isModalDisplayed, setIsModalDisplayed] = useState(false);


    const displayModal = () => {
        setIsModalDisplayed(true);
    }
    const hideModal = () => {
        setIsModalDisplayed(false);
        navigation.goBack();
    }

    const handleRegister = () => {

        setMessage("");
        AuthService.register(username, email, password).then((response) => {
            setMessage(response.data.message);
            displayModal();
        },
            (error) => {
                const resMessage = error.message || error.toString();
                console.log(resMessage);
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
                        fontSize: 32,
                        fontWeight: '500',
                        color: '#333',
                        marginBottom: 30,
                        alignSelf: 'center'
                    }}>
                    Register
                </Text>

                <TextInput
                    label={'Username'}
                    value={username}
                    style={{ fontSize: 20, marginBottom: 10 }}
                    left={<TextInput.Icon icon="account" size={35} />}
                    onChangeText={text => setUsername(text)}
                />

                <TextInput
                    label={'Email'}
                    keyboardType="email-address"
                    value={email}
                    style={{ fontSize: 20, marginBottom: 10 }}
                    left={<TextInput.Icon icon="at" size={35} />}
                    onChangeText={text => setEmail(text)}
                />

                <TextInput
                    label={'Password'}
                    inputType="password"
                    value={password}
                    secureTextEntry={true}
                    style={{ fontSize: 20, marginBottom: 20 }}
                    left={<TextInput.Icon icon="lock" size={35} color="#000" />}
                    onChangeText={text => setPassword(text)}
                />

                <CustomButton label={'Register'} onPress={() => { handleRegister() }} />
                <InfoModal
                    visible={isModalDisplayed}
                    hideModal={hideModal}
                    text={"Register successful! You can now login."}
                />
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        marginBottom: 30,
                    }}>
                    <Text style={{ fontSize: 20 }}>Already registered?</Text>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Text style={{ color: '#AD40AF', fontWeight: '700', fontSize: 20 }}> Login</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default RegisterScreen;