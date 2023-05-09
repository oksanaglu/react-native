import React, { useState } from "react";
import {
    View, TextInput,
    Text, Pressable, Keyboard,
    Platform, ImageBackground,
    KeyboardAvoidingView,
    TouchableWithoutFeedback, StyleSheet
} from "react-native";

const initialState = {
    login: '',
    email: '',
    password: '',
}

const LoginScreen = ({navigation}) => {

    const [state, setState] = useState(initialState);

    const nameHandler = (value) =>
        setState((prevState) => ({
            ...prevState, email: value
        }));
    const passwordHandler = (value) =>
        setState((prevState) => ({
            ...prevState, password: value
        }));

    const onLogin = () => {
        console.log(state);
        Keyboard.dismiss()
        setState(initialState);
        navigation.navigate("Home")
    };


    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
                <ImageBackground resizeMode="cover" source={require('../../assets/images/bg.jpg')} style={styles.imgBg}>
                    <KeyboardAvoidingView
                        behavior={Platform.OS == "ios" ? "padding" : "height"}
                    >
                        <View style={styles.wrapper}>
                            <View style={styles.formInputs}>
                                <View style={styles.headerTitle}>
                                    <Text style={{fontFamily: 'Roboto', fontSize: 30}}>Sign In</Text>
                                </View>
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
                                <Pressable title={"Login"} style={styles.button} onPress={onLogin}>
                                    <Text>Sign In</Text>
                                </Pressable>
                                <Pressable onPress={() => navigation.navigate("Registration")}
                                           style={{paddingTop: 10}}>
                                    <Text>Don't have an account? Go to Register</Text>
                                </Pressable>
                            </View>
                        </View>
                    </KeyboardAvoidingView>
                </ImageBackground>
            </View>
        </TouchableWithoutFeedback>
    )
};

export default LoginScreen;


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
        alignItems: "center",
        resizeMode: "cover",
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
    },

    input: {
        width: 300,
        height: 50,
        padding: 10,
        borderWidth: 1,
        borderColor: "#E8E8E8",
        borderRadius: 5,
        marginBottom: 10,
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
    },

    avatarContainer: {
        display: "flex",
        position: "absolute",
        minHeight: 120,
        minWidth: 120,
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
        top: -50,
        right: '39%',
    },
});