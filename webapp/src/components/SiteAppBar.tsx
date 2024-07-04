import { AppBar, Box, IconButton, Toolbar } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import * as React from 'react';

export default function SiteAppBar() {
    return (
        <Box>
            <AppBar position='static'>
                <Toolbar>
                    <IconButton
                        size='large'
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                    >
                        <MenuIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
        </Box>
    )
}