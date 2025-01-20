import { create } from "zustand";
import { IGameStore, IOpenCards, ITurnToWalk } from "../common/types/game/game";
import { persist } from "zustand/middleware";


export const useGameStore = create<IGameStore>()(persist((set, get) => ({
    openCards : [],
    expelledPlayer : [],
    turnToWalk: {userId: 0, username: ""},
    showCard: (card: IOpenCards) => {
        const { openCards } = get();
        const updatedCards = openCards.map(item => {
            if (item.userId === card.userId) {
                return {
                    ...item,
                    cards: [...item.cards, ...card.cards],
                };
            }
            return item; 
        });
    
        const userExists = openCards.some(item => item.userId === card.userId);
    
        if (!userExists) {
            updatedCards.push(card);
        }
        set({ openCards: updatedCards });
    },
    expelled: (userId: number) => {
        const { expelledPlayer } = get();
        
        if (!expelledPlayer.includes(userId)) {
            set({ expelledPlayer: [...expelledPlayer, userId] });
        }
    },
    turrned: (user: ITurnToWalk) => {
        set({ turnToWalk: user });
    },
    reset: () => {
        set({
            openCards : [],
            expelledPlayer : [],
            turnToWalk: {userId: 0, username: ""},
        })
    }
}),{
        name: 'GameStore', 
        version: 1
}));