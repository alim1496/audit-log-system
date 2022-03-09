import React, { useState, MouseEvent, FC, useContext, useRef } from "react";
import { Avatar, Button, Container, Grid, Paper, TextField } from "@mui/material";
import axios from "axios";
import LockOpenIcon from '@mui/icons-material/LockOpen';
import LogContext from "../utils/LogContext";
import styles from "../styles/login";
import LoadingButton from "../components/LoadingButton";

const Login:FC = () => {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const { updateMessage, updateOpen, updateSeverity } = useContext(LogContext);
    
    const submitData = (e: MouseEvent<HTMLElement>) => {
        if(userName === "" || password === "") return;

        setLoading(true);
        const data = { userName, password };
        axios
            .post("http://localhost:5000/api/v1/users/login", data, { withCredentials: true })
            .then((res) => {
                setLoading(false);
                updateSeverity(1);
                updateOpen(true);
                updateMessage(res.data.message);
                localStorage.setItem("user_id", res.data.user_id);
                window.location.href = "/";
            })
            .catch((err) => {
                setLoading(false);
                updateSeverity(0);
                updateOpen(true);
                updateMessage("Credentials did not match");
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
                    <LoadingButton click={submitData} styles={{...styles.spaced, ...styles.expanded}} width={true} text="Login" loading={loading} />
                </form>
            </Paper>
        </Container>
    );
};

export default Login;
