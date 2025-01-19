import { ICards } from "../../common/types/cards"
import CardCharacteristic from "../cardCharacteristic";
import style from "./myCardWidget.module.css"

interface IPropsWidget {
    cards: ICards[]
}

const MyCardWidget = ({cards}: IPropsWidget) => {
    console.log('fuck', cards);
    
    return(
        <div className={style.widget}>
            {cards.map(item => <CardCharacteristic card={item} key={item.id}/>)}
        </div>
    )
}

export default MyCardWidget