import { AppBar, Box, Divider, Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import * as React from 'react';
import { useNavigate } from 'react-router-dom'


export const userItems = {
    login: (
        <ListItemIcon>
            <AccountCircleIcon/>
        </ListItemIcon>
    )
}

export const navigationItems = {
    musings: <React.Fragment/>,
}


export default function SiteAppBar({ title }) {
    const navigate = useNavigate();
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

    const titleMaybe = !title
        ? <React.Fragment />
        : (
            <Typography
                variant='h6'
                component= 'div'
            >
                {title}
            </Typography>
        )


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
                        {titleMaybe}
                    </Box>
                </Toolbar>
            </AppBar>
            <Drawer open={open} onClose={() => setOpen(false)}>
                {DrawerList}
            </Drawer>
        </Box>
    )
}