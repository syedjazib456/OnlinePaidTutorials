import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'
import './index.css'
import { AuthProvider } from './store/Auth';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

    <AuthProvider>
        <App />
        <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light" //theme colored or light
            transition:Bounce
           

        />
    </AuthProvider>
);