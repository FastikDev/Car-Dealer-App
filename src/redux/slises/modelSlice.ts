import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface modelState {
    name: string;
}

const initialState: modelState = {
    name: ''
}

const modelSlice = createSlice({
    name: 'model',
    initialState,
    reducers: {
        setModelName(state, action: PayloadAction<string>) {
            state.name = action.payload;
        },
    },
})

export const { setModelName } = modelSlice.actions;
export default modelSlice.reducer;