import { ILobbi } from "../../common/types/lobbi"
import style from "./style.module.css"

interface ILobbiProps{
    lobbi: ILobbi
}

export default function LobbiCard({lobbi}: ILobbiProps) {
    return (
        <div className={style.card}>
            <p>{lobbi.name}</p>
            <p>4/{lobbi.count}</p>
            <span>{lobbi.access}</span>
            <button>Enter</button>
        </div>
    )
}