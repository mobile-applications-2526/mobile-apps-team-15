import { createContext, useEffect, useState } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from "@/services/FirebaseConfig"

export const AuthContext = createContext<{user: User, loading: boolean} | null>(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState<User>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        return onAuthStateChanged(auth, (u) => {
            setUser(u);
            setLoading(false);
        });
    }, []);

    return (
        <AuthContext.Provider value={{ user, loading }}>
            {children}
        </AuthContext.Provider>
    );
}
