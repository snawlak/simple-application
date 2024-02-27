import {useState} from "react";
import DataContent from "../Common/Dictionary/DataContent";
import {ReactJSXElement} from "@emotion/react/types/jsx-namespace";
import Labels from "../../constants/Labels";
import {addContractor, editContractor, getContractors, removeContractor} from "../../api/apiContractors";
import AddContentModal from "../Common/Modal/AddContentModal";
import {EMPTY_CONTRACTOR} from "../../helpers/EmptyValuesHelper";
import DataManagerButton from "../Common/Button/DataManagerButton";
import EditIconButtonModal from "../Common/Modal/EditIconButtonModal";
import {ContractorDto} from "../../models/contractor/ContractorDto";
import EditableContractors from "./EditableContractors";
import {getContractorColumns} from "../../helpers/DataColumnsHelper";
import {getContractorValidationMsg} from "../../helpers/ValidationHelper";

const Contractors = () => {
    const [dataNewOrUpdated, setNewDataOrUpdate] = useState<boolean>(false);

    const getAddContent = (value: ContractorDto,
                           setNewValue: (newValue: ContractorDto) => void,): ReactJSXElement => {
        return <EditableContractors value={value} setNewValue={setNewValue}/>
    }

    const getManagerContent = (row: any): ReactJSXElement => {
        return <DataManagerButton updatableValue={row}
                                  setNewOrUpdated={setNewDataOrUpdate}
                                  remove={removeContractor}
                                  editableComponent={
                                       <EditIconButtonModal
                                           edit={editContractor}
                                           value={row}
                                           getContent={getAddContent}
                                           setNewUnprocessedOrderOrUpdate={setNewDataOrUpdate}
                                           getValidationMsg={getContractorValidationMsg}
                                       />
                                   }
        />
    }

    const getSubheaderChildren = (): ReactJSXElement [] => {
        return [
            <AddContentModal
                key={'Contractors'}
                setNewValue={setNewDataOrUpdate}
                emptyValue={EMPTY_CONTRACTOR}
                getContent={getAddContent}
                addNewValue={addContractor}
                getValidationMsg={getContractorValidationMsg}
            />
        ];
    }

    return (
        <DataContent
            key={'Contractors'}
            subHeaderProps={{
                title: Labels.CONTRACTORS,
                children: getSubheaderChildren()
            }}
            columns={getContractorColumns(getManagerContent)}
            columnsSetName={'contractorsColumns'}
            getData={async () => getContractors()}
            valueNewOrUpdated={dataNewOrUpdated}
            setNewValueOrUpdated={setNewDataOrUpdate}
        />
    )
}

export default Contractors;
