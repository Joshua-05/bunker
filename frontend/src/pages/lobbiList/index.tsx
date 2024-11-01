import { useLayoutEffect } from "react"
import { Footer, Header } from "../../components/wrap/wrap"
import { useLobbiStore } from "../../store"
import { instance } from "../../utils/axios"
import style from "./style.module.css"
import { Link } from "react-router-dom"
import LobbiCard  from "../../components/lobbiCard"
import { ILobbi } from "../../common/types/lobbi"

const LobbiListPage = () => {
    const addLobbi = useLobbiStore(state => state.addLobbi);
    const lobbiStore = useLobbiStore(state => state.lobbiStore);
    const reset = useLobbiStore(state => state.resetLobbi)
    useLayoutEffect(() => {
        const fetchLobbi = async () => {
            reset();
            const response = await instance.get("lobbis/getAll");
            const lobbi: ILobbi[] = response.data; 
            addLobbi(lobbi);
        };
        fetchLobbi();
    }, [reset, addLobbi]);
    

    return(
        <>
            <Header />
            <main>
                <div className={style.box}>
                    <h1>Список лобби</h1><Link to = '/lobbi-create'><button>Create lobbi</button><br /></Link>
                    <div className={style.lobbiList}>
                        {lobbiStore.length > 0 ? 
                            lobbiStore.map(item => <LobbiCard lobbi = {item} key={item.id}/>)
                        : (
                            <p>Лобби не найдены</p>
                        )}
                    </div>
                </div>
            </main>
            <Footer />
        </>
    )
}

export default LobbiListPage