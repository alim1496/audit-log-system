import { Button, CircularProgress } from "@mui/material";
import React, { FC } from "react";
import { LoadingData } from "../types/LoadingData";

const LoadingButton: FC<LoadingData> = ({ loading, click, text, styles, width, start }) => (
    <Button style={styles} type="submit" color="primary" variant="contained" fullWidth={width} onClick={click} disabled={loading} startIcon={start ? start : ''}>
        {loading ? <CircularProgress size={14} /> : text}
    </Button>
);

export default LoadingButton;
