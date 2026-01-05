import { initializeApp, getApps, getApp } from 'firebase/app';
import { initializeAuth, connectAuthEmulator, getReactNativePersistence, getAuth } from '@firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
    apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
    measurementId: process.env.EXPO_PUBLIC_FIREBASE_MEASUREMENT_ID
};

const firebaseDevConfig = {
    apiKey: "DevApiKey",
    authDomain: "test.example.com",
    projectId: "test-12345",
    storageBucket: "test-12345.example.com",
    messagingSenderId: "123412341234",
    appId: "1:123412341234:web:0000000000000000000000"
};

if (getApps().length === 0) {
    const appInstance = initializeApp(__DEV__ ? firebaseDevConfig : firebaseConfig);
    // This is how firebase suggests initializing auth and have it manage the tokens
    // See: https://firebase.google.com/docs/reference/js/auth.md#getreactnativepersistence_bab4ada
    initializeAuth(appInstance, {
        persistence: getReactNativePersistence(ReactNativeAsyncStorage)
    })
}

const app = getApp();
const auth = getAuth();
if (__DEV__) connectAuthEmulator(auth, 'http://192.168.1.28:9099');

export { app, auth };
// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase
