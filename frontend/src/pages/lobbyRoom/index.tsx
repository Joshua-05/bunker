import { useNavigate, useParams } from "react-router-dom"
import { instance } from "../../utils/axios";
import { useEffect, useState } from "react";
import { ILobbi } from "../../common/types/lobbi";
import Chat from "../../components/chat";
import { useUserStore } from "../../store";


const LobbyRoomPage = () => {
    const {lobbyId} = useParams();
    // console.log(lobbyId);
    const nav = useNavigate()
    const user = useUserStore(state => state.userStore)
    if (!user || !user.id){
        throw new Error ('Пользователь не авторизован')
    }
    const [ lobbi, setLobbi] = useState<ILobbi | null>(null)
    const [ userInLobby, setUserInLobby] = useState<ILobbi | null>(null)
    
    const ClickExit = async() => {
        await instance.put(`lobbis/lobbiCurrent/${lobbyId}`, {
            action: 'descrement',
            userId: user.id
        }),
        nav(`/lobby`)
    }

    const ClickEnter = async() => {
        nav(`/game`)
    }

    useEffect(() => {
        const fetch = async () => {
            try {
                const res = await instance.get(`lobbis/getOne/${lobbyId}`)
                setLobbi(res.data)
                await instance.put(`lobbis/lobbiCurrent/${lobbyId}`, {
                    action: 'increment',
                    userId: user.id
                })
                // const resUser = await instance.get(`lobbis/getUserLobbi/${lobbyId}`)
                // setUserInLobby(resUser.data)
            } catch (error) {
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
                        <h1>{lobbi.name}</h1>
                        <div>{userInLobby ? <p>userInLobby</p> : <p>Нет подключенных</p>}</div>
                        <button onClick={ClickExit}>Выход</button>
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