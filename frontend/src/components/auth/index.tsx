import { useLocation } from "react-router-dom";
import style from "./style.module.css";
import LoginPage from "./login";
import RegisterPage from "./registr";
import { Box } from "@mui/material";
import { useState } from "react";
import { instance } from "../../utils/axios";

const AuthRootComponent: React.FC = (): JSX.Element => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [firstName, setFirstName] = useState("");
	const [username, setUsername] = useState("");
	const [repeatPassword, setRepeatPassword] = useState("");
	const location = useLocation();


	const handleSubmit = async (event: { preventDefault: () => void }) => {
		event.preventDefault();
		if (location.pathname === '/login') {
			const userData = {
				email,
				password,
			};
			const user = await instance.post("auth/login", userData);
			console.log(user.data);
		}
		else {
			if (password === repeatPassword){
				const userData = {
					firstName,
					username,
					email,
					password
				};
				const newUser = await instance.post("auth/register", userData);
				console.log(newUser.data);
			} else {
				throw new Error('Пароли не совпадают')
			}
		}
	};

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
						<LoginPage setEmail={setEmail} setPassword={setPassword} />
					) : location.pathname === "/registr" ? (
						<RegisterPage
							setFirstName={setFirstName}
							setUsername={setUsername}
							setEmail={setEmail}
							setPassword={setPassword}
							setRepeatPassword={setRepeatPassword}
						/>
					): null}
				</Box>
			</form>
		</div>
	);
};

export default AuthRootComponent;
