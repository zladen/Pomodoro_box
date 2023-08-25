import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { 
    persistReducer, 
    persistStore, 
    FLUSH, 
    REHYDRATE, 
    PAUSE, 
    PERSIST, 
    PURGE, 
    REGISTER
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import tasksReducer from "./reducers/tasksSlice";
import configReduser from "./reducers/configSlice";
import timerReduser from "./reducers/timerSlice";
import historyReduser from "./reducers/historySlice";

export const rootReducer = combineReducers({
    tasks: persistReducer({
        key: 'tasks',
        storage,
        keyPrefix: '',
    }, tasksReducer),
    
    config: persistReducer({
        key: 'config',
        storage,
        keyPrefix: ''
    }, configReduser),

    timer: persistReducer({
        key: 'timer',
        storage,
        keyPrefix: '',
    }, timerReduser),

    history: persistReducer({
        key: 'history',
        storage,
        keyPrefix: '',
    }, historyReduser),
});

const persistConfig = {
    key: 'root',
    storage,
    keyPrefix: '',
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