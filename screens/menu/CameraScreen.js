import { Camera, CameraType } from 'expo-camera';
import { useEffect, useRef, useState } from 'react';
import { Button, Image, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { IconButton } from 'react-native-paper';

export default function CameraScreen() {
    let cameraRef = useRef();
    const [type, setType] = useState(CameraType.back);
    const [photo, setPhoto] = useState(undefined);
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

    const takePhoto = async () => {
        let options = {
            quality: 0,
            skipProcessing: true,
            base64: true,
            exif: false
        };
        let newPhoto = await cameraRef.current.takePictureAsync(options);
        setPhoto(newPhoto);
    }
    const toggleZoom = () => {
        setZoomValue(current => (current === 0.75 ? 0 : current + 0.25))
    }


    return (
        <View style={styles.container}>
            {photo === undefined
                ? <Camera
                    style={styles.camera}
                    type={type}
                    zoom={zoomValue}
                    ref={cameraRef}
                />
                : <SafeAreaView style={styles.imageView}>
                    <Image style={styles.preview} source={{ uri: "data:image/jpg;base64," + photo.base64 }} />
                </SafeAreaView>
            }
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
    },
    imageView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    preview: {
        alignSelf: 'stretch',
        flex: 1
    }
});
