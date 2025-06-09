import { Box, CircularProgress, Container } from '@mui/material';
import { ThemeProvider, createTheme, styled } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import SiteDrawer from './components/SiteDrawer';
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Musings from "./routes/musings/index";
import MusingPage from "./routes/musings/MusingPage";
import Root from './routes/root';
import ErrorPage from './routes/error-page';
import About from './routes/about';  // Add this import
import Login from './routes/login';  // Add this import

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    }
})

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: (
            <App>
                <ErrorPage />
            </App>
        ),
        children: [
            {
                index: true,
                element: <Root />,
            },
            {
                path: "about",          // Add this route
                element: <About />,
            },
            {
                path: "login",          // Add this route
                element: <Login />,
            },
            {
                path: "musings",
                children: [
                    {
                        index: true,
                        element: <Musings />,
                    },
                    {
                        path: ":slug",
                        element: <MusingPage />,
                    }
                ]
            }
        ]
    },
])

const boxProps = {
    sx: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        bgcolor: 'background.paper',
        borderRadius: 1,
    }
}

const Offset = styled('div')(({ theme }) => theme.mixins.toolbar);

export default function App(props?) {
    React.useEffect(() => {
        document.title = "rlmcgraw"
    }, []);

    return (
        <Box {...boxProps}>
            <SiteDrawer />
            <Offset />

            <Box
                sx={{
                    display: "flex",
                    alignItems: 'center',
                    bgcolor: 'background.paper',
                    borderRadius: theme => theme.spacing(5)
                }}
            >
                {props?.children ?? <Outlet/>}
            </Box>
        </Box>
    );
}

document.body.innerHTML = '<div id="app"></div>'

ReactDOM
.createRoot(document.getElementById('app'))
.render(
    <React.StrictMode>
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <RouterProvider 
                router={router} 
                fallbackElement={<CircularProgress />}
            />
        </ThemeProvider>
    </React.StrictMode>
);