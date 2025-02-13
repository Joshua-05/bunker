import style from "./style.module.css"

const MenuPage = () => {

    return(
        <>
            <div className={style.description}>
                <p>"Бункер" – дискуссионная игра о выживании
                     после апокалипсиса. На Земле грядёт глобальная катастрофа.
                      Вам повезло, вы оказались перед входом в спасательный бункер,
                       в котором можно пережить самый опасный период. Но попасть в бункер
                        смогут не все – а лишь половина из вас! За несколько раундов игроки решают,
                         кого НЕ берут в бункер. Попавшие в бункер – выживут, чтобы затем возродить цивилизацию.
                          Игроки получают несколько случайных карт характеристик: пол и возраст, профессия, здоровье, 
                          хобби и др. Постепенно вы раскрываете свои карты, знакомитесь друг с другом и принимаете решения,
                           кто и насколько будет полезен для выживания и восстановления жизни после выхода из бункера. </p>
            </div>
        </>
    )
}

export default MenuPage