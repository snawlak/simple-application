import React, {useState} from "react";
import AppModal from "./AppModal";
import EditIcon from "@mui/icons-material/Edit";
import {ListItemIcon, ListItemText} from "@mui/material";
import Labels from "../../../constants/Labels";
import MenuItem from "@mui/material/MenuItem";
import {ReactJSXElement} from "@emotion/react/types/jsx-namespace";
import {useDispatch} from "react-redux";
import {errorSnackbar, successSnackbar} from "../../../common/snackbarSlice";
import Loader from "../Loader/Loader";

export interface EditIconButtonModalProps {
    value: any;
    setNewUnprocessedOrderOrUpdate: (newOrder: boolean) => void,
    edit: (id: any, newValue: any) => Promise<boolean>,
    getContent: (value: any,
                 setNewValue: (newValue: any) => void) => ReactJSXElement;
    getValidationMsg: (value: any) => string;
}

const EditIconButtonModal = (props: EditIconButtonModalProps) => {
    const [loading, setLoading] = useState<boolean>(false);
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState<any>(props.value);

    const handleOpen = () => {
        setOpen(true);
        // dispatch(hideMenuAnchor());
    }

    const handleSave = async () => {
        setLoading(true);
        let contractTypeValidationMsg = props.getValidationMsg(value);
        if (contractTypeValidationMsg !== '') {
            dispatch(errorSnackbar(contractTypeValidationMsg))
        } else {
            let isOk = await props.edit(props.value.id, value);
            if (isOk) {
                dispatch(successSnackbar(Labels.SAVED_CORRECTLY))
                setValue(value);
                props.setNewUnprocessedOrderOrUpdate(true);
                setOpen(false);
            } else {
                dispatch(errorSnackbar('Coś poszło nie tak.'))
                setOpen(false);
            }
        }
        setLoading(false);
    }

    return (
        <>
            <MenuItem key={'edit'} onClick={handleOpen}>
                <ListItemIcon>
                    <EditIcon fontSize={"small"}/>
                </ListItemIcon>
                <ListItemText>{Labels.EDIT}</ListItemText>
            </MenuItem>
            <AppModal setOpen={setOpen}
                      open={open}
                      title={loading ? Labels.SAVING_ROW : Labels.EDIT_ROW}
                      handleSave={handleSave}
                      content={loading ? <Loader /> : props.getContent(value, setValue)}
            />
        </>
    );
}

export default EditIconButtonModal;
