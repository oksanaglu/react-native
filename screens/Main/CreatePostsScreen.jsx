
import React from "react";
import { View, Text, Pressable, TextInput, StyleSheet, } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const CreatePostsScreen = () => {

    return (
        <View style={styles.createPostsCont}>
            <View style={styles.createPostsPhoto}>
                <View style={styles.buttonPhoto}>
                    <Pressable
                        onPress={() => alert("Choose a photo!")}
                        title="LogOut">
                        <MaterialIcons name="add" size={24} color="#BDBDBD" />
                    </Pressable>
                </View>
            </View>
            <Text style={styles.text}>Upload photo</Text>
            <TextInput placeholder="name" style={styles.createInput} />
            <TextInput placeholder="place" style={styles.createInput} />
            <Pressable title={"Register"} style={styles.createButton} onPress={() => alert("Upload a photo!")}>
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
    }

});