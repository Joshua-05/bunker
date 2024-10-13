
import { ILobbi } from "../../common/types/lobbi"
import style from "./style.module.css"

interface ILobbiProps{
    lobbi: ILobbi
}


export default function LobbiCard({lobbi}: ILobbiProps) {
    const Clicked = () => {
        
    }
    return (
        <div className={style.card}>
            <p>{lobbi.name}</p>
            <p>4/{lobbi.count}</p>
            <span>{lobbi.access}</span>
            <button onClick={Clicked}>Enter</button>
        </div>
    )
}