import { AppBar, Box, Container } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import SiteAppBar from './components/SiteAppBar';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Musings from "./components/Musings";

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    }
})

const router = createBrowserRouter([
    {
        path: "/",
        element: <Musings/>,
    }
])

const boxProps = {
    sx: {
        display: 'flex',
        flexDirection: 'column',
        bgcolor: 'background.paper',
        borderRadius: 1,
    }
}

export default function App({children}) {
    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <Box {...boxProps}>
                <SiteAppBar/>

                <Container>
                    {children}
                </Container>
            </Box>
        </ThemeProvider>
    );
}

document.body.innerHTML = '<div id="app"></div>'

ReactDOM
.createRoot(document.getElementById('app'))
.render(
    <App>
        <RouterProvider router={router} />
    </App>
);
