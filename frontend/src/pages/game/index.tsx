import { useNavigate, useParams } from "react-router-dom"
import { instance } from "../../utils/axios";
import { useEffect, useState } from "react";
import { ILobbi } from "../../common/types/lobbi";
import Chat from "../../components/chat";


const GamePage = () => {
    const {lobbyId} = useParams();
    // console.log(lobbyId);
    const nav = useNavigate()
    
    const [ lobbi, setLobbi] = useState<ILobbi | null>(null)
    
    const Click = async() => {
        await instance.put(`lobbis/lobbiCurrent/${lobbyId}`, {action: 'descrement'}),
        nav(`/lobbi`)
    }

    useEffect(() => {
        const fetch = async () => {
            try {
                const res = await instance.get(`lobbis/getOne/${lobbyId}`)
                // console.log("Результат возврата: ",res);
                
                setLobbi(res.data)
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