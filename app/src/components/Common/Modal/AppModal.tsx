import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import ActionButton from "../Button/ActionButton";
import Labels from "../../../constants/Labels";
import {Modal} from "@mui/material";
import {ReactJSXElement} from "@emotion/react/types/jsx-namespace";
import React from "react";
import {useDispatch} from "react-redux";

export interface AppModalProps {
    title: string,
    content: ReactJSXElement,
    handleSave: () => void;
    setOpen: (open: boolean) => void;
    open: boolean
    readOnly?: boolean
}

const AppModal = (props: AppModalProps) => {
    const dispatch = useDispatch();

    const handleClose = () => {
        props.setOpen(false);
    }

    const handleSaveAndClose = () => {
        props.handleSave();
    }

    const boxStyle = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: props.content.key === 'biggerContract' ? '75%' : 600,
        maxHeight: '80%',
        bgcolor: 'background.paper',
        // border: '2px solid #000',
        boxShadow: 24,
        p: 4,
        overflow: 'scroll',
    };

    return (
        <Modal
            open={props.open}
            onClose={handleClose}
            disableScrollLock={true}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description">
            <Box sx={boxStyle} color="#192a56">
                <Typography id="modal-modal-title" variant="h4" component="h2" fontWeight={600}
                            textTransform="uppercase" textAlign="center" style={{marginBottom: '1rem'}}>
                    {props.title}
                </Typography>

                {props.content}
                {
                    props.title !== Labels.SAVING_ROW &&
                    <Grid container rowSpacing={1} columnSpacing={{xs: 1, sm: 2, md: 3}}
                          style={{color: "#192a56", marginTop: '1rem', justifyContent: 'end'}}>
                        {
                            props.readOnly ?
                                <Grid item={true} style={{margin: '0px 2rem 0 0'}}>
                                    <ActionButton label={Labels.OK} handleOnClick={handleClose}/>
                                </Grid>
                                :
                                <>
                                    <Grid item={true} style={{margin: '0px -2rem 0 0'}}>
                                        <ActionButton label={Labels.CANCEL} handleOnClick={handleClose}/>
                                    </Grid>
                                    <Grid item={true}>
                                        <ActionButton label={Labels.SAVE} handleOnClick={handleSaveAndClose}/>
                                    </Grid>
                                </>
                        }

                    </Grid>
                }
            </Box>
        </Modal>
    )
}

export default AppModal;
