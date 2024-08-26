import { AppBar, Box, Divider, Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography } from '@mui/material';
import ArticleIcon from '@mui/icons-material/Article';
import HomeIcon from '@mui/icons-material/Home';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import * as React from 'react';
import { useLocation, useNavigate } from 'react-router-dom'


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


export default function SiteAppBar() {
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

    const DrawerList = (
        <Box sx={{ width: 250 }} onClick={() => setOpen(false)}>
            <List>
                {userListComponents}
            </List>

            <Divider />
            <List>
                {navigationListComponents}
            </List>
        </Box>
    );

    return (
        <Box>
            <AppBar>
                <Toolbar>
                    <Box
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                    >
                        <IconButton
                            size='small'
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            onClick={() => setOpen(true)}
                        >
                            <MenuIcon />
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>
            <Drawer open={open} onClose={() => setOpen(false)}>
                {DrawerList}
            </Drawer>
        </Box>
    )
}