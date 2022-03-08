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

const Home:FC = () => {
    const [name, setName] = useState("");
    const [region, setRegion] = useState("");
    const [description, setDescription] = useState("");
    const [latitude, setLatitude] = useState("");
    const [longitude, setLongitude] = useState("");
    const { updateOpen, updateMessage, updateSeverity } = useContext(LogContext);

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
          padding: theme.spacing(1, 1, 1, 0),
          paddingLeft: `calc(1em + ${theme.spacing(4)})`,
          transition: theme.transitions.create('width'),
          width: '100%',
          [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
              width: '20ch',
            },
          },
        },
      }));

    const submitData = (e: MouseEvent<HTMLElement>) => {
        e.preventDefault();
        const data = { name, region, description, latitude, longitude, user: localStorage.getItem("user_id") };

        axios
            .post("http://localhost:5000/api/v1/sites/", data, { withCredentials: true })
            .then((res) => {
                updateSeverity(1);
                updateOpen(true);
                updateMessage(res.data.message);
            })
            .catch((err) => {
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
                            <SearchIconWrapper>
                                <SearchIcon />
                            </SearchIconWrapper>
                            <StyledInputBase
                                placeholder="Search…"
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
