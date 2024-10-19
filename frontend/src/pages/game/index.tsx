import { useParams } from "react-router-dom"
import { useLobbiStore } from "../../store";

 const GamePage = () => {
    const {lobbyId} = useParams();
    const find = useLobbiStore(state => state.findLobbi)
    const lobbi = find(Number(lobbyId))
    return(
        <>
            <div>
                <h2>Game for lobby ID: {lobbyId}</h2>
            </div>
            <p>{lobbi?.name}</p>
        </>
    )
}

export default GamePage