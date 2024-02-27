import React, {Fragment} from 'react';
import './App.css';
import {Route, Routes} from "react-router-dom";
import Pages from "./constants/Pages";
import Header from "./components/Common/Header/Header";
import {setApiBaseUrl} from "./api/apiService";
import Contractors from "./components/Contractors/Contractors";
import AppSnackbar from "./components/Common/Snackbar/AppSnackbar";
import {Provider} from "react-redux";
import store from './common/StoreReducer'
import Reports from "./components/Reports/Reports";

export interface AppProps {
    apiUrl: string;
}

function App(props: AppProps) {
    setApiBaseUrl(props.apiUrl);

    return (
        <Provider store={store}>
            <Fragment>
                <Header/>
                <AppSnackbar/>
                <Routes>
                    <Route path={Pages.DEFAULT} element={<Contractors/>}/>
                    <Route path={Pages.CONTRACTORS} element={<Contractors/>}/>
                    <Route path={Pages.REPORT} element={<Reports/>}/>
                </Routes>
            </Fragment>
        </Provider>
    );
}

export default App;
