import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'react-toastify/dist/ReactToastify.css';

import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './reduxStore/store';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n'; // Ensure correct import for i18n
import resources from './i18n/resources'; // Import your language resources
import { ToastContainer } from 'react-toastify';

// Initialize i18next with resources
i18n.init({
    interpolation: { escapeValue: false },
    lng: 'vn', // Set default language
    resources, // Use the imported resources
});

// Create the root for React DOM
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the app
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <I18nextProvider i18n={i18n}>
                    <ToastContainer></ToastContainer>

                    <Router>
                        <App />
                    </Router>
                </I18nextProvider>
            </PersistGate>
        </Provider>
    </React.StrictMode>
);
