import { Platform } from "react-native";

import * as firebase from 'firebase/app';
import { getFirestore } from "firebase/firestore";
// @ts-ignore
import { getAuth, initializeAuth, getReactNativePersistence, Auth } from "firebase/auth";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
    apiKey: process.env.EXPO_PUBLIC_APIKEY,
    authDomain: process.env.EXPO_PUBLIC_AUTHDOMAIN,
    projectId: process.env.EXPO_PUBLIC_PROJECTID,
    storageBucket: process.env.EXPO_PUBLIC_STORAGEBUCKET,
    messagingSenderId: process.env.EXPO_PUBLIC_MESSAGINGSENDERID,
    appId: process.env.EXPO_PUBLIC_APPID,
    measurementId: process.env.EXPO_PUBLIC_MEASUREMENTID,
};


function _getApp(): firebase.FirebaseApp {
    let app = null

    if (firebase.getApps().length === 0) {
        app = firebase.initializeApp(firebaseConfig);
    } else {
        app = firebase.getApp()
    }
    return app;
}


function _getAuth(): Auth {
    let auth = null

    if (Platform.OS === "web") {
        auth = getAuth(app);
    } else {
        auth = initializeAuth(app, {
            persistence: getReactNativePersistence(ReactNativeAsyncStorage)
        });
    }

    return auth
}

const app = _getApp();
const auth = _getAuth();
const db = getFirestore(app);

// Initialize Firebase
export {
    auth,
    db
}

// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase