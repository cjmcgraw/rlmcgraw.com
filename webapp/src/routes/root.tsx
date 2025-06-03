import * as React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { ThemeProvider, CssBaseline, Box } from '@mui/material';
import { theme } from '../theme';
import SiteDrawer from '../components/SiteDrawer';
import Welcome from '../components/Welcome';
import Musings from '../components/Musings';
import SEO from '../components/SEO';

export default function Root() {
    const location = useLocation();
    
    // Check if we're on the home page
    const isHomePage = location.pathname === '/';
    
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <SEO />
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
                    {isHomePage ? (
                        <>
                            <Welcome />
                            <Musings />
                        </>
                    ) : (
                        <Outlet />
                    )}
                </Box>
            </Box>
        </ThemeProvider>
    );
}