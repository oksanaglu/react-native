import React, { useCallback } from "react";
import { StyleSheet, View } from "react-native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import LoginScreen from "./screens/LoginScreen";
import RegistrationScreen from "./screens/RegistrationScreen";

SplashScreen.preventAutoHideAsync();

export default function App() {
   const [fonts] = useFonts({
    RobotoBold: require("../assets/fonts/Roboto-Bold.ttf"),
    RobotoRegular: require("../assets/fonts/Roboto-Regular.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fonts) {
      await SplashScreen.hideAsync();
    }
  }, [fonts]);
  if (!fonts) {
    return null;
  };

  return (
    <View style={styles.container} onLayout={onLayoutRootView}>
      <RegistrationScreen />
      <LoginScreen />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});