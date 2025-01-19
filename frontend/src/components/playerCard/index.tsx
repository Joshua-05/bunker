import { IUser } from "../../common/types/auth";
import style from "./style.module.css";
import { ICards } from "../../common/types/cards";

interface PlayerCardProps {
    player: IUser;
    cards: ICards[];
}

const PlayerCard = ({ player, cards }: PlayerCardProps) => {
    const sexCard = cards.find(card => card.type === 'Пол');
    const ageCard = cards.find(card => card.type === 'Возраст');
    const professionCard = cards.find(card => card.type === 'Профессия');
    const healthCard = cards.find(card => card.type === 'Здоровья');
    const hobbyCard = cards.find(card => card.type === 'Хобби');
    const phobiaCard = cards.find(card => card.type === 'Фобия');
    const luggageCard = cards.find(card => card.type === 'Багаж');
    const factCards = cards.filter(card => card.type === 'Факт');

    return (
        <div className={style.card}>
            <div className={style.card_bio}>
                <span className={style.username}>{player.username}</span>
                <span className={style.sex}>{sexCard ? sexCard.name : 'Пол'}</span>
                <span className={style.age}>{ageCard ? ageCard.name : 'Возраст'}</span>
            </div>
            <div className={style.card_info}>
                <div className={style.card_infoLeft}>
                    <span>{professionCard ? professionCard.name : 'Нет профессии'}</span>
                    <span>{healthCard ? healthCard.name : 'Нет данных о здоровье'}</span>
                    <span>{hobbyCard ? hobbyCard.name : 'Нет хобби'}</span>
                    <span>{phobiaCard ? phobiaCard.name : 'Нет фобии'}</span>
                </div>
                <div className={style.card_infoRight}>
                    <span>{luggageCard ? luggageCard.name : 'Нет багажа'}</span>
                    {factCards.length > 0 ? (
                        factCards.map((fact, index) => (
                            <span key={index}>{fact.name}</span>
                        ))
                    ) : (
                        <span>Нет фактов</span>
                    )}
                </div>
            </div>
        </div>
    );
}

export default PlayerCard;