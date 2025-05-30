import { Box, CircularProgress, Container, ThemeProvider, createTheme, alpha } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import SiteDrawer from './components/SiteDrawer';
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
import Musings from "./routes/musings/index";
import Login from "./routes/login";
import ErrorPage from './routes/error-page';

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#60a5fa',
        },
        secondary: {
            main: '#c084fc',
        },
        background: {
            default: '#0a0a0a',
            paper: '#1a1a1a',
        },
    },
    typography: {
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    },
    shape: {
        borderRadius: 12,
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: 'none',
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    backgroundImage: 'none',
                },
            },
        },
    },
});

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
                path: "musings",
                element: <Musings />,
            },
            {
                path: "login",
                element: <Login />,
            }
        ]
    },
]);

function HomePage() {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '80vh',
                textAlign: 'center',
                animation: 'fadeIn 0.6s ease-in',
                '@keyframes fadeIn': {
                    from: { opacity: 0, transform: 'translateY(20px)' },
                    to: { opacity: 1, transform: 'translateY(0)' },
                },
            }}
        >
            <Box
                component="h1"
                sx={{
                    fontSize: { xs: '3rem', md: '4rem' },
                    fontWeight: 700,
                    background: theme => `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    mb: 2,
                }}
            >
                rlmcgraw
            </Box>
            <Box
                component="p"
                sx={{
                    fontSize: '1.25rem',
                    color: 'text.secondary',
                    maxWidth: '600px',
                    mx: 'auto',
                }}
            >
                Welcome to my digital space
            </Box>
        </Box>
    );
}

export default function App({ children }: { children?: React.ReactNode }) {
    React.useEffect(() => {
        document.title = "rlmcgraw";
    }, []);

    return (
        <Box
            sx={{
                minHeight: '100vh',
                background: theme => `linear-gradient(to bottom, ${theme.palette.background.default}, ${alpha(theme.palette.primary.main, 0.02)})`,
                position: 'relative',
                overflow: 'hidden',
                '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: '-50%',
                    left: '-50%',
                    width: '200%',
                    height: '200%',
                    background: theme => `radial-gradient(circle at 20% 30%, ${alpha(theme.palette.primary.main, 0.05)} 0%, transparent 70%)`,
                    pointerEvents: 'none',
                },
                '&::after': {
                    content: '""',
                    position: 'absolute',
                    bottom: '-50%',
                    right: '-50%',
                    width: '200%',
                    height: '200%',
                    background: theme => `radial-gradient(circle at 80% 70%, ${alpha(theme.palette.secondary.main, 0.05)} 0%, transparent 70%)`,
                    pointerEvents: 'none',
                },
            }}
        >
            <SiteDrawer />
            
            <Container 
                maxWidth="lg" 
                sx={{ 
                    position: 'relative',
                    zIndex: 1,
                    pt: { xs: 10, md: 12 },
                    pb: 4,
                }}
            >
                {children ?? <Outlet context={{ theme: darkTheme }} />}
                {!children && !window.location.pathname.slice(1) && <HomePage />}
            </Container>
        </Box>
    );
}

document.body.innerHTML = '<div id="app"></div>';

ReactDOM.createRoot(document.getElementById('app')!).render(
    <React.StrictMode>
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <RouterProvider 
                router={router} 
                fallbackElement={
                    <Box 
                        sx={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'center', 
                            minHeight: '100vh' 
                        }}
                    >
                        <CircularProgress />
                    </Box>
                }
            />
        </ThemeProvider>
    </React.StrictMode>
);