import { createSlice } from '@reduxjs/toolkit'

export interface SnackbarReducerModel {
    success: boolean,
    error: boolean,
    msg: string
}

export const snackbarSlice = createSlice({
    name: 'snackbar',
    initialState: {
        success: false,
        error: false,
        msg: '',
    } as SnackbarReducerModel,
    reducers: {
        successSnackbar: (state, action) => {
            state.success = true
            state.error = false
            state.msg = action.payload
        },
        errorSnackbar: (state, action) => {
            state.success = false
            state.error = true
            state.msg = action.payload
        },
        clearSnackbar: (state) => {
            state.success = false
            state.error = false
            state.msg = ''
        },
    },
})

// Action creators are generated for each case reducer function
export const { successSnackbar, errorSnackbar, clearSnackbar } = snackbarSlice.actions

export default snackbarSlice.reducer
