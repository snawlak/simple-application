import { createSlice } from '@reduxjs/toolkit'

export interface LoaderReducerModel {
    load: boolean;
}

export const loaderSlice = createSlice({
    name: 'loader',
    initialState: {
        load: false,
    } as LoaderReducerModel,
    reducers: {
        startLoader: (state) => {
            state.load = true;
        },
        endLoader: (state) => {
            state.load = false;
        },
    },
})

// Action creators are generated for each case reducer function
export const { startLoader, endLoader } = loaderSlice.actions

export default loaderSlice.reducer
