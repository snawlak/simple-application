import AddIcon from "@mui/icons-material/Add";
import Labels from "../../../constants/Labels";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import React from "react";
import Grid from "@mui/material/Grid";
import {SaveButtonReducerModel} from "../../../common/saveButtonSlice";
import {useSelector} from "react-redux";

export interface EditButtonProps {
    handleOnClick?: () => void;
    label: string
}


const ActionButton = (props: EditButtonProps) => {
    const saveButtonProperties: SaveButtonReducerModel = useSelector((state: any) => state.saveButton)

    const getIcon = () => {
        switch (props.label) {
            case Labels.SAVE:
            case Labels.ADD:
                return <AddIcon/>
            case Labels.EDIT:
                return <EditIcon />
        }
    }

    const getVariant = () => {
        if (props.label === Labels.CANCEL || props.label === Labels.OK)
            return 'outlined';
        return 'contained';
    }

    const isCancel = (): boolean => {
        return props.label === Labels.CANCEL || props.label === Labels.OK;
    }

    const getStyles = () => {
        if (isCancel()) {
            return {margin: '0 1rem'};

        } else {
            if (isDisabled()) {
                return {
                    backgroundColor: '#E0E0E0',
                    color: '#fff',
                    margin: '0 1rem'
                };
            }
            return {
                backgroundColor: '#0097e6',
                boxShadow: '0 2px 10px -5px #0097e6',
                color: '#fff',
                margin: '0 1rem'
            };
        }
    }

    const isAction = () : boolean => {
        return props.label === Labels.SAVE || props.label === Labels.EDIT;
    }

    const isDisabled = () : boolean => {
        return isAction() && !saveButtonProperties.readyToSave;
    }

    return (
        <Grid container rowSpacing={1} columnSpacing={{xs: 1, sm: 2, md: 3}}>
            <Grid item xs={12} textAlign={"center"}>

                <Button
                    disabled={isDisabled()}
                    variant={getVariant()}
                    endIcon={getIcon()}
                    onClick={props.handleOnClick}
                    style={getStyles()}>
                    {props.label}
                </Button>

            </Grid>
        </Grid>

    );
}

export default ActionButton;
