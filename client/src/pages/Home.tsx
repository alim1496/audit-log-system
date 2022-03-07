import { Container, Grid, Paper, TextField, Button } from "@mui/material";
import React, { FC, useState } from "react";
import styles from "../styles/home";

const Home:FC = () => {
    const [name, setName] = useState("");
    const [region, setRegion] = useState("");
    const [description, setDescription] = useState("");
    const [latitude, setLatitude] = useState("");
    const [longitude, setLongitude] = useState("");

    const submitData = () => {};

    return (
        <Container maxWidth="lg">
            <Grid style={styles.topbarStyle}>
                <TextField label="Site ID" placeholder="Enter site id to edit" style={{ height: "30px" }} />
                <Button type="button" style={styles.shifted} variant="contained" color="primary">Search</Button>
            </Grid>
            <Paper elevation={5} style={styles.formStyle}>
                <form>
                    <TextField style={styles.spaceBottom} label="Site Name" placeholder="Enter site name" required fullWidth onChange={(e) => setName(e.target.value)} />
                    <TextField style={styles.spaceBottom} label="Region" placeholder="Enter region name" fullWidth required  onChange={(e) => setRegion(e.target.value)} />
                    <TextField style={styles.spaceBottom} label="Description" placeholder="Enter description" required fullWidth onChange={(e) => setDescription(e.target.value)} />
                    <TextField style={styles.spaceBottom} label="Latitude" placeholder="Enter latitude" fullWidth required  onChange={(e) => setLatitude(e.target.value)} />
                    <TextField style={styles.spaceBottom} label="Longitude" placeholder="Enter longitude" required fullWidth onChange={(e) => setLongitude(e.target.value)} />
                    <Grid>
                        <Button style={styles.spaced} type="submit" color="primary" variant="contained" onClick={submitData}>Save</Button>
                        <Button style={styles.shifted} type="button" variant="outlined">Cancel</Button>
                    </Grid>              
                </form>
            </Paper>
        </Container>
    );
};

export default Home;
