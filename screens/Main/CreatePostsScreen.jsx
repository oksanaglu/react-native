import React, { useState, useEffect } from "react";
import { View, Text, Pressable, TextInput, StyleSheet, Image } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Camera } from "expo-camera";
import * as Location from "expo-location";
import * as MediaLibrary from "expo-media-library";
import { Ionicons } from '@expo/vector-icons';


const initialPictureHeaders = {
    name: '',
    place: '',
}

const CreatePostsScreen = ({ navigation }) => {
    const [camera, setCamera] = useState(null);
    const [photoUrl, setPhotoUrl] = useState(null);
    const [hasPermission, setHasPermission] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back);
    const [pictureHeaders, setPictureHeaders] = useState(initialPictureHeaders);
    const [location, setLocation] = useState(null);
    

    const placeHandler = (value) => {
        setPictureHeaders((prevState) => ({
            ...prevState,
            place: value,
        }));
    };

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            await MediaLibrary.requestPermissionsAsync();

            setHasPermission(status === "granted");
        })();

        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== "granted") {
                console.log("Permission to access location was denied");
            }

            let locationData = await Location.getCurrentPositionAsync({});
            const coords = {
                latitude: locationData.coords.latitude,
                longitude: locationData.coords.longitude,
            };

            setLocation(coords);
        })();

    }, []);

    if (hasPermission === null) {
        return <View />;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    const nameHandler = (value) => {
        setPictureHeaders((prevState) => ({
            ...prevState,
            name: value,
        }));
    };


    return (
        <View style={styles.createPostsCont}>
            <View style={styles.createPostsPhoto}>
                {!photoUrl ? (
                    <Camera style={styles.createPostsCamera} type={type}
                        ref={(ref) => {
                            setCamera(ref);
                        }}>
                        <View style={styles.buttonPhoto}>
                            {!photoUrl && (
                                <Pressable
                                    onPress={async () => {
                                        if (camera) {
                                            const { uri } = await camera.takePictureAsync();
                                            setPhotoUrl(uri);
                                            await MediaLibrary.createAssetAsync(uri);
                                        }
                                    }}
                                    title="TakePicture"
                                >
                                    <MaterialIcons name="add" size={24} color="#BDBDBD" />
                                </Pressable>
                            )}
                        </View>
                    </Camera>
                ) : (
                    <View>
                        <Image style={styles.createPostsCamera}
                            source={{ uri: photoUrl }} />
                    </View>
                )}
            </View>
            {!photoUrl ? (
                <Pressable style={styles.photoBtnBack}
                    onPress={() => {
                        setType(
                            type === Camera.Constants.Type.back
                                ? Camera.Constants.Type.front
                                : Camera.Constants.Type.back
                        );
                    }}
                    title="Reverse Camera"
                >
                    <MaterialIcons name="flip-camera-android" size={24} color="#BDBDBD" />
                </Pressable>
            ) : (
                <Pressable style={styles.photoBtnBack}
                    onPress={() => setPhotoUrl(null)}>
                    <MaterialIcons name="add-a-photo" size={24} color="#BDBDBD" />
                </Pressable>
            )
            }
            <TextInput
                onChangeText={nameHandler}
                placeholder="name"
                style={styles.createInput}
            />
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Pressable title={"Map"}
                    onPress={() => navigation.navigate("Map", {
                        location,
                    })}>
                    <Ionicons name="location-outline" size={24} color="#BDBDBD" />
                </Pressable>
                <TextInput
                    onChangeText={placeHandler}
                    placeholder='place'
                    value={pictureHeaders.place}
                    style={styles.createInput}
                />
            </View>
            <Pressable title={"Register"} style={styles.createButton}
                onPress={() => navigation.navigate("PostScreen", {
                    pictureHeaders,
                    location,
                    photoUrl,
                })}
            >
                <Text>Publish</Text>
            </Pressable>
        </View>
    );
};

export default CreatePostsScreen;

export const styles = StyleSheet.create({
    createPostsCont: {
        flex: 1,
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#FFFFFF',

    },

    createPostsPhoto: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F6F6F6',
        width: 350,
        height: 250,
        borderRadius: 8,
        
    },

    buttonPhoto: {
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        backgroundColor: '',
        borderRadius: 50,
        width: 60,
        height: 60,
        
    },

    createInput: {
        width: 300,
        height: 50,
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#E8E8E8",
        marginTop: 10,

    },

    createButton: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: 300,
        height: 50,
        padding: 10,
        borderColor: "#E8E8E8",
        borderRadius: 100,
        marginBottom: 10,
        backgroundColor: '#F6F6F6',
        marginTop: 20,

    },

    text: {
        color: "#BDBDBD"
    },

    createPostsCamera: {
        flex: 1,
        minWidth: '100%',
        justifyContent: 'center',
        alignItems: 'center',

    },
    photoBtnBack: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: 50,
        height: 50,
        padding: 10,
        borderColor: "grey",
        borderRadius: 100,
        marginBottom: 10,
        backgroundColor: '#F6F6F6',
        marginTop: 20,

    },

});



