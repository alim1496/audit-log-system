import { Container, Grid, Paper, TextField, Button, AppBar, Toolbar, Box, CircularProgress } from "@mui/material";
import React, { FC, useState, MouseEvent, useContext, ChangeEventHandler, ChangeEvent, KeyboardEvent } from "react";
import { styled, alpha } from '@mui/material/styles';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import SearchIcon from '@mui/icons-material/Search';
//import LoadingIcon
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import styles from "../styles/home";
import axios from "axios";
import LogContext from "../utils/LogContext";
import LoadingButton from "../components/LoadingButton";
import { SiteData } from "../types/SiteData";
import { LogData } from "../types/LogData";

const Home:FC = () => {
    const [name, setName] = useState("");
    const [region, setRegion] = useState("");
    const [description, setDescription] = useState("");
    const [latitude, setLatitude] = useState("");
    const [longitude, setLongitude] = useState("");
    const { updateOpen, updateMessage, updateSeverity } = useContext(LogContext);
    const [loading, setLoading] = useState(false);
    const [siteID, setSiteID] = useState("");
    const [logs, setLogs] = useState<LogData[]>([]);
    const [searchLoading, setSearchLoading] = useState(false);

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

      const StyledInputBase = styled(InputBase)(({ theme }) => ({
        color: 'inherit',
        '& .MuiInputBase-input': {
          padding: theme.spacing(1, 5, 1, 2),
          width: '100%',
        },
      }));

    const clearData = () => {
        setName("");
        setRegion("");
        setDescription("");
        setLatitude("");
        setLongitude("");
        setSiteID("");
    };

    const submitData = () => {
        if(!name || !region || !description || !latitude || !longitude) return;
        const data = { name, region, description, latitude, longitude, user: localStorage.getItem("user_id") };
        setLoading(true);
        if(siteID === "") {
            axios
                .post("http://localhost:5000/api/v1/sites/", data, { withCredentials: true })
                .then((res) => {
                    setLoading(false);
                    updateSeverity(1);
                    updateOpen(true);
                    updateMessage(res.data.message);
                    clearData();
                })
                .catch((err) => {
                    setLoading(false);
                    updateSeverity(0);
                    updateOpen(true);
                    updateMessage("Something went wrong. Could not create site.");
                });
        } else {
            axios
                .put(`http://localhost:5000/api/v1/sites/${siteID}`, data, { withCredentials: true })
                .then((res) => {
                    setLoading(false);
                    updateSeverity(1);
                    updateOpen(true);
                    updateMessage(res.data.message);
                    clearData();
                    fetchLogs(siteID);
                })
                .catch((err) => {
                    setLoading(false);
                    updateSeverity(0);
                    updateOpen(true);
                    updateMessage("Something went wrong. Could not create site.");
                });
        }
    };

    const fetchLogs = (_siteID: string) => {
        axios
            .get(`http://localhost:5000/api/v1/logs/${_siteID}`, { withCredentials: true })
            .then(res => {
                const _res = res.data.result;
                setLogs(_res);
            })
            .catch(err => console.log(err));
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

    const searchSite = () => {
        const input:HTMLInputElement | null = document.querySelector("#main_search");
        if(input?.value) {
            setSearchLoading(true);
            axios
                .get(`http://localhost:5000/api/v1/sites/${input.value}`, { withCredentials: true })
                .then(res => {
                    setSearchLoading(false);
                    updateSeverity(1);
                    updateOpen(true);
                    updateMessage("Site with that ID was found.");
                    const { data } = res;
                    setSiteID(data._id);
                    setName(data.name);
                    setRegion(data.region);
                    setDescription(data.description);
                    setLatitude(data.latitude);
                    setLongitude(data.longitude);
                    fetchLogs(input.value);
                })
                .catch(err => {
                    setSearchLoading(false);
                    updateSeverity(0);
                    updateOpen(true);
                    updateMessage("Found no site with that ID.");
                });
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
                                id="main_search"
                            />
                            {searchLoading 
                                ? (<CircularProgress 
                                    size={18} 
                                    style={{ 
                                        position: "absolute",
                                        right: 8, 
                                        top: 8,
                                        color: "#fff"
                                    }}
                                    />)
                                : (<SearchIcon 
                                    style={{ 
                                        position: "absolute",
                                        right: 8, 
                                        top: 6, 
                                        cursor: "pointer" 
                                    }}
                                    onClick={searchSite} 
                                />)
                            }
                            
                        </Search>
                        <Button type="button" startIcon={<ExitToAppIcon />} style={{ color: "#fff", marginLeft: "2rem" }} onClick={logout}>Logout</Button>
                    </Toolbar>
                </AppBar>
            </Box>
            <Container>
                <Paper elevation={5} style={styles.formStyle}>
                    {siteID !== "" && <h4 style={{ marginBottom: 20 }}>Site ID: {siteID}</h4>}
                    <form>
                        <TextField style={styles.spaceBottom} value={name} label="Site Name" placeholder="Enter site name" required fullWidth onChange={(e) => setName(e.target.value)} />
                        <TextField style={styles.spaceBottom} value={region} label="Region" placeholder="Enter region name" fullWidth required  onChange={(e) => setRegion(e.target.value)} />
                        <TextField style={styles.spaceBottom} value={description} label="Description" placeholder="Enter description" required fullWidth onChange={(e) => setDescription(e.target.value)} />
                        <TextField style={styles.spaceBottom} value={latitude} label="Latitude" placeholder="Enter latitude" fullWidth required  onChange={(e) => setLatitude(e.target.value)} />
                        <TextField style={styles.spaceBottom} value={longitude} label="Longitude" placeholder="Enter longitude" required fullWidth onChange={(e) => setLongitude(e.target.value)} />
                        <Grid>
                            <LoadingButton
                                text={siteID !== "" ? "Update" : "Save"} 
                                click={submitData} 
                                loading={loading} 
                                width={false} 
                                styles={styles.spaced} 
                                start={<CheckIcon />} 
                            />
                            <Button style={styles.shifted} startIcon={<ClearIcon />} type="button" variant="outlined" onClick={clearData}>Cancel</Button>
                        </Grid>              
                    </form>
                    {logs.length > 0 && (
                        <>
                            <hr style={{ margin: "10px 0" }}/>
                            <h4 style={{ marginBottom: 6 }}>Audit Log</h4>
                        </>
                    )}
                    {logs.map((log: LogData) => {
                        const time = log.createdAt.split("T");
                        return(
                            <p style={{ fontSize: 14, marginBottom: 3 }}>
                                {log.update ? "Updated" : "Created"} by {log.user.fullName} on {time[0]} {time[1].split(".")[0]}
                            </p>
                        )}
                    )}
                </Paper>
            </Container>
        </>
    );
};

export default Home;
