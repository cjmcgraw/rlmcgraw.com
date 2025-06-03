import React from 'react';
import ReactDOM from 'react-dom/client';
import {
    createBrowserRouter,
    RouterProvider,
} from 'react-router-dom';
import './index.scss';

// Import all your route components
import Root from './routes/root';
import ErrorPage from './routes/error-page';
import Login from './routes/login';
import About from './routes/about';
import { default as MusingsIndex, loader as musingsIndexLoader } from './routes/musings/index';
import { default as AlgorithmsMusings } from './routes/musings/algorithms';

// Create the router with all your routes
const router = createBrowserRouter([
    {
        path: '/',
        element: <Root />,
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,  // This shows the Welcome component at the root path
                element: null, // Root component will show Welcome by default
            },
            {
                path: 'login',
                element: <Login />,
            },
            {
                path: 'about',
                element: <About />,
            },
            {
                path: 'musings',
                element: <MusingsIndex />,
                loader: musingsIndexLoader,
            },
            {
                path: 'musings/algorithms',
                element: <AlgorithmsMusings />,
            },
        ],
    },
]);

// Mount the app to the DOM
ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);