import { useNavigate, useParams } from "react-router-dom"
import PlayerCard from "../../components/playerCard"
import style from "./style.module.css"
import { useEffect, useLayoutEffect, useState } from "react"
import { instance } from "../../api/baseUrl"
import { IUser } from "../../common/types/auth"
import GameChat from "../../components/gameChat/gameChat"
import MyCardWidget from "../../components/myCardWidget/myCardWidget"
import VoteWidget from "../../components/voteWidget/voteWidget"
import { ILobbi } from "../../common/types/lobbi"


const GamePage = () => {
    const {lobbyId} = useParams()
    const nav = useNavigate()
    const [ userInLobby, setUserInLobby] = useState<IUser[]>([])
    const [ lobbi, setLobbi] = useState<ILobbi | null>(null)

    const [openMyCard, setOpenMyCard] = useState<boolean>(false) //Виджет чтоб посмотреть карты на руке
    const [openVote, setOpenVote] = useState<boolean>(false) //Виджет чтоб открыть голосование

    const [turnToWalk, setTurnToWalk] = useState<string>('blya')
    
    const Exit = () => {
        nav('/lobby')
    }

    const fetchLobbiData = async () => {
        const resUser = await instance.get(`room/getUserLobbi/${lobbyId}`)
        const res = await instance.get(`lobbis/getOne/${lobbyId}`)
        setUserInLobby(resUser.data)
        setLobbi(res.data)
    }

    useLayoutEffect(()=>{
        fetchLobbiData()
    },[])

    // useEffect(()=>{
    //     fetchLobbiData()
    // },[])

    return(
        <>
        <div className={style.head}>
            <div className={style.head_history}>
                Жоская предыстория апокалипсиса. По типу открытия другого
                измерения, ядерная война, восстание зомби и тд
            </div>
            <div className={style.head_logo}>
                Ход игрока {turnToWalk} <br />
                0:30 <br />
                <button onClick={Exit}>Сдаться</button> <br />
                {lobbi?.count}
            </div>
            <div className={style.head_info}> В бункере есть кухня и запас еды на 1.5 года. Арсенал с оружием. Медпункт но с запертой дверью. Пособия по земледелию</div>
            <div className={style.head_content}> 
            Продолжительность 3 года. Бункер 400 м^2. Тут места на 5 человек
            </div>
            
        </div>
        <div className={style.table}>
            <div className={style.cardList}>
                {userInLobby? userInLobby.map(item => <PlayerCard player={item} key={item.id}/>): <p>нет игроков</p>}
                {userInLobby? userInLobby.map(item => <PlayerCard player={item} key={item.id}/>): <p>нет игроков</p>}
                {userInLobby? userInLobby.map(item => <PlayerCard player={item} key={item.id}/>): <p>нет игроков</p>}
                {userInLobby? userInLobby.map(item => <PlayerCard player={item} key={item.id}/>): <p>нет игроков</p>}
                {userInLobby? userInLobby.map(item => <PlayerCard player={item} key={item.id}/>): <p>нет игроков</p>}
                {userInLobby? userInLobby.map(item => <PlayerCard player={item} key={item.id}/>): <p>нет игроков</p>}
                {userInLobby? userInLobby.map(item => <PlayerCard player={item} key={item.id}/>): <p>нет игроков</p>}
                {userInLobby? userInLobby.map(item => <PlayerCard player={item} key={item.id}/>): <p>нет игроков</p>}
                {userInLobby? userInLobby.map(item => <PlayerCard player={item} key={item.id}/>): <p>нет игроков</p>}
                {userInLobby? userInLobby.map(item => <PlayerCard player={item} key={item.id}/>): <p>нет игроков</p>}
                {userInLobby? userInLobby.map(item => <PlayerCard player={item} key={item.id}/>): <p>нет игроков</p>}
                {userInLobby? userInLobby.map(item => <PlayerCard player={item} key={item.id}/>): <p>нет игроков</p>}
            </div>
            <div className={style.activeZona}>
                <div className={style.myCard}><button onClick={() => setOpenMyCard(!openMyCard)}>My cards</button></div>
                <div className={style.buttons}>
                    <button onClick={() => setOpenVote(!openVote)}>Голосовать</button>
                    <button>Журнал?</button>
                    <button onClick={() => {setTurnToWalk('Другой')}}>Потвердить</button>
                </div>
                <div className={style.chat}><GameChat lobbyId={lobbyId} count={userInLobby.length}/></div> 
            </div>
        </div>
        {openMyCard === true && <MyCardWidget/>}
        {openVote === true && <VoteWidget users={userInLobby}/>}
        </>
    )
}

export default GamePage