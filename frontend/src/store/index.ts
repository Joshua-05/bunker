import { create } from "zustand";
import {IUser, UserStore } from "../common/types/auth";
import { ILobbi, LobbiStore } from "../common/types/lobbi";

export const useUserStore = create<UserStore>((set) => ({
    userStore: null,
    isLogged: false,
    addUser: (user: IUser) => {
        set({
            userStore: user,
            isLogged: true
        })
    }
}))

export const useLobbiStore = create<LobbiStore>((set, get) => ({
    lobbiStore: [],
    addLobbi: (lobbi: ILobbi[]) => {
        const {lobbiStore} = get();
        
        const existingIds = new Set(lobbiStore.map(item => item.id));

        const uniqueLobbi = lobbi.filter(item => !existingIds.has(item.id));

        set({
            lobbiStore: [...lobbiStore, ...uniqueLobbi]
        })
    },
    resetLobbi: () => 
        set({ lobbiStore: [] }),
    findLobbi: (id: number) => {
        const { lobbiStore } = get();
        return lobbiStore.find(item => item.id == id)
    }
    
}));

// 