import {  Box, Divider, Drawer, Fab, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import ArticleIcon from '@mui/icons-material/Article';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import * as React from 'react';
import { useNavigate } from 'react-router-dom'
import { ChevronLeftRounded } from '@mui/icons-material';


export default function SiteTray() {
    const navigate = useNavigate();
    const [width, setWidth] = React.useState(250);
    const [open, setOpen] = React.useState(false);


    const FloatingMenuButton = () => 
        open 
        ? (<React.Fragment />)
        : (
        <Fab 
            variant='circular'
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
        <ListItem>
            <ListItemButton onClick={onClick}>
                <ListItemIcon>
                    {icon}
                </ListItemIcon>
                <ListItemText primary={name} />
            </ListItemButton>
        </ListItem>
    );


    return (
        <Box>
            <FloatingMenuButton />
            <Drawer 
                open={open} 
                onClose={() => setOpen(false)}
            >
                <Box width={width}>
                    <List
                        sx={{
                            display: 'flex',
                            flexDirection: "column",
                            justifyContent: "space-evenly"
                        }}
                    >

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