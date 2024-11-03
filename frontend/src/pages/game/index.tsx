import { useNavigate, useParams } from "react-router-dom"
import { instance } from "../../utils/axios";
import { useEffect, useState } from "react";
import { ILobbi } from "../../common/types/lobbi";
import Chat from "../../components/chat";
import { useUserStore } from "../../store";


const GamePage = () => {
    const {lobbyId} = useParams();
    // console.log(lobbyId);
    const nav = useNavigate()
    const user = useUserStore(state => state.userStore)
    if (!user || !user.id){
        throw new Error ('Пользователь не авторизован')
    }
    const [ lobbi, setLobbi] = useState<ILobbi | null>(null)
    
    const Click = async() => {
        await instance.put(`lobbis/lobbiCurrent/${lobbyId}`, {
            action: 'descrement',
            userId: user.id
        }),
        nav(`/lobbi`)
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
                        <button onClick={Click}>Выход</button>
                        <Chat lobbyId = {lobbyId}/>
                    </>
                ) : (
                    <p>Загрузка лобби...</p>
                ) }
            </div>
            
        </>
    )
}

export default GamePage