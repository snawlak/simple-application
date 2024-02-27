import { createSlice } from '@reduxjs/toolkit'

export interface SaveButtonReducerModel {
    readyToSave: boolean;
}

export const saveButtonSlice = createSlice({
    name: 'saveButton',
    initialState: {
        readyToSave: false,
    } as SaveButtonReducerModel,
    reducers: {
        canBeSaved: (state) => {
            state.readyToSave = true;
        },
        cannotBeSave: (state) => {
            state.readyToSave = false;
        },
    },
})

// Action creators are generated for each case reducer function
export const { canBeSaved, cannotBeSave } = saveButtonSlice.actions

export default saveButtonSlice.reducer
