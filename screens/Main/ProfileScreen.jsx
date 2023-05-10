import React from "react";
import { View, Pressable, Image, ImageBackground, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const ProfileScreen = ({navigation}) => {

    return (
        <View style={styles.profileContainer}>
            <ImageBackground resizeMode="cover" source={require('../../assets/images/bg.jpg')} style={styles.imgBg}>
                <View style={styles.wrapper}>
                    <View style={styles.formInputs}>
                        <View style={styles.avatarContainer}>
                            <Image source={require('../../assets/images/Avatar.png')} />
                        </View>
                        <Pressable title={"Login"} style={styles.imgAdd}
                            onPress={() => alert("Choose a photo!")}>
                            <View>
                                <Image source={require('../../assets/images/add.png')} />
                            </View>
                        </Pressable>
                        <Pressable
                            onPress={() => navigation.navigate("Login")}
                            title="LogOut"
                            style={styles.profileLogOut}
                        >
                            <MaterialCommunityIcons name="logout" size={24} color="#BDBDBD" />
                        </Pressable>
                    </View>
                </View>
            </ImageBackground>
        </View>
    )
};

export default ProfileScreen;


export const styles = StyleSheet.create({
    profileContainer: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },

    imgBg: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: "center",
        resizeMode: "cover",
    },

    imgAdd: {
        display: 'flex',
        position: "absolute",
        minHeight: 125,
        minWidth: 125,
        borderRadius: 100,
        right: '39%',
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

    profileLogOut: {
        display: 'flex',
        position: "absolute",
        minHeight: 25,
        minWidth: 25,
        borderRadius: 100,
        top: -50,
        right: '10%',
    },
});