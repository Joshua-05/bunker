import { useEffect, useLayoutEffect } from "react"
import { useLobbiStore } from "../../store"
import { instance } from "../../utils/axios"
import style from "./style.module.css"
import { Link } from "react-router-dom"
import LobbiCard  from "../../components/lobbiCard"
import { ILobbi } from "../../common/types/lobbi"
import socket from "../../utils/socket";


const LobbiListPage = () => {
    const addLobbi = useLobbiStore(state => state.addLobbi);
    const lobbiStore = useLobbiStore(state => state.lobbiStore);
    const reset = useLobbiStore(state => state.resetLobbi);
    const update = useLobbiStore(state => state.updateLobbi);
    const deleteLobby = useLobbiStore(state => state.deleteLobbi)

    const fetchLobbi = async () => {
        reset();
        const response = await instance.get("lobbis/getAll");
        const lobbi: ILobbi[] = response.data; 
        addLobbi(lobbi);
    };  

    useLayoutEffect(() => {
        
        fetchLobbi();
    }, []);

    useEffect(() => {
        // Подписываемся на обновления о новых лобби
        socket.on('lobbyCreated', (lobbi: ILobbi[]) => {
            addLobbi(lobbi); // Добавляем новое лобби в список
        });

        socket.on('lobbyUpdated', (lobbi: ILobbi) => {
            update(lobbi); //обновляем одно конкретное лобби
            // fetchLobbi(); //временное решение просто все пересчитать(дописать метод update в лобби сторе)
        });

        socket.on('lobbyDeleted', (lobbyId: number) => { //обдумать обходимость параметра
            deleteLobby(lobbyId)
            // reset(); // Сбрасываем список лобби, если необходимо 
            // fetchLobbi(); // Или просто перерасчитываем его заново.
        });

        return () => {
            socket.off('lobbyCreated');
            socket.off('lobbyUpdated');
            socket.off('lobbyDeleted');
        };        
    }, [reset, addLobbi, update, deleteLobby]);
    console.log(lobbiStore);
    

    return(
        <>
            <main>
                <div className={style.box}>
                    <h1>Список лобби</h1><Link to = '/lobby-create'><button>Create lobbi</button><br /></Link>
                    <div className={style.lobbiList}>
                        {lobbiStore.length > 0 ? 
                            lobbiStore.map(item => <LobbiCard lobbi = {item} key={item.id}/>)
                        : (
                            <p>Лобби не найдены</p>
                        )}
                    </div>
                </div>
            </main>
        </>
    )
}

export default LobbiListPage