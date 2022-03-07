import { Container, Grid, Paper, TextField, Button, AppBar, Toolbar, Box } from "@mui/material";
import React, { FC, useState } from "react";
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import styles from "../styles/home";

const Home:FC = () => {
    const [name, setName] = useState("");
    const [region, setRegion] = useState("");
    const [description, setDescription] = useState("");
    const [latitude, setLatitude] = useState("");
    const [longitude, setLongitude] = useState("");

    const submitData = () => {};

    return (
        <>
            <AppBar position="static">
                <Container>
                    <Toolbar>
                        <h3>Audit Log</h3>
                        <Button type="button" variant="text" color="secondary" startIcon={<ExitToAppIcon />}>Logout</Button>
                    </Toolbar>
                </Container>
            </AppBar>
            <Container>
                <Paper elevation={5} style={styles.formStyle}>
                    <form>
                        <TextField style={styles.spaceBottom} label="Site Name" placeholder="Enter site name" required fullWidth onChange={(e) => setName(e.target.value)} />
                        <TextField style={styles.spaceBottom} label="Region" placeholder="Enter region name" fullWidth required  onChange={(e) => setRegion(e.target.value)} />
                        <TextField style={styles.spaceBottom} label="Description" placeholder="Enter description" required fullWidth onChange={(e) => setDescription(e.target.value)} />
                        <TextField style={styles.spaceBottom} label="Latitude" placeholder="Enter latitude" fullWidth required  onChange={(e) => setLatitude(e.target.value)} />
                        <TextField style={styles.spaceBottom} label="Longitude" placeholder="Enter longitude" required fullWidth onChange={(e) => setLongitude(e.target.value)} />
                        <Grid>
                            <Button style={styles.spaced} startIcon={<CheckIcon />} type="submit" color="primary" variant="contained" onClick={submitData}>Save</Button>
                            <Button style={styles.shifted} startIcon={<ClearIcon />} type="button" variant="outlined">Cancel</Button>
                        </Grid>              
                    </form>
                </Paper>
            </Container>
        </>
    );
};

export default Home;
