import PlayerCard from "../../components/playerCard"
import style from "./style.module.css"

const GamePage = () => {
    return(
        <>
        <div className={style.head}>
            <div className={style.head_history}>
                Жоская предыстория апокалипсиса. По типу открытия другого
                измерения, ядерная война, восстание зомби и тд
            </div>
            <div className={style.head_logo}> Продолжительность 3 года. Бункер 400 м^2. Тут места на 5 человек</div>
            <div className={style.head_info}> В бункере есть кухня и запас еды на 1.5 года. Арсенал с оружием. Медпункт но с запертой дверью. Пособия по земледелию</div>
            <div className={style.head_content}> 
                ХЗ. мэйби кнопки
            </div>
            
        </div>
        <div className={style.cardList}>
            <PlayerCard />
            <PlayerCard />
            <PlayerCard />
            <PlayerCard />
            <PlayerCard />
            <PlayerCard />
            <PlayerCard />
            <PlayerCard />
            <PlayerCard />
            <PlayerCard />
            <PlayerCard />
            <PlayerCard />
        </div>
            
        </>
    )
}

export default GamePage