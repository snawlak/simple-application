import {ReactJSXElement} from "@emotion/react/types/jsx-namespace";
import ActionButton from "../Button/ActionButton";
import AppModal from "./AppModal";

export interface ActionButtonModalProps {
    title: string,
    content: ReactJSXElement,
    buttonLabel: string,
    handleSave: () => void;
    setOpen: (open: boolean) => void;
    open: boolean
}

const ActionButtonModal = (props: ActionButtonModalProps) => {
    const handleOpen = () => {
        props.setOpen(true);
    }

    return (
        <>
            <ActionButton handleOnClick={handleOpen} label={props.buttonLabel} />
            <AppModal setOpen={props.setOpen}
                      open={props.open}
                      title={props.title}
                      content={props.content}
                      handleSave={props.handleSave} />
        </>
    );
}

export default ActionButtonModal;
