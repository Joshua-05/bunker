import { Link } from "react-router-dom"
import style from "./style.module.css"
import { useEffect, useState } from "react"
import { instance } from "../../utils/axios"
import { ICards } from "../../common/types/cards"

const CardsPage = () => {
    const [cards, setCards] = useState<ICards[]>([])
    const fetchCardData = async() => {
        try {
            const response = await instance("cards/getAll")
            setCards(response.data)
        } catch (error) {
            
        }
    }

    useEffect(() => {
        fetchCardData()
    }, [])

    return(
        <>
            <main>
                <div className={style.box}>
                    <h1>Список карт</h1><Link to = '/cards-create'><button>Создание карт</button><br /></Link>
                    <div className={style.lobbiList}>
                        {cards?.length > 0 ? 
                            cards.map(item => <p key={item.id}>{item.name},{item.type}</p> )
                        : (
                            <p>Карт нет :/</p>
                        )}
                    </div>
                </div>
            </main>
        </>
    )
}

export default CardsPage