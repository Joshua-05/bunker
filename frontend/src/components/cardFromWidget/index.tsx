import { useState } from "react";
import { ICards } from "../../common/types/cards";
import style from "./style.module.css";

interface CardCharacteristicProps {
    card: ICards;
}

const CardFromWidget = ({ card }: CardCharacteristicProps) => {
    const [hovered, setHovered] = useState(false);

    return (
        <div 
            className={style.card} 
            onMouseEnter={() => setHovered(true)} 
            onMouseLeave={() => setHovered(false)}
        >
            <p>{card.type}</p>
            <p>{card.name}</p>
            {hovered && (
                <div className={style.tooltip}>
                    {card.descripton}
                </div>
            )}
        </div>
    );
};

export default CardFromWidget;