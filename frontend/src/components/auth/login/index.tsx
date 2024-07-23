import {TextField, Button, Typography} from '@mui/material'
import style from '../style.module.css'

export default function Enter(props: any) {
	const{setEmail, setPassword} = props
	return (
		<>
			<Typography variant="h2" fontFamily={'Popins'} textAlign={'center'}>Авторизация</Typography>
			<Typography variant="body1" fontFamily={'Popins'} textAlign={'center'} marginBottom={3}>Введите ваш логин и пароль</Typography>
			<TextField fullWidth={true} margin={'normal'} label="Email" variant="outlined" placeholder="Введите ваш email" onChange={(event) => setEmail(event.target.value)}/>
			<TextField type='password' fullWidth={true} margin={'normal'} label="Password" variant="outlined" placeholder="Введите ваш password" onChange={(event) => setPassword(event.target.value)}/>
			<Button type='submit' sx={{fontFamily: 'Popins', marginTop: 2, marginBottom: 2, width: '60%'}} variant="contained">Вадите</Button>
			<Typography variant="body1" sx={{fontFamily: 'Popins'}}>У вас нет аккаунта? <span className={style.incitingText}>Зарегистрируйся</span> </Typography>
		</>
	);
}
