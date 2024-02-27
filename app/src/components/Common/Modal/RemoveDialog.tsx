import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import React, {useState} from "react";
import {ListItemIcon, ListItemText} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import Labels from "../../../constants/Labels";
import {useDispatch} from "react-redux";
import {errorSnackbar, successSnackbar} from "../../../common/snackbarSlice";

export interface RemoveDialogProps {
    id: any
    setNewOrUpdated: (newOrder: boolean) => void,
    remove: (id: any) => Promise<boolean>,
}

const RemoveDialog = (props: RemoveDialogProps) => {
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleRemove = async () => {
        let isOk = await props.remove(props.id);
        if (isOk) {
            props.setNewOrUpdated(true);
            dispatch(successSnackbar('Removed Correctly'))
        } else {
            dispatch(errorSnackbar('Cannot remove row. It is connected with another one'))
        }
        handleClose()
    }

    return (
        <>
            <MenuItem key={'remove'} onClick={handleClickOpen}>
                <ListItemIcon>
                    <DeleteIcon fontSize="small"/>
                </ListItemIcon>
                <ListItemText>{Labels.DELETE}</ListItemText>
            </MenuItem>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Are you sure you want to remove this row?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        After clicking this button it will be removed permanently
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleRemove} autoFocus>
                        Remove
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default RemoveDialog;
