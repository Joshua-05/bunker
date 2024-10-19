import { useParams } from "react-router-dom"
import { instance } from "../../utils/axios";
import { useEffect, useState } from "react";
import { ILobbi } from "../../common/types/lobbi";
import Chat from "../../components/chat";


const GamePage = () => {
    const {lobbyId} = useParams();
    // console.log(lobbyId);
    
    const [ lobbi, setLobbi] = useState<ILobbi | null>(null)
    

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
                        <Chat />
                    </>
                ) : (
                    <p>Загрузка лобби...</p>
                ) }
            </div>
            
        </>
    )
}

export default GamePage