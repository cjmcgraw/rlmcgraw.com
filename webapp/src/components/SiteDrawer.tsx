import { AppBar, BottomNavigation, BottomNavigationAction, Box, Button, Divider, Drawer, Fab, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography } from '@mui/material';
import ArticleIcon from '@mui/icons-material/Article';
import HomeIcon from '@mui/icons-material/Home';
import MenuIcon from '@mui/icons-material/Menu';
import AddIcon from '@mui/icons-material/Add';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import * as React from 'react';
import { useLocation, useNavigate } from 'react-router-dom'
import { ChevronLeftRounded } from '@mui/icons-material';


export default function SiteTray() {
    const navigate = useNavigate();
    const location = useLocation();
    const [width, setWidth] = React.useState(250);
    const [open, setOpen] = React.useState(false);


    const FloatingMenuButton = () => 
        open 
        ? (<React.Fragment />)
        : (
        <Fab 
            variant='circular'
            aria-label="menu"
            size='small'
            sx={{
                position: "fixed",
                top: theme => theme.spacing(1),
                left: theme => theme.spacing(1)
            }}
            onClick={() => setOpen(!open)}
        >
            <MenuIcon fontSize="inherit" />
        </Fab>
    );

    const MyMenuItem = ({name, icon, onClick}) => (
        <ListItem disablePadding={true}>
            <ListItemButton onClick={onClick}>
                {icon}
            </ListItemButton>
            <ListItemText primary={name} />
        </ListItem>
    );

    return (
        <Box>
            <FloatingMenuButton />
            <Drawer 
                open={open} 
                onClose={() => setOpen(false)}
            >
                <Box sx={{width}}>
                    <List>

                        <MyMenuItem 
                            name='close'
                            icon={<ChevronLeftRounded />}
                            onClick={() => setOpen(false)}
                        />
                        <Divider />

                        <MyMenuItem
                            name='login'
                            icon={<AccountCircleIcon />}
                            onClick={() => navigate('/login')}
                        />
                        <Divider />


                        <MyMenuItem
                            name='musings'
                            icon={<ArticleIcon />}
                            onClick={() => navigate('/musings')}
                        />
                    </List>
                </Box>
            </Drawer>
        </Box>
    )
}