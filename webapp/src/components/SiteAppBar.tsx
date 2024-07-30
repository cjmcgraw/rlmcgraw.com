import { AppBar, Box, Divider, Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import * as React from 'react';



export default function SiteAppBar() {
    //console.log("why you looking dawg?");
    const [open, setOpen] = React.useState(false);

    const DrawerList = (
        <Box sx={{ width: 250 }} role="presentation" onClick={() => setOpen(false)}>
            <List>
                {['login'].map((text, index) => (
                    <ListItem key={text} disablePadding>
                    <ListItemButton>
                        {(text !== 'login') ? <div/> :  ( 
                            <ListItemIcon>
                                <AccountCircleIcon/>
                            </ListItemIcon>
                        )}
                        <ListItemText primary={text} />
                    </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <Divider />
            <List>
            {['musings'].map((text, index) => (
                <ListItem key={text} disablePadding>
                <ListItemButton>
                    <ListItemText primary={text} />
                </ListItemButton>
                </ListItem>
            ))}
            </List>
        </Box>
    );


    return (
        <Box>
            <AppBar>
                <Toolbar>
                    <IconButton
                        size='small'
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        onClick={() => setOpen(true)}
                    >
                        <MenuIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Drawer open={open} onClose={() => setOpen(false)}>
                {DrawerList}
            </Drawer>
        </Box>
    )
}