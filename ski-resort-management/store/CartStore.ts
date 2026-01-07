import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DurationType, Material } from "@constants/types";


export interface CartMaterial extends Readonly<Omit<Material, 'imageUrl'>> {
    total: number;
}

interface CartState {
    materials: CartMaterial[];
    duration: number;
    durationType: DurationType;
    addMaterial: (material: CartMaterial) => void;
    setDuration: (duration: number) => void;
    setDurationType: (durationType: DurationType) => void;
    removeMaterial: (id: string) => void;
    clearCart: () => void;
    getTotalPrice: () => number;
}

export const useCartStore = create<CartState>()(
    persist(
        (set, get) => ({
            materials: [],
            duration: 1,
            durationType: "days",

            addMaterial: (newMaterial) => {
                const { materials } = get();
                const existingItem = materials.find((material) => material.id === newMaterial.id);

                if (!existingItem) {
                    set({ materials: [...materials, { ...newMaterial }] });
                }
            },

            updateMaterial: (updatedMaterial) => {
                set({ materials: get().materials.map((material) => material.id === updatedMaterial.id ? updatedMaterial : material) });
            },

            setDuration: (duration) => {
                set({
                    materials: get().materials.map((material) => ({
                        ...material, duration, total: (get().durationType === "hours" ? material.pricePerHour : material.pricePerDay) * duration
                    })),
                    duration
                });
            },

            setDurationType: (durationType) => {
                set({
                    materials: get().materials.map((material) => ({
                        ...material, durationType, total: (durationType === "hours" ? material.pricePerHour : material.pricePerDay) * get().duration
                    })),
                    durationType
                });
            },

            removeMaterial: (id) => {
                set({
                    materials: get().materials.filter((material) => material.id === id)
                });
            },

            clearCart: () => set({ materials: [], duration: 1, durationType: "days" }),

            getTotalPrice: () => {
                return get().materials.reduce(
                    (total, item) => total + item.total, 0);
            },
        }),
        {
            name: 'shopping-cart-storage',
            storage: createJSONStorage(() => AsyncStorage),
        }
    )
);
