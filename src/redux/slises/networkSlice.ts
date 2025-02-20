import { createSlice ,PayloadAction } from "@reduxjs/toolkit";

interface networkState {
    status: boolean
}

const initialState: networkState = {
    status: navigator.onLine
}

const networkSlice = createSlice({
    name: 'network',
    initialState,
    reducers: {
        setOnline(state) {
            state.status = true;
        },
        setOffline(state) {
            state.status = false
        },
    },
});

export const { setOnline, setOffline } = networkSlice.actions;
export default networkSlice.reducer ;