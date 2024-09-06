import { Link } from "react-router-dom"
import { Header, Footer } from "../wrap/wrap"
import style from "./style.module.css"
import { Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material"
import { useState } from "react"

export default function CreateLobbiPage() {
    const [count, setCount] = useState('');
    const [access, setAccess] = useState('');

    const handleChange = (event: SelectChangeEvent) => {
        setCount(event.target.value)
        console.log(count)
    }

    const handleAccessChange = (event: SelectChangeEvent) => {
        setAccess(event.target.value)
        console.log(access)
    }

    return(
        <>
            <Header />
            <div className={style.box}>
                <h1>Создать лобби</h1><Link to = '/lobbi'><button>Watch lobbi</button><br /></Link>
                <form>
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
                        <TextField id="outlined-basic" fullWidth={true}	margin={"normal"} label="Name lobbi" variant="outlined" />
                        <FormControl fullWidth margin={"normal"}>
                            <InputLabel id="demo-simple-select-label">Number of players</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={count}
                                label="Number of players"
                                onChange={handleChange}
                            >
                                <MenuItem value={8}>Восемь</MenuItem>
                                <MenuItem value={10}>Десять</MenuItem>
                                <MenuItem value={12}>Двенадцать</MenuItem>
                            </Select>
                        </FormControl>

                        <FormControl fullWidth margin={"normal"}>
                            <InputLabel id="simple-select-label">Access</InputLabel>
                            <Select
                                labelId="simple-select-label"
                                id="simple-select"
                                value={access}
                                label="Access"
                                onChange={handleAccessChange}
                            >
                                <MenuItem value={'private'}>Приватный</MenuItem>
                                <MenuItem value={'public'}>Публичный</MenuItem>
                            </Select>
                        </FormControl>

                        {access === "private" ? <TextField type="password" fullWidth={true}	margin={"normal"} label="Password" variant="outlined" /> : null}
                        
                        
                    </Box>
                </form>
            </div>
            <Footer />
        </>
    )
}