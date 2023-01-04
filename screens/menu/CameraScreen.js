import { Camera, CameraType, FlashMode } from 'expo-camera';
import { useEffect, useRef, useState } from 'react';
import { Button, Image, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { IconButton } from 'react-native-paper';
import CustomSwitch from '../../components/CustomSwitch';
import * as MediaLibrary from 'expo-media-library';
import * as ImagePicker from 'expo-image-picker';

export default function CameraScreen() {
    let cameraRef = useRef();
    const [type, setType] = useState(CameraType.back);
    const [flashMode, setFlashMode] = useState(FlashMode.auto);
    const [photo, setPhoto] = useState(undefined);
    const [permission, requestPermission] = Camera.useCameraPermissions();
    const [zoomValue, setZoomValue] = useState(0.0);
    const [selectedMode, setSelectedMode] = useState(1);


    if (!permission) {
        return <View />;
    }

    if (!permission.granted) {
        return (
            <View style={styles.container}>
                <Text style={{ textAlign: 'center', fontSize: 20 }}>We need your permission to access the camera</Text>
                <Button onPress={requestPermission} title="grant permission" />
            </View>
        );
    }

    const toggleCameraType = () => {
        setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
    }


    const updateToggledMode = (val) => {
        setSelectedMode(val);
    };

    const handlePressTakePhoto = async () => {
        if (photo === undefined) {
            await takePhoto();
        }
        else {
            removePhoto();
        }
    }

    const removePhoto = () => {
        setPhoto(undefined);
    }

    const takePhoto = async () => {
        let options = {
            quality: 0,
            skipProcessing: true,
            base64: true,
            exif: false
        };
        let newPhoto = await cameraRef.current.takePictureAsync(options);
        console.log(newPhoto);
        setPhoto(newPhoto);
    }
    const toggleZoom = () => {
        setZoomValue(current => (current === 0.75 ? 0 : current + 0.25))
    }


    const savePhoto = async () => {
        const { status } = await MediaLibrary.requestPermissionsAsync();
        if (status === 'granted') {
            await MediaLibrary.saveToLibraryAsync(photo.uri);
            setPhoto(undefined);
        }
    }


    const toggleTorch = () => {
        setFlashMode(current => (current === FlashMode.auto ? FlashMode.torch : FlashMode.auto));
    }


    return (
        <View style={styles.container}>
            <CustomSwitch
                selectionMode={selectedMode}
                option1={'Camera'}
                option2={'Magnifier'}
                updateToggledMode={updateToggledMode}
                selectionColor={'#026190'}
            />
            {photo === undefined
                ? <Camera
                    style={styles.camera}
                    type={type}
                    zoom={zoomValue}
                    ref={cameraRef}
                    flashMode={flashMode}
                />
                : <SafeAreaView style={styles.imageView}>
                    <Image style={styles.preview} source={{ uri: "data:image/jpg;base64," + photo.base64 }} />
                    <Button title='Save' onPress={savePhoto} />
                </SafeAreaView>
            }
            <View style={styles.buttonContainer}>
                {selectedMode === 1 &&
                    <IconButton
                        icon="camera-flip"
                        size={70}
                        mode='outlined'
                        iconColor='#000'
                        containerColor='#039be5'
                        onPress={toggleCameraType}
                        style={styles.button}
                    />
                }
                {selectedMode === 2 &&
                    <IconButton
                        icon="magnify"
                        size={70}
                        mode='outlined'
                        iconColor='#000'
                        containerColor='#039be5'
                        onPress={toggleZoom}
                        style={styles.button}
                    />
                }
                <IconButton
                    icon={photo === undefined ? "camera" : "camera-off"}
                    size={70}
                    mode='outlined'
                    iconColor='#000'
                    containerColor='#039be5'
                    onPress={handlePressTakePhoto}
                    style={styles.button}
                />

                {selectedMode === 1 &&
                    <IconButton
                        icon="image"
                        size={70}
                        mode='outlined'
                        iconColor='#000'
                        containerColor='#039be5'
                        onPress={() => { }}
                        style={styles.button}
                    />
                }

                {selectedMode === 2 &&
                    <IconButton
                        icon={flashMode === FlashMode.auto ? "flashlight" : "flashlight-off"}
                        size={70}
                        mode='outlined'
                        iconColor='#000'
                        containerColor='#039be5'
                        onPress={toggleTorch}
                        style={styles.button}
                    />
                }
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
        marginTop: 10
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
