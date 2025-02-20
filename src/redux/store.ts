import { configureStore } from "@reduxjs/toolkit";
import searchReducer from './slises/searchSlice';
import modelReducer from './slises/modelSlice';
import networkReducer from './slises/networkSlice';

export const store = configureStore({
    reducer: {
        search: searchReducer,
        model: modelReducer,
        network: networkReducer
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;