import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import {createStackNavigator} from "@react-navigation/stack";
import CommentsScreen from "./CommentsScreen";
import MapScreen from './MapScreen';
import PostsDefaultScreen from "./PostsDefaultScreen";

const PostsStack = createStackNavigator();

const PostsScreen = ({ navigation, route }) => {
    if (!route.params) {
        return (
            <View style={styles.postsContainer}>
                <View style={{
                    flexDirection: 'row',
                }}>
                    <Image source={require('../../assets/images/Avatar.png')} />
                    <View style={styles.postsTitle}>
                        <Text>Natali Romanova</Text>
                        <Text>e-mail@example.com</Text>
                    </View>
                </View>
            </View>
        )
    }

    const {
        location,
        pictureHeaders,
        photoUrl
    } = route.params;


    return (
        <PostsStack.Navigator
            initialRouteName="PostsDefaultScreen"
        >
            <PostsStack.Screen name='PostsDefaultScreen' component={PostsDefaultScreen}
                options={{
                    title: 'Posts',
                    headerTitleAlign: 'center',
                    headerRightContainerStyle: {
                        paddingRight: 40,
                    },
                    headerRight: () => (
                        <Pressable
                            onPress={() => navigation.navigate("Logout")}
                            title="LogOut"
                        >
                            <MaterialCommunityIcons name="logout" size={24} color="#BDBDBD" />
                        </Pressable>
                    ),
                    headerLeft: null
                }}
                initialParams={{ pictureHeaders, location, photoUrl }} />
            <PostsStack.Screen name="Map" component={MapScreen}
                options={{
                    title: 'Photo location map'
                }} />
            <PostsStack.Screen name="Comments" component={CommentsScreen}
                options={{
                    title: 'post comments'
                }} />
        </PostsStack.Navigator>
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