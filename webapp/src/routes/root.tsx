import * as React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { ThemeProvider, CssBaseline, Box } from '@mui/material';
import { theme } from '../theme';
import SiteDrawer from '../components/SiteDrawer';
import LandingPage from '../components/LandingPage';

export default function Root() {
    const location = useLocation();
    
    // Check if we're on the home page
    const isHomePage = location.pathname === '/';
    
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Box sx={{ 
                minHeight: '100vh', 
                backgroundColor: theme.palette.background.default,
                display: 'flex',
                flexDirection: 'column'
            }}>
                {/* Navigation */}
                <SiteDrawer />
                
                {/* Main Content Area */}
                <Box component="main" sx={{ flex: 1 }}>
                    {isHomePage ? (<LandingPage />) : (<Outlet />)}
                </Box>
            </Box>
        </ThemeProvider>
    );
}