import { Container, Grid, Paper, TextField, Button, AppBar, Toolbar, Box } from "@mui/material";
import React, { FC, useState, MouseEvent, useContext } from "react";
import { styled, alpha } from '@mui/material/styles';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import SearchIcon from '@mui/icons-material/Search';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import styles from "../styles/home";
import axios from "axios";
import LogContext from "../utils/LogContext";
import LoadingButton from "../components/LoadingButton";

const Home:FC = () => {
    const [name, setName] = useState("");
    const [region, setRegion] = useState("");
    const [description, setDescription] = useState("");
    const [latitude, setLatitude] = useState("");
    const [longitude, setLongitude] = useState("");
    const { updateOpen, updateMessage, updateSeverity } = useContext(LogContext);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState("");

    const Search = styled('div')(({ theme }) => ({
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        '&:hover': {
          backgroundColor: alpha(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
          marginLeft: theme.spacing(1),
          width: 'auto',
        },
      }));
      
      const SearchIconWrapper = styled('div')(({ theme }) => ({
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }));

      const StyledInputBase = styled(InputBase)(({ theme }) => ({
        color: 'inherit',
        '& .MuiInputBase-input': {
          padding: theme.spacing(1, 2, 1, 2),
          width: '100%',
        },
      }));

    const clearData = () => {
        setName("");
        setRegion("");
        setDescription("");
        setLatitude("");
        setLongitude("");
    };

    const submitData = () => {
        if(!name || !region || !description || !latitude || !longitude) return;
        const data = { name, region, description, latitude, longitude, user: localStorage.getItem("user_id") };
        setLoading(true);
        axios
            .post("http://localhost:5000/api/v1/sites/", data, { withCredentials: true })
            .then((res) => {
                setLoading(false);
                updateSeverity(1);
                updateOpen(true);
                updateMessage(res.data.message);
            })
            .catch((err) => {
                setLoading(false);
                updateSeverity(0);
                updateOpen(true);
                updateMessage("Something went wrong. Could not create site.");
            });
    };

    const logout = () => {
        axios
            .get("http://localhost:5000/api/v1/users/logout")
            .then(() => {
                localStorage.removeItem("user_id");
                window.location.href = "/login";
            })
            .catch((err) => console.log(err));
    };

    const searchSite = (e: KeyboardEvent) => {
        if(e.key === "Enter") {
            //console.log(e.target.value)
        }
    };

    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar style={{ margin: "auto", width: "50%", minWidth: 300 }}>
                        <Typography
                            variant="h6"
                            noWrap
                            component="div"
                            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
                        >
                            Audit Log
                        </Typography>
                        <Search>
                            <StyledInputBase
                                placeholder="Enter site id to search..."
                                inputProps={{ 'aria-label': 'search' }}
                            />
                        </Search>
                        <Button type="button" startIcon={<ExitToAppIcon />} style={{ color: "#fff", marginLeft: "2rem" }} onClick={logout}>Logout</Button>
                    </Toolbar>
                </AppBar>
            </Box>
            <Container>
                <Paper elevation={5} style={styles.formStyle}>
                    <form>
                        <TextField style={styles.spaceBottom} value={name} label="Site Name" placeholder="Enter site name" required fullWidth onChange={(e) => setName(e.target.value)} />
                        <TextField style={styles.spaceBottom} value={region} label="Region" placeholder="Enter region name" fullWidth required  onChange={(e) => setRegion(e.target.value)} />
                        <TextField style={styles.spaceBottom} value={description} label="Description" placeholder="Enter description" required fullWidth onChange={(e) => setDescription(e.target.value)} />
                        <TextField style={styles.spaceBottom} value={latitude} label="Latitude" placeholder="Enter latitude" fullWidth required  onChange={(e) => setLatitude(e.target.value)} />
                        <TextField style={styles.spaceBottom} value={longitude} label="Longitude" placeholder="Enter longitude" required fullWidth onChange={(e) => setLongitude(e.target.value)} />
                        <Grid>
                            <LoadingButton text="Save" click={submitData} loading={loading} width={false} styles={styles.spaced} start={<CheckIcon />} />
                            <Button style={styles.shifted} startIcon={<ClearIcon />} type="button" variant="outlined" onClick={clearData}>Cancel</Button>
                        </Grid>              
                    </form>
                </Paper>
            </Container>
        </>
    );
};

export default Home;
