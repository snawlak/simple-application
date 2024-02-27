import {useDispatch, useSelector} from "react-redux";
import {Alert, Snackbar} from "@mui/material";
import {clearSnackbar, SnackbarReducerModel} from "../../../common/snackbarSlice";
import React from "react";

const AppSnackbar = () => {
    const dispatch = useDispatch();
    const snackbarProperties: SnackbarReducerModel = useSelector((state: any) => state.snackbar)

    const handleClose = () => {
        dispatch(clearSnackbar());
    };


    return (
        <Snackbar open={snackbarProperties.success || snackbarProperties.error}
                  autoHideDuration={4000}
                  onClose={handleClose}
                  anchorOrigin={{
                      vertical: "top",
                      horizontal: "right"
                  }}>
            <Alert onClose={handleClose} severity={snackbarProperties.success ? "success" : "error"}
                   sx={{width: '100%'}} style={{textTransform: 'none'}}>
                {snackbarProperties.msg}
            </Alert>
        </Snackbar>
    );
}

export default AppSnackbar;
