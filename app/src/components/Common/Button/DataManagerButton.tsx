import RemoveDialog from "../Modal/RemoveDialog";
import {ReactJSXElement} from "@emotion/react/types/jsx-namespace";

export interface OrderManagerButtonProps {
    updatableValue: any;
    setNewOrUpdated: (newOrUpdated: boolean) => void,
    remove: (id: any) => Promise<boolean>,
    editableComponent: ReactJSXElement,
    alwaysDisplayComponents ?: ReactJSXElement[]
    additionalComponents?: ReactJSXElement[]
}

const DataManagerButton = (props: OrderManagerButtonProps) => {

    return (
        <>
            {props.alwaysDisplayComponents}
            {
               <>
                   {props.additionalComponents}
                   {props.editableComponent}
                   <RemoveDialog id={props.updatableValue.id}
                                 setNewOrUpdated={props.setNewOrUpdated}
                                 remove={props.remove}
                   />
               </>
            }
        </>

    )
}

export default DataManagerButton;

