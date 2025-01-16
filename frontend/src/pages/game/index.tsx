import { useNavigate, useParams } from "react-router-dom"
import PlayerCard from "../../components/playerCard"
import style from "./style.module.css"
import { useEffect, useState } from "react"
import { instance } from "../../api/baseUrl"
import { IUser } from "../../common/types/auth"


const GamePage = () => {
    const {lobbyId} = useParams()
    const nav = useNavigate()
    const [ userInLobby, setUserInLobby] = useState<IUser[]>([])
    
    const Exit = () => {
        nav('/lobby')
    }

    const fetchLobbiData = async () => {
        const resUser = await instance.get(`room/getUserLobbi/${lobbyId}`)
        setUserInLobby(resUser.data)
    }

    useEffect(()=>{
        fetchLobbiData()
    },[])

    return(
        <>
        <div className={style.head}>
            <div className={style.head_history}>
                Жоская предыстория апокалипсиса. По типу открытия другого
                измерения, ядерная война, восстание зомби и тд
            </div>
            <div className={style.head_logo}> Ход игрока nickname 0:30 <button onClick={Exit}>Сдаться</button></div>
            <div className={style.head_info}> В бункере есть кухня и запас еды на 1.5 года. Арсенал с оружием. Медпункт но с запертой дверью. Пособия по земледелию</div>
            <div className={style.head_content}> 
            Продолжительность 3 года. Бункер 400 м^2. Тут места на 5 человек
            </div>
            
        </div>
        <div className={style.table}>
            <div className={style.cardList}>
                {userInLobby? userInLobby.map(item => <PlayerCard player={item} key={item.id}/>): <p>нет игроков</p>}
                {/* <PlayerCard />
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
                <PlayerCard /> */}
            </div>
            <div>
                <div>your card</div>
                <div> Chat and buttons</div>
                
            </div>
        </div>
        
            
        </>
    )
}

export default GamePage