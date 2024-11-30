import { Link } from "react-router-dom"
import style from "./style.module.css"
import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material"
import { useState } from "react";

const CreateCardPage = () => {
    const [name, setName] = useState('');
    const [count, setCount] = useState('');
    const [access, setAccess] = useState('');
    const [password, setPassword] = useState('');
    return(
        <>
            <div className={style.box}>
                <h1>Создать карты</h1><Link to="/cards"><button>Список карт</button></Link>
                <form >
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
                        <TextField 
                            id="outlined-basic" fullWidth={true}	
                            margin={"normal"} label="Name lobbi" 
                            variant="outlined" 
                            onChange={(event) => setName(event.target.value)}
                        />
                        <FormControl fullWidth margin={"normal"}>
                            <InputLabel id="demo-simple-select-label">Number of players</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={count}
                                label="Number of players"
                                onChange={(event) => setCount(event.target.value)}
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
                                onChange={(event) => setAccess(event.target.value)}
                            >
                                <MenuItem value={'private'}>Приватный</MenuItem>
                                <MenuItem value={'public'}>Публичный</MenuItem>
                            </Select>
                        </FormControl>

                        {access === "private" ? <TextField type="password" fullWidth={true}	margin={"normal"} label="Password" variant="outlined" onChange={(event) => setPassword(event.target.value)}/> : null}

                        <Button
                            type="submit"
                            sx={{
                                fontFamily: "Poppins",
                                marginTop: 2,
                                marginBottom: 2,
                                width: "60%",
                            }}
                            variant="contained"
                        >
                            Create
                        </Button>
                        
                        
                    </Box>
                </form>
            </div>
        </>
    )
}

export default CreateCardPage