import { Camera, CameraType } from 'expo-camera';
import { useState } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { IconButton } from 'react-native-paper';

export default function CameraScreen() {
    const [type, setType] = useState(CameraType.back);
    const [permission, requestPermission] = Camera.useCameraPermissions();
    const [zoomValue, setZoomValue] = useState(0.0);
    if (!permission) {
        return <View />;
    }

    if (!permission.granted) {
        return (
            <View style={styles.container}>
                <Text style={{ textAlign: 'center' }}>We need your permission to show the camera</Text>
                <Button onPress={requestPermission} title="grant permission" />
            </View>
        );
    }

    const toggleCameraType = () => {
        setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
    }

    const takePhoto = () => {

    }
    const toggleZoom = () => {
        setZoomValue(current => (current === 0.75 ? 0 : current + 0.25))
    }


    return (
        <View style={styles.container}>
            <Camera style={styles.camera} type={type} zoom={zoomValue} />
            <View style={styles.buttonContainer}>
                <IconButton
                    icon="camera-flip"
                    size={70}
                    mode='outlined'
                    iconColor='#000'
                    containerColor='#039be5'
                    onPress={toggleCameraType}
                    style={styles.button}
                />
                <IconButton
                    icon="camera"
                    size={70}
                    mode='outlined'
                    iconColor='#000'
                    containerColor='#039be5'
                    onPress={takePhoto}
                    style={styles.button}
                />
                <IconButton
                    icon="magnify"
                    size={70}
                    mode='outlined'
                    iconColor='#000'
                    containerColor='#039be5'
                    onPress={toggleZoom}
                    style={styles.button}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: "#d0efff"
    },
    camera: {
        flex: 1,
        marginTop: 50
    },
    buttonContainer: {
        height: 150,
        flexDirection: 'row',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        borderColor: '#000',
        borderWidth: 2,
        marginHorizontal: 20
    }
});
