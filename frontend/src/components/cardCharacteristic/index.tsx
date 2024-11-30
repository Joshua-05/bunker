import { ICards } from "../../common/types/cards"
import style from "./style.module.css"

interface CardCharacteristicProps {
    card: ICards
}

const CardCharacteristic = ({card}: CardCharacteristicProps) => {
    return (
        <div className={style.card}>
            <p>{card.type}</p>
            <p>{card.name}</p>
            <p>{card.descripton}</p>
        </div>
    )
}

export default CardCharacteristic