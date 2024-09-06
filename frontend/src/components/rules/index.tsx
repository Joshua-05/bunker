import { Footer, Header } from "../wrap/wrap"
import style from "./style.module.css"

export default function RulesPage() {
    return(
        <>
            <Header />
            <div className={style.main}>
                <div className={style.card}>1</div>
                <div className={style.card}>2</div>
                <div className={style.card}>3</div>
            </div>
            <Footer />
        </>
    )
}