import { Footer, Header } from "../../components/wrap/wrap"
import style from "./style.module.css"

export default function RulesPage() {
    return(
        <>
            <Header />
            <div className={style.main}>
                <div className={style.card}>1
                    <ol>
                        <li className={style.noready}>Запретить\инвиз урл</li>
                        <li className={style.noready}>Создать таблицу многие-ко-многим для пользователей в лобби</li>
                        <li className={style.ready}>Подписка на сокет-сервер\изоляция чата</li>
                        <li className={style.ready}>При подключении и отключении с лобби менять запись в таблице Lobbi</li>
                        <li className={style.noready}>Повесить автозапрос на список лобби</li>
                        <li className={style.noready}>В лобби отображать подключенных к нему</li>
                    </ol>
                </div>
                <div className={style.card}>2</div>
                <div className={style.card}>3</div>
            </div>
            <Footer />
        </>
    )
}