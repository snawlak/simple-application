import React, {useState} from "react";
import ActionButtonModal from "./ActionButtonModal";
import {ReactJSXElement} from "@emotion/react/types/jsx-namespace";
import Labels from "../../../constants/Labels";
import {useDispatch} from "react-redux";
import {errorSnackbar, successSnackbar} from "../../../common/snackbarSlice";
import Loader from "../Loader/Loader";

export interface AddDictionaryModalProps {
    setNewValue: (isNew: boolean) => void;
    emptyValue: any;
    addNewValue: (newValue: any) => Promise<boolean>
    getContent: (value: any,
                 setNewValue: (newValue: any) => void) => ReactJSXElement;
    getValidationMsg: (value: any) => string;
}

const AddContentModal = (props: AddDictionaryModalProps) => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState<boolean>(false);
    const [newValue, setNewValue] = useState<any>(props.emptyValue);
    const [openAppModal, setOpenAppModal] = useState(false);

    const handleSave = async () => {
        setLoading(true);
        let contractTypeValidationMsg = props.getValidationMsg(newValue);
        if (contractTypeValidationMsg !== '') {
            dispatch(errorSnackbar(contractTypeValidationMsg))
        } else {
            let isOk = await props.addNewValue(newValue);
            if (isOk) {
                dispatch(successSnackbar(Labels.SAVED_CORRECTLY))
                setNewValue(props.emptyValue);
                props.setNewValue(true);
                setOpenAppModal(false);
            } else {
                dispatch(errorSnackbar('Coś poszło nie tak.'))
                setOpenAppModal(false);
            }
        }
        setLoading(false);
    }

    return (
        <>
            <ActionButtonModal title={loading ? Labels.SAVING_ROW : Labels.ADD_ROW}
                                     buttonLabel={Labels.ADD}
                                     handleSave={handleSave}
                                     content={loading ? <Loader /> : props.getContent(newValue, setNewValue)}
                                     open={openAppModal}
                                     setOpen={setOpenAppModal}
                />
        </>

    )
}

export default AddContentModal;
