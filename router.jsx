// import React from "react";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import { MaterialCommunityIcons } from "@expo/vector-icons";

// import LoginScreen from "./screens/Auth/LoginScreen";
// import RegistrationScreen from "./screens/Auth/RegistrationScreen"

// import PostsScreen from "./screens/Main/PostsScreen";
// import CreatePostsScreen from "./screens/Main/CreatePostsScreen";
// import ProfileScreen from "./screens/Main/ProfileScreen";

// const AuthStack = createNativeStackNavigator();
// const MainTab = createBottomTabNavigator();

// const useRoute = (isAuth) => {
//     if (!isAuth) {
//         return (
//             <AuthStack.Navigator initialRouteName="Registration">
//                 <AuthStack.Screen name="Registration"
//                     component={RegistrationScreen} options={{
//                         headerShown: false,
//                     }} />
//                 <AuthStack.Screen name="Login"
//                     component={LoginScreen} options={{
//                         headerShown: false,
//                     }} />
//             </AuthStack.Navigator>
//         );
//     }
//     return (
//         <MainTab.Navigator initialRouteName="Posts"
//             screenOptions={{
//                 tabBarShowLabel: false,
//             }}>
//             <MainTab.Screen options={{
//                 title: 'Posts',
//                 headerTitleAlign: 'center',
//                 headerRightContainerStyle: {
//                     paddingRight: 40,
//                 },
//                 headerRight: () => (
//                     <Pressable
//                         onPress={() => navigation.navigate("Login")}
//                         title="LogOut"
//                     >
//                         <MaterialCommunityIcons name="logout" size={24} color="#BDBDBD" />
//                     </Pressable>
//                 ),
//                 tabBarIcon: ({ focused, size, color }) => (
//                     <MaterialCommunityIcons name="post-outline" size={size} color={color} />),
//             }}
//                 name={'PostScreen'} component={PostsScreen} />
            
//             <MainTab.Screen options={{
//                 title: 'Create post',
//                 headerTitleAlign: 'center',
//                 tabBarIcon: ({ focused, size, color }) => (
//                     <MaterialIcons name="create" size={size} color={color} />
//                 ),
//             }}
//                 name={'CreatePostsScreen'} component={CreatePostsScreen} />
            
            
//             <MainTab.Screen options={{
//                 headerShown: false,
//                 tabBarIcon: ({ focused, size, color }) => (
//                     <MaterialCommunityIcons name="face-woman-profile" size={size} color={color} />
//                 ),
//             }}
//                 name={'ProfileScreen'} component={ProfileScreen} />
//         </MainTab.Navigator>
//     );
// };

// export default useRoute;