import React from "react";
import { Avatar, Button, Grid, Paper, TextField } from "@mui/material";
import LockOpenIcon from '@mui/icons-material/LockOpen';

const Login = () => {
    const paperStyle = {
        padding: 20,
        width: 400,
        margin: "50px auto"
    };

    const spaced = {
        margin: "10px 0"
    };

    const spaceBottom = {
        marginBottom: "5px"
    };

    return (
        <Grid>
            <Paper elevation={10} style={paperStyle}>
                <Grid>
                    <Avatar><LockOpenIcon/></Avatar>
                    <h3 style={spaced}>Account Login</h3>
                </Grid>
                <TextField style={spaceBottom} label="Username" placeholder="Enter username" required fullWidth />
                <TextField style={spaceBottom} label="Password" placeholder="Enter password" type="password" fullWidth required />
                <Button style={spaced} type="submit" color="primary" variant="contained" fullWidth>Login</Button>
            </Paper>
        </Grid>
    );
};

export default Login;
