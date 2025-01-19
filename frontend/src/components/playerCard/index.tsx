import { useState } from "react"
import { IUser } from "../../common/types/auth"
import style from "./style.module.css"

interface PlayerCardProps {
    player: IUser
}

const PlayerCard = ({player}: PlayerCardProps) => {
    const [prof, setProf] = useState('Профессия')

    const pok = () => {
        setProf(player.email)
    }
    return(
        <div className={style.card}>
            <div className={style.card_bio}>
                <span>{player.username}</span><br />
                <span>M 24</span>
            </div>
            <div className={style.card_info}>
                <div className={style.card_infoLeft}>
                    <span onClick={pok}>{prof}</span><br />
                    <span>Здоровье</span><br />
                    <span>Хобби</span><br />
                    <span>Фобия</span>
                </div>
                <div className={style.card_infoRight}>
                    <span>Багаж</span><br />
                    <span>Факт 1</span><br />
                    <span>Факт 2</span>
                </div>
            </div>
        </div>
    )
}

export default PlayerCard