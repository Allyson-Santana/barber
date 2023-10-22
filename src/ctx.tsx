import React from "react";
import { useStorageState } from "@/useStorageState";

type Tcontext = { signIn: () => void; signOut: () => void; session?: string | null, isLoading: boolean } | null

const AuthContext = React.createContext<Tcontext>(null);

// This hook can be used to access the user info.
export function useSession(): any {
    const value = React.useContext(AuthContext);
    if (process.env.NODE_ENV !== 'production') {
        if (!value) {
            throw new Error('useSession must be wrapped in a <SessionProvider />');
        }
    }

    return value;
}

export function SessionProvider(props: any) {
    const [[isLoading, session], setSession] = useStorageState('session');

    return (
        <AuthContext.Provider
            value={{
                signIn: () => {
                    // Perform sign-in logic here
                    setSession('xxx');
                },
                signOut: () => {
                    setSession(null);
                },
                session,
                isLoading,
            }}>
            {props.children}
        </AuthContext.Provider>
    );
}
