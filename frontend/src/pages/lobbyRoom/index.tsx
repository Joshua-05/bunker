import { useNavigate, useParams } from "react-router-dom"
import { instance } from "../../utils/axios";
import { useEffect, useState } from "react";
import { ILobbi } from "../../common/types/lobbi";
import Chat from "../../components/chat";
import { useUserStore } from "../../store";
import { IUser } from "../../common/types/auth";
import UserInLobbyCard from "../../components/userInLobbyCard";
import style from "./style.module.css"
// import socket from "../../utils/socket";

const LobbyRoomPage = () => {
    const {lobbyId} = useParams();
    // console.log(lobbyId);
    const nav = useNavigate()
    const user = useUserStore(state => state.userStore)
    if (!user || !user.id){
        throw new Error ('Пользователь не авторизован')
    }
    const [ lobbi, setLobbi] = useState<ILobbi | null>(null)
    const [ userInLobby, setUserInLobby] = useState<IUser[]>([]) //РАБОТАЮ С ЭТИМ ВОТ
    // const [popit, setPopit] = useState<number>()
    
    const ClickExit = async() => {
        await instance.put(`room/lobbiCurrent/${lobbyId}`, {
            action: 'descrement',
            userId: user.id
        }),
        nav(`/lobby`)
    }

    const ClickEnter = async() => {
        nav(`/game/${lobbyId}`)
    }

    useEffect(() => {
        const fetch = async () => {
            try {
                const res = await instance.get(`lobbis/getOne/${lobbyId}`)
                setLobbi(res.data)
                await instance.put(`room/lobbiCurrent/${lobbyId}`, {
                    action: 'increment',
                    userId: user.id
                })
                const resUser = await instance.get(`room/getUserLobbi/${lobbyId}`)
                // console.log('ВОТ ОНО ВОТ ЭТО', resUser);
                
                setUserInLobby(resUser.data)
                // socket.on('lobbyDeleted', (lobbyId: number) => { 
                //     deleteLobby(lobbyId)
                // });
                // socket.on('userJoined', (ki: number) => {
                //     setPopit(ki);    
                // })
                // return () => {
                //     socket.off('userJoined')
                // }
            } catch (error) {
                nav('/lobby')
                console.error("Ошибка получения лобби:", error)
            }
        }
        fetch()
    }, [lobbyId])
    
    return(
        <>
            <div>
                {lobbi ? (
                    <>
                        <div className={style.userList}>
                            <div className={style.userList_head}>
                                <button onClick={ClickEnter}>Start</button>
                                <div className={style.userList_head__name}>
                                    <h1>{lobbi.name}</h1>
                                    <span>{userInLobby.length} / {lobbi.count}</span>
                                </div>
                                <button onClick={ClickExit}>Выход</button>
                            </div>
                        
                        <div>
                            {userInLobby.length > 0 ? (
                                userInLobby.map(item => <UserInLobbyCard users = {item} key={item.id}/>)      
                            )
                            : 
                            (<p>Нет подключенных</p>)}
                        </div>
                        </div>
                        
                        <Chat lobbyId = {lobbyId}/>
                    </>
                ) : (
                    <p>Загрузка лобби...</p>
                ) }
            </div>
            
        </>
    )
}

export default LobbyRoomPage