export interface ICardsIsOpen {
    type: string,
    name: string
}

export interface IOpenCards {
    userId: number,
    cards: ICardsIsOpen[]
}

export interface ITurnToWalk {
    userId: number,
    username: string
}

export interface IGameStore {
    openCards : IOpenCards[],
    expelledPlayer : number[],
    turnToWalk: ITurnToWalk,
    showCard: (card: IOpenCards) => void,
    expelled: (userId: number) => void,
    turrned: (user: ITurnToWalk) => void,
    reset: () => void
}