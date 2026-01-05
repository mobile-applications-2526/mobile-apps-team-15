import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Material } from "@/types";


interface CartMaterial extends Readonly<Omit<Material, 'imageUrl'>> {
    duration: number;
    durationType: 'hour' | 'day';
}

interface CartState {
    materials: CartMaterial[];
    addItem: (material: CartMaterial) => void;
    removeItem: (id: string) => void;
    clearCart: () => void;
    getTotalPrice: () => number;
}

export const useCartStore = create<CartState>()(
    persist(
        (set, get) => ({
            materials: [],

            addItem: (newItem) => {
                const { materials } = get();
                const existingItem = materials.find((item) => item.id === newItem.id);

                if (!existingItem) {
                    set({ materials: [...materials, { ...newItem }] });
                }
            },

            removeItem: (id) => {
                set({
                    materials: get().materials.filter((item) => item.id === id)
                });
            },

            clearCart: () => set({ materials: [] }),

            getTotalPrice: () => {
                return get().materials.reduce(
                    (total, item) => total + (
                        item.durationType === "hour"
                            ? item.pricePerHour
                            : item.pricePerDay
                    ) * item.duration, 0);
            },
        }),

        {
            name: 'shopping-cart-storage',
            storage: createJSONStorage(() => AsyncStorage),
        }
    )
);
