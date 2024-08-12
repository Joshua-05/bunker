import { useLocation } from "react-router-dom";
import style from "./style.module.css";
import LoginPage from "./login";
import RegisterPage from "./registr";
import { Box } from "@mui/material";
import { useState } from "react";
import { instance } from "../../utils/axios";

export default function AuthRootComponent() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const location = useLocation();

	const handleSubmit = async (event: { preventDefault: () => void; }) => {
		event.preventDefault()
		const userData = {
			email,
			password
		}
		const user = await instance.post('auth/login', userData)
		console.log(user.data)
	}

	return (
		<div className={style.root}>
			<form className={style.form} onSubmit={handleSubmit}>
				<Box
					display="flex"
					justifyContent="center"
					alignItems="center"
					flexDirection="column"
					maxWidth={640}
					margin="auto"
					padding={5}
					borderRadius={5}
					boxShadow={"5px 5px 10px #ccc"}
				>
					{location.pathname === "/login" ? (
						<LoginPage setEmail={setEmail} setPassword={setPassword}/>
					) : location.pathname === "/registr" ? (
						<RegisterPage />
					) : null}
				</Box>
			</form>
		</div>
	);
}
