import '../main.global.css'
import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Page404 } from '../features/Page404';
import { Statistic } from '../../src/features/StatisticPage';
import store, { persistor } from '../store/store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ModalSetting } from '../features/Modal/ModalSettings/ModalSettings';
import { Layout } from '../features/Common/Layout';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <Suspense fallback='Loading...'>
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <Router>
                        <Layout>
                            <Routes>
                                <Route path="/" element={<App />}>
                                    <Route path="settings" element={<ModalSetting />} />
                                </Route>
                                <Route path="statistic" element={<Statistic />}>
                                    <Route path="settings" element={<ModalSetting />} />
                                </Route>
                                <Route path="*" element={<Page404 />} />
                            </Routes>
                        </Layout>
                    </Router> 
                </PersistGate>
            </Provider>
        </Suspense>
    </React.StrictMode>
)