import Box from '@mui/material/Box';
import {DataGrid, GridCellParams, GridColDef, GridToolbar, plPL} from '@mui/x-data-grid';
import styles from "../../Common/ComonStyles.module.css";


export interface DataTableProps {
    data: any[];
    columns: GridColDef[];
    columnsSetName: string; // for local storage
}


const DataTable = (props: DataTableProps) => {
    const getColumnVisibility = () => {
        const columns = localStorage.getItem(props.columnsSetName); // 'prodLineColumns' do zapisu jak ktoś zamknął czy coś
        if (columns === null) {
            return {
                amountNett: false,
                signedDate: false
            }
        }
        return JSON.parse(columns);
    }

    function getBoxStyles() {
        return {
            height: 690,
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            '& .blank': {
                backgroundColor: '#f1f1f1',
                color: '#f1f1f1',
            },
            '& .blank-delayed': {
                backgroundColor: '#F97A7A',
                '&:hover': {
                    backgroundColor: '#F97A7A',
                },
            },
            '& .blank-expired': {
                backgroundColor: '#E0E0E0',
                '&:hover': {
                    backgroundColor: '#E0E0E0',
                },
            }
        };
    }

    function getDataGridStyles() {
        return {
            "& .MuiDataGrid-columnHeaderTitle": {
                whiteSpace: "normal",
                lineHeight: "normal",
                fontWeight: 'bold !important',
            },
            "& .MuiDataGrid-columnHeader": {
                // Forced to use important since overriding inline styles
                height: "unset !important"
            },
            "& .MuiDataGrid-columnHeaders": {
                // Forced to use important since overriding inline styles
                maxHeight: "168px !important"
            },
            '.end-soon-theme--true': {
                backgroundColor: '#F97A7A',
                '&:hover': {
                    backgroundColor: '#F97A7A',
                },
            },
            '& .blank-expired--true': {
                backgroundColor: '#E0E0E0',
                '&:hover': {
                    backgroundColor: '#E0E0E0',
                },
            },
            fontSize: '0.8rem'
        };
    }

    function getInitialState() {
        return {
            columns: {
                columnVisibilityModel: getColumnVisibility(),
            },
            pagination: { paginationModel: { pageSize: 15 } },
        };
    }

    const isEndSoon = (row: any): boolean => {
        if (!!row.endDate) {
            let endDate = new Date(row.endDate);
            const currentDate = new Date();
            if (currentDate >= endDate) {
                return false;
            }

            if ((endDate.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24) <= 60) {
                return true;
            }
        }
        return false;
    }

    const isExpired = (row: any): boolean => {
        if (!!row.endDate) {
            let endDate = new Date(row.endDate);
            const currentDate = new Date();
            if (currentDate >= endDate) {
                return true;
            }
        }
        return false;
    }
    function getToolbarSlotProps() {
        return {
            toolbar: {
                printOptions: {
                    hideToolbar: true,
                    hideFooter: true,
                    disableToolbarButton: true
                },
            },
        };
    }

    return (
        <Box sx={{width: '80%', bgcolor: 'white', margin: 'auto', padding: '2rem auto'}} className={styles['box']}>
            <Box sx={getBoxStyles()}>
                {props.data.length > 0 ?
                    <DataGrid
                        density="compact"
                        initialState={getInitialState()}
                        sx={getDataGridStyles()}
                        localeText={plPL.components.MuiDataGrid.defaultProps.localeText}
                        rows={props.data}
                        columns={props.columns}
                        pageSizeOptions={[15, 50, 100]}
                        onColumnVisibilityModelChange={(col) => {
                            localStorage.setItem(props.columnsSetName, JSON.stringify(col));
                        }}
                        getRowClassName={(params: any) => `end-soon-theme--${isEndSoon(params.row)} blank-expired--${isExpired(params.row)}`}
                        getCellClassName={(params: GridCellParams<any, any, number>) => {
                            if (isEndSoon(params.row)) {
                                return 'blank-delayed';
                            } if ((isExpired(params.row))) {
                                return 'blank-expired'
                            }
                            return '';
                        }}
                        slots={{ toolbar: GridToolbar }}
                        slotProps={getToolbarSlotProps()}
                        disableRowSelectionOnClick
                    /> :
                    <h1>No data</h1>
                }
            </Box>
        </Box>
    )
}

export default DataTable;
