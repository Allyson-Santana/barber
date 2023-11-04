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
import { auth} from "@/config/firebaseConfig"
import { setStorageItemAsync, useStorageState } from "@/utils/useStorageState";
import { createUser, findUserById } from "@/repositories/UserRepository";
import { Id, ClientModel } from "@/@types/models";

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
        phone: string
    ) => Promise<boolean>;
    onSignOut: () => Promise<boolean>;
    authState: Tuser;
}

type BasePageProps = {
    children: ReactNode;
}

export const storageKeys = {
    TOKEN: "token",
    USER: "user",
    IS_BARBER: "is_barber"
};

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
            useStorageState(storageKeys.TOKEN).then(token => {
                if (token) {
                    setAuthState({ authenticated: true, token: token });
                }
            }).catch(error => {
                console.error(error)
            });
        }
        return () => unsubscribe();
    }, [])

    const handleSignIn = async (email: string, password: string): Promise<boolean> => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const token = await userCredential.user.getIdToken();
            const userData = await findUserById(userCredential.user.uid);

            if (userData) {
                setStorageItemAsync(storageKeys.TOKEN, token);
                setStorageItemAsync(storageKeys.USER, JSON.stringify(userData));
                setAuthState({ authenticated: true, token: token });
            }

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
        phone: string
    ): Promise<boolean> => {

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);

            await createUser({
                name: name,
                email: email,
                phone: phone,
            }, userCredential.user.uid)

            const token = await userCredential.user.getIdToken();

            const userData: ClientModel & Id = {
                id: userCredential.user.uid,
                name,
                email,
                phone,
            }

            if (userData) {
                setStorageItemAsync(storageKeys.TOKEN, token);
                setStorageItemAsync(storageKeys.USER, JSON.stringify(userData));
                setAuthState({ authenticated: true, token: token });
            }

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
            setStorageItemAsync(storageKeys.TOKEN, null)
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
