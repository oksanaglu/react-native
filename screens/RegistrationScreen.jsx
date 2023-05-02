import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  Dimensions,
} from "react-native";

import { useDispatch } from "react-redux";
import { authSignUpUser } from "../../redux/auth/auth-operations";

const initialState = {
  email: "",
  password: "",
  nickname: "",
};

export default function RegisterScreen({ navigation }) {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [state, setState] = useState(initialState);

  const dispatch = useDispatch();

  const [dimensions, setDimensions] = useState(
    Dimensions.get("window").width - 20 * 2
  );

  useEffect(() => {
    const onChange = () => {
      const width = Dimensions.get("window").width - 20 * 2;
      setDimensions(width);
    };

    const subscription = Dimensions.addEventListener("change", onChange);

    return () => subscription?.remove();
  }, []);

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  };

  const handleSubmit = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
    dispatch(authSignUpUser(state));
    setState(initialState);
  };

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={styles.container}>
        <ImageBackground
          style={styles.image}
          source={require("../assets/images/bg.jpg")}
        >
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
          >
            <View
              style={{
                ...styles.form,
                marginBottom: isShowKeyboard ? 20 : 100,
                width: dimensions,
              }}
            >
              <View style={styles.header}>
                {/* <Text style={styles.red}>MY APLICATION</Text> */}
                <Text style={styles.headerTitle}>REGISTRATION</Text>
              </View>

              <View>
                <Text style={styles.inputTitle}>NickName:</Text>
                <TextInput
                  style={styles.input}
                  textAlign="center"
                  value={state.nickname}
                  onFocus={() => setIsShowKeyboard(true)}
                  onChangeText={(value) =>
                    setState((prevState) => ({ ...prevState, nickname: value }))
                  }
                />
              </View>
              <View style={{ marginTop: 20 }}>
                <Text style={styles.inputTitle}>Email:</Text>
                <TextInput
                  style={styles.input}
                  textAlign="center"
                  value={state.email}
                  onFocus={() => setIsShowKeyboard(true)}
                  onChangeText={(value) =>
                    setState((prevState) => ({ ...prevState, email: value }))
                  }
                />
              </View>
              <View style={{ marginTop: 20 }}>
                <Text style={styles.inputTitle}>Password:</Text>
                <TextInput
                  style={styles.input}
                  textAlign="center"
                  value={state.password}
                  onFocus={() => setIsShowKeyboard(true)}
                  secureTextEntry={true}
                  onChangeText={(value) =>
                    setState((prevState) => ({ ...prevState, password: value }))
                  }
                />
              </View>
              <TouchableOpacity
                style={styles.btn}
                activeOpacity={0.8}
                onPress={handleSubmit}
              >
                <Text style={styles.btnTitle}>Sign Up</Text>
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.5}
                onPress={() => navigation.navigate("Login")}
              >
                <Text style={styles.navTitle}>Go to Login</Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
    alignItems: "center",
  },

  header: {
    alignItems: "center",
    marginBottom: Platform.OS === "ios" ? 30 : 120,
  },

  headerTitle: {
    fontFamily: "DMMono-Regular",
    fontSize: 30,
    color: "#f0f8ff",
  },

  input: {
    height: 40,
    borderWidth: 1,
    borderColor: "#f0f8ff",
    borderRadius: 6,
    color: "#f0f8ff",
  },

  inputTitle: {
    marginBottom: 10,
    fontFamily: "DMMono-Regular",
    fontSize: 16,
    color: "#f0f8ff",
  },

  btn: {
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 6,
    marginTop: 40,
    ...Platform.select({
      ios: {
        backgroundColor: "transparent",
        borderColor: "#f0f8ff",
      },
      android: {
        backgroundColor: "#f00",
        borderColor: "transparent",
      },
    }),
  },


});