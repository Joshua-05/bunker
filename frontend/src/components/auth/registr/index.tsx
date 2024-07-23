import {TextField, Button, Typography} from '@mui/material'
import style from '../style.module.css'

export default function RegisterPage() {
	return (
		<>
			<Typography variant="h2" fontFamily={'Popins'} textAlign={'center'}>Регистрация</Typography>
			<Typography variant="body1" fontFamily={'Popins'} textAlign={'center'} marginBottom={3}>Укажите ваши данные</Typography>
			<TextField fullWidth={true} margin={'normal'} label="Name" variant="outlined" placeholder="Введите ваше имя" />
			<TextField fullWidth={true} margin={'normal'} label="Username" variant="outlined" placeholder="Введите ваш login" />
			<TextField type='email' fullWidth={true} margin={'normal'} label="Email" variant="outlined" placeholder="Введите ваш email" />
			<TextField type='password' fullWidth={true} margin={'normal'} label="Password" variant="outlined" placeholder="Введите ваш password" />
			<TextField type='password' fullWidth={true} margin={'normal'} label="Again password" variant="outlined" placeholder="Повторите ваш password" />
			<Button sx={{fontFamily: 'Popins', marginTop: 2, marginBottom: 2, width: '60%'}} variant="contained">Регистрация</Button>
			<Typography variant="body1" sx={{fontFamily: 'Popins'}}>Есть аккаунт? <span className={style.incitingText}>Авторизируйся</span> </Typography>
		</>
	);
}
