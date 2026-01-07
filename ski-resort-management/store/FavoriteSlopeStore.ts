import { create } from 'zustand';
import { Slope } from "@constants/types";


interface FavoriteSlopeState {
    favoriteSlope: Slope | null;
    setFavoriteSlope: (slope: Slope) => void;
    clearFavoriteSlope: () => void;
}

export const useFavoriteSlopeStore = create<FavoriteSlopeState>((set) => ({
    favoriteSlope: null,

    setFavoriteSlope: (slope) => set({ favoriteSlope: slope }),

    clearFavoriteSlope: () => set({ favoriteSlope: null }),
}));
