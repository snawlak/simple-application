import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import {Link} from "react-router-dom";
import Pages from "../../../constants/Pages";
import Labels from "../../../constants/Labels";
import Box from '@mui/material/Box';
import styles from './Header.module.css'

const Header = () => {
    return (
        <Box sx={{flexGrow: 1}} className={styles['a']}>
            <AppBar position="static" style={{background: '#192a56', height: "65px"}}>
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1, fontWeight: 600}}>
                        {Labels.APP_TITLE}
                    </Typography>
                    <>
                        <Link to={Pages.CONTRACTORS}>{Labels.CONTRACTORS}</Link>
                        <Link to={Pages.REPORT}>{Labels.REPORTS}</Link>
                    </>
                </Toolbar>
            </AppBar>
        </Box>
    );
}

export default Header;
