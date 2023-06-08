import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER, } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import tasksReducer from "./reducers/tasksSlice";
import configReduser from "./reducers/configSlice";
import timerReduser from "./reducers/timerSlice";

export const rootReducer = combineReducers({
    tasks: persistReducer({
        key: 'tasks',
        storage,
    }, tasksReducer),
    
    config: persistReducer({
        key: 'config',
        storage,
    }, configReduser),

    timer: persistReducer({
        key: 'timer',
        storage,
    }, timerReduser),
});

const persistConfig = {
    key: 'root',
    storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
    }),
});

export const persistor = persistStore(store);
export default store;