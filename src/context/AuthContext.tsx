import {
    ReactNode,
    createContext,
    useContext,
    useEffect,
    useState
} from "react";
import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
} from "firebase/auth";
import { auth, db } from "@/config/firebaseConfig"
import { collection, addDoc, setDoc, doc } from "firebase/firestore";
import { setStorageItemAsync, useStorageState } from "@/utils/useStorageState";
import { createUser } from "@/services/UserService";

type Tuser = {
    token: string | null,
    authenticated: boolean | null
}

interface Tcontext {
    onSignIn: (email: string, password: string) => Promise<boolean>;
    onRegister: (
        email: string,
        password: string,
        name: string,
        phoneNumber: string
    ) => Promise<boolean>;
    onSignOut: () => Promise<boolean>;
    authState: Tuser;
}

type BasePageProps = {
    children: ReactNode;
}

const TOKEN = "token";

const AuthContext = createContext<Tcontext>({
    onSignIn: async () => false,
    onRegister: async () => false,
    onSignOut: async () => false,
    authState: { authenticated: false, token: null }
});


export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }: BasePageProps) {
    const [authState, setAuthState] = useState<Tuser>({
        authenticated: false,
        token: null
    });

    useEffect(() => {
        const unsubscribe = () => {
            useStorageState(TOKEN).then(token => {
                if (token) {
                    setAuthState({
                        authenticated: true,
                        token: token
                    });
                }
            }).catch(error => {
                console.log(error)
            });
        }
        return () => unsubscribe();
    }, [])

    const handleSignIn = async (email: string, password: string): Promise<boolean> => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const token = await userCredential.user.getIdToken();

            setStorageItemAsync(TOKEN, token)
            setAuthState({ authenticated: true, token: token });

            return true
        } catch (error: any) {
            const errorCode = error.code;
            const errorMessage = error.message;
            // TODO: error handling and preview Error for user
            console.error({ errorCode, errorMessage })
            return false
        }
    }

    const handleRegister = async (
        email: string,
        password: string,
        name: string,
        phoneNumber: string
    ): Promise<boolean> => {

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);

            await createUser({
                name: name,
                email: email,
                phoneNumber: phoneNumber,
            }, userCredential.user.uid)

            const token = await userCredential.user.getIdToken();

            setStorageItemAsync(TOKEN, token)
            setAuthState({ authenticated: true, token: token });

            return true
        } catch (error: any) {
            console.error("ERROR <handleRegister>: ", error.stack);
            const errorCode = error.code;
            const errorMessage = error.message;
            // TODO: error handling and preview Error for user
            console.error({ errorCode, errorMessage })
            return false
        }

    }

    const handleSignOut = async (): Promise<boolean> => {
        try {
            setAuthState({ authenticated: false, token: null });
            setStorageItemAsync(TOKEN, null)
            return true;
        } catch (error: any) {
            const errorCode = error.code;
            const errorMessage = error.message;
            // TODO: error handling and preview Error for user
            console.error({ errorCode, errorMessage })
            return false;
        }
    }

    const value: Tcontext = {
        authState: authState,
        onRegister: handleRegister,
        onSignIn: handleSignIn,
        onSignOut: handleSignOut,
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}
