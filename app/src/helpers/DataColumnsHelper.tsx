import {GridColDef, GridValueFormatterParams, GridValueGetterParams} from "@mui/x-data-grid";
import Labels from "../constants/Labels";
import ManagerButton from "../components/Common/Button/ManagerButton";
import {ReactJSXElement} from "@emotion/react/types/jsx-namespace";

export const getContractorColumns = (managerContent: (row: any) => ReactJSXElement): GridColDef[] => {
    const columns = getColumnsForContractors();
    columns.unshift(getManagerColumn(managerContent))
    return columns;
}

const getColumnsForContractors = (): GridColDef[] => {
    return [
        {
            field: 'name',
            headerName: Labels.NAME,
            width: 420,
        },
        {
            field: 'nip',
            headerName: Labels.NIP,
            width: 100,
        },
        {
            field: 'address',
            headerName: Labels.ADDRESS,
            width: 280,
        },
        {
            field: 'phoneNumber',
            headerName: Labels.PHONE_NUMBER,
            width: 160,
        },
        {
            field: 'email',
            headerName: Labels.EMAIL,
            width: 280,
        },
    ];
}

const getManagerColumn = (managerContent: (row: any) => ReactJSXElement): any => {
    return {
        field: 'manager',
        headerName: '',
        // @ts-ignore
        disableColumnMenu: true,
        sortable: false,
        width: 25,
        // @ts-ignore
        renderCell: (params) => {
            return (
                <ManagerButton content={managerContent(params.row)}/>
            )
        }
    }
}
