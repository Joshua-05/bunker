import { Link } from "react-router-dom"
import style from "./style.module.css"

const CardsPage = () => {
    return(
        <>
            <main>
                <div className={style.box}>
                    <h1>Список карт</h1><Link to = '/cards-create'><button>Создание карт</button><br /></Link>
                    <div className={style.cardList}>
                        <p>sdfg;dgfdgfd</p>
                        <p>sdfg;dgfdgfd</p>
                        <p>sdfg;dgfdgfd</p>
                        <p>sdfg;dgfdgfd</p>
                    </div>
                </div>
            </main>
        </>
    )
}

export default CardsPage