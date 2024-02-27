import DataTable from "../Table/DataTable";
import SubHeader, {SubHeaderProps} from "../Header/SubHeader";
import Box from "@mui/material/Box";
import {CircularProgress} from "@mui/material";
import styles from "../../Common/ComonStyles.module.css";
import {useCallback, useEffect, useState} from "react";
import {GridColDef} from "@mui/x-data-grid";

export interface DataContentProps {
    id?: string,
    getData: () => Promise<any []>;
    subHeaderProps: SubHeaderProps;
    columns: GridColDef[];
    columnsSetName: string; // for local storage
    setNewValueOrUpdated: (isNew: boolean) => void;
    valueNewOrUpdated: boolean;
}

const DataContent = (props: DataContentProps) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [data, setData] = useState<any []>([]);

    const fetchDataHandler = useCallback(async () => {
        let dataList = await props.getData();
        dataList = dataList.sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));
        setData(dataList || []);
        setLoading(false);
    }, []);

    useEffect(() => {
        setLoading(true);

        fetchDataHandler();

        props.setNewValueOrUpdated(false);
    }, [fetchDataHandler, props.valueNewOrUpdated]);

    const getColumns = (): GridColDef[] => {
        return props.columns;
    }

    function getBoxStyle() {
        return {
            width: '95% !important',
            height: '800px',
            bgcolor: 'white',
            margin: 'auto',
            padding: '2rem auto',
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center"
        };
    }

    return (
        <>
            <SubHeader title={props.subHeaderProps.title}
                       children={props.subHeaderProps.children}
            />
            {loading ?
                <Box sx={getBoxStyle()} className={styles['box']}>
                    <CircularProgress/>
                </Box>
                :
                <DataTable
                    key={'dataTable'}
                    data={data}
                    columns={getColumns()}
                    columnsSetName={props.columnsSetName}
                />
            }
        </>

    )
}

export default DataContent;
