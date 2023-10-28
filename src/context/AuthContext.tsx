import {
    ReactNode,
    createContext,
    useContext,
    useEffect,
    useState
} from "react";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/config/firebaseConfig"
import { setStorageItemAsync, useStorageState } from "@/utils/useStorageState";

type Tuser = {
    token: string | null,
    authenticated: boolean | null
}

interface Tcontext  {
    onSignIn: (email: string, password: string) => Promise<any>;
    onRegister: (email: string, password: string) => Promise<any>;
    onSignOut: () => Promise<any>;
    authState: Tuser;
}

type BasePageProps = {
    children: ReactNode;
}

const TOKEN = "token";

const AuthContext = createContext<Tcontext>({
    onSignIn: async () => {},
    onRegister: async () => {}, 
    onSignOut: async () => {}, 
    authState: { authenticated: false, token: null }
});


export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }: BasePageProps) {
    const [authState, setAuthState] = useState<Tuser>({
        authenticated: false,
        token: null
    });
    
    useEffect(() => {
        const token = useStorageState(TOKEN);
        if (token) {
            setAuthState({
                authenticated: true,
                token: token
            });
        }
    }, [])

    const handleSignIn = async (email: string, password: string) => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user
            const token = await user.getIdToken();
            
            setStorageItemAsync(TOKEN, token)
            setAuthState({authenticated: true, token: token});

            return true
        } catch (error: any) {
            console.error("ERROR <handleSignIn>: ", error.stack)
            const errorCode = error.code;
            const errorMessage = error.message;
            // TODO: error handling and preview Error for user
            console.error({ errorCode, errorMessage })
            return false
        }
    }

    const handleRegister = async (email: string, password: string) => {
        try {
            console.log("Call >>> handleRegister")
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            console.log(userCredential);
        } catch (error: any) {
            console.error("ERROR <handleRegister>: ", error.stack);
            const errorCode = error.code;
            const errorMessage = error.message;
            // TODO: error handling and preview Error for user
            console.error({ errorCode, errorMessage })
        }
        
    }

    const handleSignOut = async () => {
        try {
            setAuthState({
                authenticated: false,
                token: null
            })
            setStorageItemAsync(TOKEN, null)
        } catch (error: any) {
            console.error("ERROR <handleSignOut>: ", error.stack)
            
            const errorCode = error.code;
            const errorMessage = error.message;
            // TODO: error handling and preview Error for user
            console.error({ errorCode, errorMessage })
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
