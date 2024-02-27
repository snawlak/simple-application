import { createSlice } from '@reduxjs/toolkit'

export interface MenuAnchorReducerModel {
    hide: boolean;
}

export const menuAnchorSlice = createSlice({
    name: 'menuAnchor',
    initialState: {
        hide: true,
    } as MenuAnchorReducerModel,
    reducers: {
        hideMenuAnchor: (state) => {
            state.hide = true;
        },
        openMenuAnchor: (state) => {
            state.hide = false;
        },
    },
})

// Action creators are generated for each case reducer function
export const { hideMenuAnchor, openMenuAnchor } = menuAnchorSlice.actions

export default menuAnchorSlice.reducer
