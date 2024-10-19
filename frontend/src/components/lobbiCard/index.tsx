
import { useNavigate } from "react-router-dom"
import { ILobbi } from "../../common/types/lobbi"
import style from "./style.module.css"
import ModalPassword from "../modalPassword/index.tsx"
import { useState } from "react"

interface ILobbiProps{
    lobbi: ILobbi
}

export default function LobbiCard({lobbi}: ILobbiProps) {
    const [flag, setFlag] = useState(false)
    const [pas, setPas] = useState('')

    const nav = useNavigate()
    const Clicked = () => {
        lobbi.password
        ? (setFlag(true), pas === lobbi.password && nav(`/game/${lobbi.id}`))
        : nav(`/game/${lobbi.id}`)
    }
    return (
        <>
            <div className={style.card}>
                <p>{lobbi.name}</p>
                <p>4/{lobbi.count}</p>
                <span>{lobbi.access}</span>
                <button onClick={Clicked}>Enter</button>
            </div>
            {flag === true && <ModalPassword setPas = {setPas} />}
        </>
    )
}