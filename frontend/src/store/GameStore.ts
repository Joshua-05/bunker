import { create } from "zustand";


export const useGameStore = create<>((set, get) => ({
    gameStore: [],
    addGame: () => {
        const {gameStore} = get();
    },
    resetGame: () => 
        set({ gameStore: [] }),
}));