import React, { useState, MouseEvent, FC } from "react";
import { Avatar, Button, Container, Grid, Paper, TextField } from "@mui/material";
import axios from "axios";
import LockOpenIcon from '@mui/icons-material/LockOpen';
import styles from "../styles/login";

const Login:FC = () => {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");

    const submitData = (e: MouseEvent<HTMLElement>) => {
        e.preventDefault();
        if(userName === "" || password === "") return;

        const data = { userName, password };
        axios
            .post("http://localhost:5000/api/v1/users/login", data)
            .then((res) => {
                console.log(res);
                window.location.href = "/";
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <Container maxWidth="sm">
            <Paper elevation={5} style={styles.paperStyle}>
                <form>
                    <Grid container direction="column" style={styles.centered}>
                        <Avatar style={styles.avatarStyle}><LockOpenIcon/></Avatar>
                        <h3 style={styles.spaced}>Account Login</h3>
                    </Grid>
                    <TextField style={styles.spaceBottom} label="Username" placeholder="Enter username" required fullWidth onChange={(e) => setUserName(e.target.value)} />
                    <TextField style={styles.spaceBottom} label="Password" placeholder="Enter password" type="password" fullWidth required  onChange={(e) => setPassword(e.target.value)} />
                    <Button style={{...styles.spaced, ...styles.expanded}} type="submit" color="primary" variant="contained" fullWidth onClick={submitData}>Login</Button>
                </form>
            </Paper>
        </Container>
    );
};

export default Login;
