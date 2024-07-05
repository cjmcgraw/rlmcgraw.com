import { AppBar, Box, Divider, Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar } from '@mui/material';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import * as React from 'react';



export default function SiteAppBar() {
    console.log("whaddup");
    const [open, setOpen] = React.useState(false);

    const DrawerList = (
        <Box sx={{ width: 250 }} role="presentation" onClick={() => setOpen(false)}>
            <List>
                {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                    <ListItem key={text} disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                        {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                        </ListItemIcon>
                        <ListItemText primary={text} />
                    </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <Divider />
            <List>
            {['All mail', 'Trash', 'Spam'].map((text, index) => (
                <ListItem key={text} disablePadding>
                <ListItemButton>
                    <ListItemIcon>
                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                    </ListItemIcon>
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