import { useNavigate, useParams } from "react-router-dom";
import PlayerCard from "../../components/playerCard";
import style from "./style.module.css";
import { useEffect, useState } from "react";
import { instance } from "../../api/baseUrl";
import { IUser } from "../../common/types/auth";
import GameChat from "../../components/gameChat/gameChat";
import MyCardWidget from "../../components/myCardWidget/myCardWidget";
import VoteWidget from "../../components/voteWidget/voteWidget";
import { ILobbi } from "../../common/types/lobbi";
import { useUserStore } from "../../store/UserStore";
import { useGameStore } from "../../store/GameStore";
import { IOpenCards } from "../../common/types/game/game";
import { ICards } from "../../common/types/cards";

const GamePage = () => {
    const { lobbyId } = useParams();
    const nav = useNavigate();
    const user = useUserStore(state => state.userStore);

    if (!user || !user.id) {
        throw new Error('Пользователь не авторизован');
    }

    const addCards = useGameStore(state => state.showCard);
    
    const [userInLobby, setUserInLobby] = useState<IUser[]>([]);
    const [lobbi, setLobbi] = useState<ILobbi | null>(null);
    const [isCards, setCards] = useState<ICards[]>([]);
    const [openMyCard, setOpenMyCard] = useState<boolean>(false);
    const [openVote, setOpenVote] = useState<boolean>(false);
    const [turnToWalk, setTurnToWalk] = useState<string>('blya');
    const delSt = useGameStore(state => state.reset)

    const exitLobby = () => {
        delSt()
        nav('/lobby');
    };

    const fetchLobbiData = async () => {
        try {
            const [resUser, res] = await Promise.all([
                instance.get(`room/getUserLobbi/${lobbyId}`),
                instance.get(`lobbis/getOne/${lobbyId}`)
            ]);
            setUserInLobby(resUser.data);
            setLobbi(res.data);
        } catch (error) {
            console.error("Ошибка получения данных лобби:", error);
            exitLobby();
        }
    };

    const fetchDealingCards = async () => {
        const data = {
            id_game: lobbyId,
            name: lobbi?.name,
            count: lobbi?.count,
            username: user?.username,
            userId: user?.id
        };

        if (!data.name || data.count === undefined) {
            console.error('Недостаточно данных для создания игры:', data);
            return;
        }

        try {
            const response = await instance.post('games/create', data);
            console.log(response.data);
            setCards(response.data);
        } catch (error) {
            console.error('Ошибка при создании игры:', error);
        }
    };

    useEffect(() => {
        fetchLobbiData();
    }, [lobbyId]);

    useEffect(() => {
        if (lobbi) {
            fetchDealingCards();
        }
    }, [lobbi]);

    useEffect(() => {
        if (isCards.length > 0) {
            const filteredCards = isCards.map(card => ({
                type: card.type,
                name: card.name
            }));

            const dataForStore: IOpenCards = {
                userId: user.id,
                cards: filteredCards
            };
            addCards(dataForStore);
        }
    }, [isCards, user.id, addCards]);

    return (
        <>
            <div className={style.head}>
                <div className={style.head_history}>
                    Жоская предыстория апокалипсиса. По типу открытия другого измерения, ядерная война, восстание зомби и тд
                </div>
                <div className={style.head_logo}>
                    Ход игрока {turnToWalk} <br />
                    0:30 <br />
                    <button onClick={exitLobby}>Сдаться</button> <br />
                    {lobbi?.count}
                </div>
                <div className={style.head_info}>
                    В бункере есть кухня и запас еды на 1.5 года. Арсенал с оружием. Медпункт но с запертой дверью. Пособия по земледелию
                </div>
                <div className={style.head_content}>
                    Продолжительность 3 года. Бункер 400 м^2. Тут места на 5 человек
                </div>
            </div>
            <div className={style.table}>
                <div className={style.cardList}>
                    {userInLobby.length > 0 ? userInLobby.map(item => <PlayerCard player={item} key={item.id} />) : <p>нет игроков</p>}
                </div>
                <div className={style.activeZona}>
                    <div className={style.myCard}>
                        <button onClick={() => setOpenMyCard(!openMyCard)}>My cards</button>
                    </div>
                    <div className={style.buttons}>
                        <button onClick={() => setOpenVote(!openVote)}>Голосовать</button>
                        <button>Журнал?</button>
                        <button onClick={() => setTurnToWalk('Другой')}>Потвердить</button>
                    </div>
                    <div className={style.chat}>
                        <GameChat lobbyId={lobbyId} count={userInLobby.length} />
                    </div>
                </div>
            </div>
            {openMyCard && <MyCardWidget cards={isCards} />}
            {openVote && <VoteWidget users={userInLobby} />}
        </>
    );
};

export default GamePage;