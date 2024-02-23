import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/auth';
import tasksReducer from './slices/tasks';

export const makeStore = () => {
    return configureStore({
        reducer: {
            auth: authReducer,
            tasks: tasksReducer,
        },
    });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
