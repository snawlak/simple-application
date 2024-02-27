import {ReactJSXElement} from "@emotion/react/types/jsx-namespace";
import subHeaderStyles from "./SubHeader.module.css"
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

export interface SubHeaderProps {
    title: string
    subTitle?: string
    children?: ReactJSXElement []
}

const SubHeader = (props: SubHeaderProps) => {

    return (
        <Box
            display="flex"
            className={subHeaderStyles['sub-header']}
            justifyContent="center"
            alignItems="center"
            minHeight="10vh"
            style={{marginBottom: "2rem", zIndex: '100', backgroundColor: "#f1f1f1", position: "relative"}}
        >
             <Grid container={true}
                  direction="column"
                  justifyContent="center"
                  alignItems="center"
                  className={subHeaderStyles['sub-header']}>
                <Grid item={true} xs={8} textAlign="center" className={subHeaderStyles['title-buttons']} direction="column" container={true} >
                        <h1>{props.title}</h1>
                    {props.subTitle && <p style={{alignItems: 'center', textAlign: 'center', justifyContent: 'center', marginTop: '0px'}}>{props.subTitle}</p>}
                </Grid>
                 <Grid item={true} xs={4} textAlign="center" className={subHeaderStyles['title-buttons']}>
                     {props.children}
                 </Grid>
            </Grid>
        </Box>

    );
}

export default SubHeader;
