
// import { Tabs, Redirect, Stack } from "expo-router";
// import {
//     MaterialIcons,
//     FontAwesome,
//     AntDesign
// } from '@expo/vector-icons';
// import { Text, } from 'react-native';

// import { auth } from "@/config/firebaseConfig";
// import { onAuthStateChanged } from "firebase/auth";
// import { useEffect } from "react";


// export default function AppLayout() {

//     useEffect(() => {
//         const subscriber = onAuthStateChanged(auth, (user) => {
//             if (user) {
//                 // User is signed in, see docs for a list of available properties
//                 // https://firebase.google.com/docs/reference/js/auth.user
//                 const uid = user.uid;
//                 // ...
//                 console.log(user) 
//             } else {
//                 // User is signed out
//                 // ...
//             }
//         });

//         return subscriber;
//     },[])

//     return <Stack />

// }

import { Slot } from 'expo-router';
import { AuthProvider } from '@/context/AuthContext';

export default function Root() {
    // Set up the auth context and render our layout inside of it.
    return (
        <AuthProvider>
            <Slot />
        </AuthProvider>
    );
}

