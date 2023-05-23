import React from "react";
import PostsScreen from "./PostsScreen";
import CreatePostsScreen from "./CreatePostsScreen";
import ProfileScreen from "./ProfileScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from "@expo/vector-icons";

const MainTab = createBottomTabNavigator();

const Home = () => {
  return (
    <MainTab.Navigator
      initialRouteName="Posts"
      screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveTintColor: "orange",
      }}
    >
      <MainTab.Screen
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, size, color }) => (
            <MaterialCommunityIcons
              name="post-outline"
              size={size}
              color={focused ? "orange" : color}
            />
          ),
        }}
        name={'PostsScreen'}
        component={PostsScreen}
      />

      <MainTab.Screen
        options={{
          title: 'Create post',
          headerTitleAlign: 'center',
          tabBarIcon: ({ focused, size, color }) => (
            <AntDesign
              name="pluscircleo"
              size={size}
              color={focused ? "orange" : color}
            />
          ),
        }}
        name={'CreatePostsScreen'}
        component={CreatePostsScreen}
      />

      <MainTab.Screen
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, size, color }) => (
            <MaterialCommunityIcons
              name="face-woman-profile"
              size={size}
              color={focused ? "orange" : color}
            />
          ),
        }}
        name={'ProfileScreen'}
        component={ProfileScreen}
      />
    </MainTab.Navigator>
  );
};

export default Home;