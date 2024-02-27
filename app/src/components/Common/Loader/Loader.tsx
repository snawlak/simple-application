import {CircularProgress} from "@mui/material";
import React from "react";
import Grid from "@mui/material/Grid";

const Loader = () => {

    return (
        <>
            <Grid container={true} rowSpacing={1} columnSpacing={{xs: 1, sm: 2, md: 3}} style={{color: "#192a56"}}>
                <Grid item={true} xs={12} style={{display: 'flex', justifyContent: "center", alignItems: "center"}}>
                    <CircularProgress/>
                </Grid>
            </Grid>
        </>
    );
}

export default Loader;
