import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

const PostsScreen = () => {

    return (
        <View style={styles.postsContainer}>
            <View style={{
                flexDirection: 'row',
            }}>
                <Image source={require('../../assets/images/Avatar.png')}/>
                <View style={styles.postsTitle}>
                    <Text>Natali Romanova</Text>
                    <Text>e-mail@example.com</Text>
                </View>
            </View>
        </View>
    )
};

export default PostsScreen;


export const styles = StyleSheet.create({
   
    postsContainer: {
        flex: 1,
        padding: 20,
        backgroundColor: '#FFFFFF',
    },

    postsTitle: {
        justifyContent: 'center',
        paddingLeft: 20
    }
});