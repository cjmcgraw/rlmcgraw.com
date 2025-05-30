import { Box, Divider, Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography, useTheme, alpha } from '@mui/material';
import ArticleIcon from '@mui/icons-material/Article';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import HomeIcon from '@mui/icons-material/Home';
import CloseIcon from '@mui/icons-material/Close';
import * as React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function SiteDrawer() {
    const navigate = useNavigate();
    const location = useLocation();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);

    const menuItems = [
        { name: 'Home', icon: <HomeIcon />, path: '/' },
        { name: 'Musings', icon: <ArticleIcon />, path: '/musings' },
        { name: 'Login', icon: <AccountCircleIcon />, path: '/login' },
    ];

    const isActive = (path: string) => location.pathname === path;

    return (
        <>
            <IconButton
                aria-label="menu"
                onClick={() => setOpen(true)}
                sx={{
                    position: 'fixed',
                    top: 16,
                    left: 16,
                    backgroundColor: alpha(theme.palette.background.paper, 0.9),
                    backdropFilter: 'blur(10px)',
                    zIndex: theme.zIndex.drawer + 2,
                    '&:hover': {
                        backgroundColor: alpha(theme.palette.background.paper, 1),
                        transform: 'scale(1.05)',
                    },
                    transition: 'all 0.2s ease-in-out',
                    display: open ? 'none' : 'flex',
                }}
            >
                <MenuIcon />
            </IconButton>

            <Drawer 
                open={open} 
                onClose={() => setOpen(false)}
                PaperProps={{
                    sx: {
                        width: 280,
                        backgroundColor: alpha(theme.palette.background.paper, 0.95),
                        backdropFilter: 'blur(20px)',
                    }
                }}
            >
                <Box sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        rlmcgraw
                    </Typography>
                    <IconButton onClick={() => setOpen(false)} size="small">
                        <CloseIcon />
                    </IconButton>
                </Box>
                
                <Divider sx={{ opacity: 0.1 }} />
                
                <List sx={{ px: 1, py: 2 }}>
                    {menuItems.map((item) => (
                        <ListItem key={item.path} disablePadding sx={{ mb: 0.5 }}>
                            <ListItemButton
                                onClick={() => {
                                    navigate(item.path);
                                    setOpen(false);
                                }}
                                sx={{
                                    borderRadius: 2,
                                    backgroundColor: isActive(item.path) 
                                        ? alpha(theme.palette.primary.main, 0.12)
                                        : 'transparent',
                                    '&:hover': {
                                        backgroundColor: isActive(item.path)
                                            ? alpha(theme.palette.primary.main, 0.16)
                                            : alpha(theme.palette.action.hover, 0.08),
                                    },
                                }}
                            >
                                <ListItemIcon sx={{ 
                                    minWidth: 40,
                                    color: isActive(item.path) 
                                        ? theme.palette.primary.main 
                                        : theme.palette.text.secondary 
                                }}>
                                    {item.icon}
                                </ListItemIcon>
                                <ListItemText 
                                    primary={item.name}
                                    primaryTypographyProps={{
                                        fontWeight: isActive(item.path) ? 600 : 400,
                                        color: isActive(item.path) 
                                            ? theme.palette.primary.main 
                                            : theme.palette.text.primary
                                    }}
                                />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Drawer>
        </>
    );
}