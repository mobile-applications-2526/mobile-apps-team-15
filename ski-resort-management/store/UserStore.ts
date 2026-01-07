import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from "@constants/types";

interface UserState {
    user: User | null;
    setUser (user: User): void;
    removeUser (): void;
}

export const useUserStore = create<UserState>()(
    persist(
        (set) => ({
            user: null,

            setUser: (user) => set({
                user
            }),

            removeUser: () => set({
                user: null
            })
        }),
        {
            name: 'user-auth-storage',
            storage: createJSONStorage(() => AsyncStorage),
        }
    )
);
