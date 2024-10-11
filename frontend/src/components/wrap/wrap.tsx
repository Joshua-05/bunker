import { Link } from "react-router-dom";
import style from "./style.module.css"
import {Avatar} from "@mui/material"
import { useUserStore } from "../../store";

export const Header: React.FC = () : JSX.Element => {
	const user = useUserStore(state => state.userStore)
	return (
		
		<header>
			<div className={style.logo}><Link to = '/'>БУНКЕР</Link></div>
			<div className={style.nav}>
				<Link to ='/lobbi'><button className={style.nav_but}>ИГРАТЬ</button></Link>
				<Link to = '/rules'><button className={style.nav_but}>ПРАВИЛА</button></Link>
			</div>

			
			<div className={style.profile}>
				<p>{user?.firstName}</p>
				<Avatar src="/broken-image.jpg" />
			</div>
			
		</header>
		
	);
}

export function Footer() {
	return (
		<footer>
			Все права отсутствуют бла-бла-бла-бла-бла-бла-бла-бла-бла-бла
		</footer>
	);
}
