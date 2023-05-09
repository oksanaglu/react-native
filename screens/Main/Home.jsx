import React from "react";
import PostsScreen from "./PostsScreen";
import CreatePostsScreen from "./CreatePostsScreen";
import ProfileScreen from "./ProfileScreen";
import { Pressable, } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';

const MainTab = createBottomTabNavigator();

const Home = ({ navigation }) => {
    return (
        <MainTab.Navigator initialRouteName="Posts"
            screenOptions={{
                tabBarShowLabel: false,
            }}>
            <MainTab.Screen options={{
                title: 'Posts',
                headerTitleAlign: 'center',
                headerRightContainerStyle: {
                    paddingRight: 40,
                },
                headerRight: () => (
                    <Pressable
                        onPress={() => navigation.navigate("Login")}
                        title="LogOut"
                    >
                        <MaterialCommunityIcons name="logout" size={24} color="#BDBDBD" />
                    </Pressable>
                ),
                tabBarIcon: ({ focused, size, color }) => (
                    <MaterialCommunityIcons name="post-outline" size={size} color={color} />),
            }}
                name={'PostScreen'} component={PostsScreen} />
            
            <MainTab.Screen options={{
                title: 'Create post',
                headerTitleAlign: 'center',
                tabBarIcon: ({ focused, size, color }) => (
                    <MaterialIcons name="create" size={size} color={color} />
                ),
            }}
                name={'CreatePostsScreen'} component={CreatePostsScreen} />
            
            
            <MainTab.Screen options={{
                headerShown: false,
                tabBarIcon: ({ focused, size, color }) => (
                    <MaterialCommunityIcons name="face-woman-profile" size={size} color={color} />
                ),
            }}
                name={'ProfileScreen'} component={ProfileScreen} />
        </MainTab.Navigator>
    );
};

export default Home;