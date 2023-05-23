import React, { useEffect, useState } from "react";
import {
    View, TextInput,
    Text, Pressable, Image,
    Keyboard, Platform,
    TouchableWithoutFeedback,
    ImageBackground,
    KeyboardAvoidingView, StyleSheet
} from "react-native";
import {authSignUpUser} from "../../redux/auth/authOperations";
import { useDispatch } from "react-redux";
import {Camera} from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import { MaterialIcons } from "@expo/vector-icons";
import {getStorage, ref, uploadBytes, getDownloadURL} from "firebase/storage";

const initialState = {
    login: '',
    email: '',
    password: '',
}

const RegistrationScreen = ({ navigation }) => {

    const [state, setState] = useState(initialState);
    const [hasPermission, setHasPermission] = useState(null);
    const [camera, setCamera] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.front);
    const [avatarUrl, setAvatarUrl] = useState(null);
    const [makePhoto, setMakePhoto] = useState(null);

    const dispatch = useDispatch();
    const storage = getStorage();
    
    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            await MediaLibrary.requestPermissionsAsync();
            setHasPermission(status === "granted");
        })();
    }, []);

    const loginHandler = (value) =>
        setState((prevState) => ({
            ...prevState, login: value.trim()
        }));
    const nameHandler = (value) =>
        setState((prevState) => ({
            ...prevState, email: value.trim()
        }));
    const passwordHandler = (value) =>
        setState((prevState) => ({
            ...prevState, password: value
        }));
    
    const toggleMakePhoto = () => {
        if (!makePhoto) {
            setMakePhoto('camera')
        }
        if (makePhoto === 'camera' || makePhoto === 'user') {
            setMakePhoto(null)
        }
    }

    const uploadAvatar = async () => {

        if (avatarUrl) {
            const response = await fetch(`${avatarUrl}`)
            const file = await response.blob();
            const uniquePostId = Date.now().toString()

            const imageRef = await ref(storage, `avatars/${uniquePostId}`)
            await uploadBytes(imageRef, file);
            const newAvatar = await getDownloadURL(imageRef);

            dispatch(profileUpdateAvatar({ avatar: newAvatar }));

            setAvatarUrl(null);
            setMakePhoto(null);
        }
    }

    const onRegistration = async () => {
        const avatar = await uploadAvatar();
        Keyboard.dismiss()
        setState(initialState);
        dispatch(authSignUpUser({ ...state, avatar: avatar }));
  
    };

    const takePhoto = async () => {
        if (camera) {
            const { uri } = await camera.takePictureAsync();
            setAvatarUrl(uri);
            setMakePhoto('user')
            await MediaLibrary.createAssetAsync(uri);
        }
    }


    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
                <ImageBackground resizeMode="cover" source={require('../../assets/images/bg.jpg')} style={styles.imgBg}>
                    
                    <KeyboardAvoidingView
                        behavior={Platform.OS == "ios" ? "padding" : "height"}
                    >
                        <View style={styles.wrapper}>
                            <View style={styles.formInputs}>
                                <View style={styles.avatarContainer}>

                                    {!makePhoto &&
                                        <Image style={styles.avatarImage} source={require('../../assets/images/Avatar.png')} />
                                    }
                                    {makePhoto === 'camera' &&
                                        <Camera
                                            style={styles.avatarImage}
                                            type={type}
                                            ref={(ref) => {
                                                setCamera(ref);
                                            }}
                                        >
                                            <View style={styles.makePhotoButton}>
                                                {makePhoto &&
                                                    <Pressable
                                                        onPress={takePhoto}
                                                        title="TakePhoto"
                                                    >
                                                        <MaterialIcons name="add-a-photo" size={24} color="grey" />
                                                    </Pressable>
                                                }
                                            </View>
                                        </Camera>
                                    }
                                    {makePhoto === 'user' &&
                                        <Image style={styles.avatarImage} source={{ uri: avatarUrl }} />
                                    }
                                </View>
                                <Pressable title={"Login"} style={styles.imgAdd} onPress={toggleMakePhoto}>
                                    <View>
                                        <Image source={require('../../assets/images/add.png')} />
                                    </View>
                                </Pressable>
                                <View style={styles.headerTitle}>
                                    <Text style={{ fontFamily: 'Roboto', fontSize: 30 }}>Registration</Text>
                                </View>
                                <TextInput
                                    value={state.login}
                                    onChangeText={loginHandler}
                                    placeholder="Login"
                                    style={styles.input}
                                />
                                <TextInput
                                    value={state.email}
                                    onChangeText={nameHandler}
                                    placeholder="Email"
                                    style={styles.input}
                                />
                                <TextInput
                                    value={state.password}
                                    onChangeText={passwordHandler}
                                    placeholder="Password"
                                    secureTextEntry={true}
                                    style={styles.input}
                                />
                                <Pressable title={"Register"} style={styles.button} onPress={onRegistration}>
                                    <Text>To Register</Text>
                                </Pressable>
                                <Pressable onPress={() => navigation.navigate("Login")}
                                    style={{ paddingTop: 10 }}><Text>Already have an account?
                                        Sign In</Text></Pressable>
                            </View>
                        </View>
                    </KeyboardAvoidingView>
                </ImageBackground>
            </View>
        </TouchableWithoutFeedback>
    )
};

export default RegistrationScreen;



export const styles = StyleSheet.create({
    container: {
        display: 'flex',
        alignItems: "flex-end",
        justifyContent: "flex-end",
        minHeight: "100%",
        minWidth: "100%",
        backgroundColor: "#FFFFFF",
    },

    imgBg: {
        flex: 1,
        justifyContent: 'flex-end',
        minWidth: "100%",
    },

    wrapper: {
        marginTop: 'auto',
        display: 'flex',
        alignItems: "center",
        justifyContent: "center",
        height: "80%",
        minWidth: "100%",
        backgroundColor: "#FFFFFF",
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
    },

    formInputs: {
        display: 'flex',
        position: "relative",
        height: "80%",
        minWidth: "100%",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#FFFFFF",
    },

    headerTitle: {
        display: 'flex',
        paddingBottom: 40,
        fontFamily: "RobotoBold",
    },

    input: {
        width: 300,
        height: 50,
        padding: 10,
        borderWidth: 1,
        borderColor: "#E8E8E8",
        borderRadius: 5,
        marginBottom: 10,
        fontFamily: "RobotoRegular",

    },

    button: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: 300,
        height: 50,
        padding: 10,
        borderColor: "#E8E8E8",
        borderRadius: 100,
        marginBottom: 10,
        backgroundColor: '#FF6C00',
        fontFamily: "RobotoBold",
        
    },

    avatarContainer: {
        display: "flex",
        minHeight: 120,
        minWidth: 120,
        position: "absolute",
        top: -120,
        borderRadius: 16,
        backgroundColor: '#F6F6F6',
    },

    imgAdd: {
        display: 'flex',
        position: "absolute",
        minHeight: 25,
        minWidth: 25,
        borderRadius: 100,
        top: -40,
        right: '32%',
    },

  
        
    makePhotoButton: {
        alignContent: 'center',
        position: "absolute",
        backgroundColor: 'rgba(255,255,255,0.3)',
        width: 60,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        top: '40%',
        right: '40%',
        borderRadius: 50,
    },
});