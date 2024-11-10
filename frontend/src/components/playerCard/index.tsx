import style from "./style.module.css"

const PlayerCard = () => {
    return(
        <div className={style.card}>
            <div className={style.card_bio}>
                <span>Nickname</span><br />
                <span>M   24</span>
            </div>
            <div className={style.card_info}>
                <div className={style.card_infoLeft}>
                    <span>Профессия</span><br />
                    <span>Здоровье</span><br />
                    <span>Хобби</span><br />
                    <span>Фобия</span>
                </div>
                <div className={style.card_infoRight}>
                    <span>Багаж</span><br />
                    <span>Факт 1</span><br />
                    <span>Факт 2</span>
                </div>
            </div>
        </div>
    )
}

export default PlayerCard