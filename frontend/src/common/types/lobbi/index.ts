export interface LobbiStore {
    lobbiStore: ILobbi[],
    addLobbi: (lobbi: ILobbi[]) => void
    resetLobbi: () => void
}

export interface ILobbi {
    id: number,
    name: string,
    count: number,
    access: string,
    password?: string,
    createdAt: string,
    updatedAt: string
}