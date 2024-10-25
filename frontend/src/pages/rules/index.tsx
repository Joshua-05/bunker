import { Footer, Header } from "../../components/wrap/wrap"
import style from "./style.module.css"

export default function RulesPage() {
    return(
        <>
            <Header />
            <div className={style.main}>
                <div className={style.card}>1
                    <ul>
                        <li>Запретить\инвиз урл</li>
                        <li>Создать таблицу многие-ко-многим для пользователей в лобби</li>
                        <li>Подписка на сокет-сервер\изоляция чата</li>
                        <li>При подключении и отключении с лобби менять запись в таблице Lobbi</li>
                    </ul>
                </div>
                <div className={style.card}>2</div>
                <div className={style.card}>3</div>
            </div>
            <Footer />
        </>
    )
}