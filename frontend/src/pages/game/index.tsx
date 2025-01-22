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
import { ICardsIsOpen, IOpenCards, ITurnToWalk } from "../../common/types/game/game";
import socket from "../../utils/socket";
import { Header } from "./components/header";
import { fetchDealingCards } from "../../api/game/DealingCards";
import { fetchLobbiData } from "../../api/game/LobbiData";


const GamePage = () => {
    const { lobbyId } = useParams();
    const nav = useNavigate();
    const user = useUserStore(state => state.userStore);
    const addPlayerCard = useGameStore(state => state.addPlayerCards)
    const playerCard = useGameStore(state => state.playerCards)

    if (!user || !user.id) {
        throw new Error('Пользователь не авторизован');
    }

    const addCards = useGameStore(state => state.showCard);
    const openCa = useGameStore(state => state.openCards)
    
    const [userInLobby, setUserInLobby] = useState<IUser[]>([]);
    const [lobbi, setLobbi] = useState<ILobbi | null>(null);
    const [openMyCard, setOpenMyCard] = useState<boolean>(false);
    const [openVote, setOpenVote] = useState<boolean>(false);
    const [turnToWalk, setTurnToWalk] = useState<ITurnToWalk>();
    const [selectedCard, setSelectedCard] = useState<ICardsIsOpen>();
    const delSt = useGameStore(state => state.reset)

    const [testOpen, setTestOpen] = useState<IOpenCards | string>()

    const exitLobby = async() => {
        await instance.post('games/leave', {userId: user.id})
        delSt()
        nav('/lobby');
    };

    

    useEffect(() => {
        fetchLobbiData({
            lobbyId,
            setUserInLobby,
            setLobbi,
            exitLobby,
        })
    }, [lobbyId, user]);

    useEffect(() => {
        if (lobbi) {
            fetchDealingCards({
                lobbyId,
                lobbi,
                user,
                addPlayerCard,
                addCards,
            })
        }
        
    }, [lobbi, user, addCards]);

    const handleConfirm = () => {
        setTurnToWalk(turnToWalk)
        const card = {
            gameId: lobbyId,
            userId: user.id,
            cards: selectedCard
        }
        socket.emit('openCard', card)
    }

    useEffect(() => {
        socket.on('userOpenCard', (ert : IOpenCards) => {
            addCards(ert)
            // setTestOpen(ert)
            console.log('Прилет с другого клиента', ert);
            
        })
        return(() => {
            socket.off('userOpenCard')
        })
    }, [])
    
    console.log("All cards: ",  openCa);
    // console.log('Its may card:', playerCard);
    console.log('Это выбранная:', selectedCard);
    
    

    return (
        <>
            <Header exitLobby={exitLobby} turnUser={turnToWalk?.username} count={lobbi?.count}/>
            <div className={style.table}>
                <div className={style.cardList}>
                    {userInLobby.length > 0 ? userInLobby.map(item => <PlayerCard player={item} key={item.id} />) : <p>нет игроков</p>}
                </div>
                <div className={style.activeZona}>
                    <div className={style.myCard}>
                        <button onClick={() => setOpenMyCard(!openMyCard)}>My cards</button>
                    </div>
                    <div className={style.buttons}>
                        <button onClick={() => handleConfirm()}>Потвердить</button><br />
                        <button onClick={() => setOpenVote(!openVote)}>Голосовать</button><br />
                        <button>Журнал?</button>
                    </div>
                    <div className={style.chat}>
                        {lobbi && <GameChat lobbyId={lobbyId} count={lobbi.count} />}
                    </div>
                </div>
            </div>
            {openMyCard && <MyCardWidget setSelectedCard={setSelectedCard} cards={playerCard} />}
            {openVote && <VoteWidget users={userInLobby} />}
            {selectedCard && <p>{selectedCard.type}</p>}
        </>
    );
};

export default GamePage;