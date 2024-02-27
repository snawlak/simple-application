import {configureStore} from '@reduxjs/toolkit'
import snackbarReducer from './snackbarSlice'
import loaderReducer from './loadingSlice'
import saveButton from './saveButtonSlice'
import menuAnchor from './menuAnchorSlice'

export default configureStore({
    reducer: {
        snackbar: snackbarReducer,
        loader: loaderReducer,
        saveButton: saveButton,
        menuAnchor: menuAnchor,
    },
})
