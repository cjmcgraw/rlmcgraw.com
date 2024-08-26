import { AppBar, BottomNavigation, BottomNavigationAction, Box, Button, Divider, Drawer, Fab, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography } from '@mui/material';
import ArticleIcon from '@mui/icons-material/Article';
import HomeIcon from '@mui/icons-material/Home';
import MenuIcon from '@mui/icons-material/Menu';
import AddIcon from '@mui/icons-material/Add';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import * as React from 'react';
import { useLocation, useNavigate } from 'react-router-dom'
import { ChevronLeftRounded } from '@mui/icons-material';

export const userItems = {
    login: (
        <ListItemIcon>
            <AccountCircleIcon/>
        </ListItemIcon>
    )
}

export const navigationItems = {
    home: (
        <ListItemIcon>
            <HomeIcon />
        </ListItemIcon>
    ),
    musings: (
        <ListItemIcon>
            <ArticleIcon />
        </ListItemIcon>
    ),
}


export default function SiteTray() {
    const navigate = useNavigate();
    const location = useLocation();
    const [title] = location.pathname.split('/').filter(x => x)


    const [open, setOpen] = React.useState(false);

    const userListComponents = Object.entries(userItems)
        .map(([name, child], idx) => (
            <ListItem key={`${name}-${idx}`} disablePadding>
                <ListItemButton 
                    onClick={() => navigate(`/${name}`)}
                >
                    {child}
                    <ListItemText primary={name} />
                </ListItemButton>
            </ListItem>
        ));

    const navigationListComponents = Object.entries(navigationItems)
        .map(([name, child], idx) => (
            <ListItem key={`${name}-${idx}`} disablePadding>
            <ListItemButton
                onClick={() => navigate(`/${name}`)}
            >
                {child}
                <ListItemText primary={name}/>
            </ListItemButton>
            </ListItem>
        ));

    return (
        <Box>
            <Fab 
                color="secondary" 
                aria-label="menu"
                sx={{
                    position: "fixed",
                    bottom: theme => theme.spacing(2),
                    left: theme => theme.spacing(2),
                }}
                onClick={() => setOpen(!open)}
            >
                <MenuIcon />
            </Fab>
            <Drawer 
                PaperProps={{
                    sx: {
                        width: 250,
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between"
                    }
                }}
                open={open} 
                onClose={() => setOpen(false)}
            >
                <Box>
                    <List>
                        {userListComponents}
                    </List>

                    <Divider />
                    <List>
                        {navigationListComponents}
                    </List>
                    <Divider />
                </Box>
                <Box>
                    <Divider />
                    <List>
                        <ListItem disablePadding>
                            <ListItemButton onClick={() => setOpen(false)}>
                                <ListItemIcon>
                                    <ChevronLeftRounded />
                                </ListItemIcon>
                                <ListItemText primary='close' />
                            </ListItemButton>
                        </ListItem>
                    </List>
                </Box>
            </Drawer>
        </Box>
    )
}