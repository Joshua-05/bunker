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
        set({
            lobbiStore: [...lobbiStore,...lobbi]
        })
    }
}))