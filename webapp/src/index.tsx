import { AppBar, Box, CircularProgress, Container } from '@mui/material';
import { ThemeProvider, createTheme, styled } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import SiteAppBar from './components/SiteAppBar';
import { BrowserRouter, createBrowserRouter, Router, RouterProvider } from 'react-router-dom';
import Musings from "./components/Musings";
import WelcomePage from './components/WelcomePage';

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    }
})

const router = createBrowserRouter([
    {
        path: "/",
        element: <WelcomePage />,
    },
    {
        path: "/musings",
        element: <Musings />,
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

const Offset = styled('div')(({ theme }) => theme.mixins.toolbar);

export default function App({ defaultTitle, children }) {
    const router = children?.router;

    const title = router?.basename
        ? router.basename.split("/")[0].strip()
        : null;

    React.useEffect(() => {
        document.title = title || defaultTitle;
    }, []);


    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <Box {...boxProps}>
                <SiteAppBar title={title} />
                <Offset />

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
    <React.StrictMode>
        <BrowserRouter router={router}>
            <App defaultTitle="rlmcgraw.com">
                <RouterProvider 
                    router={router} 
                    fallbackElement={<CircularProgress />}
                />
            </App>
        </BrowserRouter>
    </React.StrictMode>
);
