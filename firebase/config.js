import 'firebase/storage';
import AsyncStorage from "@react-native-async-storage/async-storage";
import "firebase/auth";
import { initializeApp, getApp, getApps } from 'firebase/app';
import {
  initializeAuth,
  getReactNativePersistence,
} from "firebase/auth/react-native";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCpi_PMbRKTvFEotkPqz5G-hwI0tbRGAIo",
  authDomain: "react-native-project-9dcb1.firebaseapp.com",
  projectId: "react-native-project-9dcb1",
  storageBucket: "react-native-project-9dcb1.appspot.com",
  messagingSenderId: "1066610157926",
  appId: "1:1066610157926:web:bb669a65862c29c66100a7",
  measurementId: "G-HQV9B2NTET"
};


// const app = initializeApp(firebaseConfig);
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export { auth };

export const db = getFirestore(app);

export const firestore = getFirestore(app);