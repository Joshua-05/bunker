import { IUser } from "../../common/types/auth"

interface IUserInLobbyCard {
    users: IUser
}

const UserInLobbyCard = ({users}: IUserInLobbyCard) => {
    return (
        <div>
            <p>{users.username}</p>
        </div>
    )
}

export default UserInLobbyCard