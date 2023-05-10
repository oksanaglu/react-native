import React from "react";
import { useFonts } from 'expo-font';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "./screens/Auth/LoginScreen";
import RegistrationScreen from "./screens/Auth/RegistrationScreen";
import Home from "./screens/Main/Home";

export default function App() {

    const [fontsLoaded] = useFonts({
      'RobotoRegular': require('./assets/fonts/Roboto-Regular.ttf'),
      'RobotoBold': require("./assets/fonts/Roboto-Bold.ttf"),
    });

    if (!fontsLoaded) {
        return null;
    }

    const AuthStack = createStackNavigator();

    return (
        <NavigationContainer>
            <AuthStack.Navigator initialRouteName="Registration">
                {/* <AuthStack.Screen name="Registration"
                                  component={RegistrationScreen} options={{
                    headerShown: false,
                }}/>
                <AuthStack.Screen name="Login"
                                  component={LoginScreen} options={{
                    headerShown: false,
                }}/> */}
                <AuthStack.Screen name="Home"
                                  component={Home} options={{
                    headerShown: false,
                }}/>
            </AuthStack.Navigator>
        </NavigationContainer>
    );
};
