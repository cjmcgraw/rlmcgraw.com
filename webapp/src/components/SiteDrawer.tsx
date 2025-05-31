import { Box, Divider, Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography, useTheme, alpha, Collapse, TextField, InputAdornment } from '@mui/material';
import ArticleIcon from '@mui/icons-material/Article';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import HomeIcon from '@mui/icons-material/Home';
import CloseIcon from '@mui/icons-material/Close';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CircleIcon from '@mui/icons-material/Circle';
import SearchIcon from '@mui/icons-material/Search';
import * as React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { loadMusings, MusingMetadata } from '../utils/musingsLoader';

export default function SiteDrawer() {
    const navigate = useNavigate();
    const location = useLocation();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const [musingsOpen, setMusingsOpen] = React.useState(false);
    const [searchTerm, setSearchTerm] = React.useState('');
    const [musings, setMusings] = React.useState<MusingMetadata[]>([]);

    React.useEffect(() => {
        // Load musings dynamically
        const loadedMusings = loadMusings();
        setMusings(loadedMusings);
    }, []);

    const filteredMusings = musings.filter(musing => 
        musing.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        musing.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const isActive = (path: string) => location.pathname === path;
    const isMusingsActive = () => location.pathname.startsWith('/musings');

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
                    {/* Login at top */}
                    <ListItem disablePadding sx={{ mb: 0.5 }}>
                        <ListItemButton
                            onClick={() => {
                                navigate('/login');
                                setOpen(false);
                            }}
                            sx={{
                                borderRadius: 2,
                                backgroundColor: isActive('/login') 
                                    ? alpha(theme.palette.primary.main, 0.12)
                                    : 'transparent',
                                '&:hover': {
                                    backgroundColor: isActive('/login')
                                        ? alpha(theme.palette.primary.main, 0.16)
                                        : alpha(theme.palette.action.hover, 0.08),
                                },
                            }}
                        >
                            <ListItemIcon sx={{ 
                                minWidth: 40,
                                color: isActive('/login') 
                                    ? theme.palette.primary.main 
                                    : theme.palette.text.secondary 
                            }}>
                                <AccountCircleIcon />
                            </ListItemIcon>
                            <ListItemText 
                                primary="Login"
                                primaryTypographyProps={{
                                    fontWeight: isActive('/login') ? 600 : 400,
                                    color: isActive('/login') 
                                        ? theme.palette.primary.main 
                                        : theme.palette.text.primary
                                }}
                            />
                        </ListItemButton>
                    </ListItem>

                    <Divider sx={{ my: 2, opacity: 0.1 }} />

                    {/* Home */}
                    <ListItem disablePadding sx={{ mb: 0.5 }}>
                        <ListItemButton
                            onClick={() => {
                                navigate('/');
                                setOpen(false);
                            }}
                            sx={{
                                borderRadius: 2,
                                backgroundColor: isActive('/') 
                                    ? alpha(theme.palette.primary.main, 0.12)
                                    : 'transparent',
                                '&:hover': {
                                    backgroundColor: isActive('/')
                                        ? alpha(theme.palette.primary.main, 0.16)
                                        : alpha(theme.palette.action.hover, 0.08),
                                },
                            }}
                        >
                            <ListItemIcon sx={{ 
                                minWidth: 40,
                                color: isActive('/') 
                                    ? theme.palette.primary.main 
                                    : theme.palette.text.secondary 
                            }}>
                                <HomeIcon />
                            </ListItemIcon>
                            <ListItemText 
                                primary="Home"
                                primaryTypographyProps={{
                                    fontWeight: isActive('/') ? 600 : 400,
                                    color: isActive('/') 
                                        ? theme.palette.primary.main 
                                        : theme.palette.text.primary
                                }}
                            />
                        </ListItemButton>
                    </ListItem>

                    {/* Musings with expandable list */}
                    <ListItem disablePadding sx={{ mb: 0.5, flexDirection: 'column', alignItems: 'stretch' }}>
                        <ListItemButton
                            onClick={() => setMusingsOpen(!musingsOpen)}
                            sx={{
                                borderRadius: 2,
                                backgroundColor: isMusingsActive() 
                                    ? alpha(theme.palette.primary.main, 0.12)
                                    : 'transparent',
                                '&:hover': {
                                    backgroundColor: isMusingsActive()
                                        ? alpha(theme.palette.primary.main, 0.16)
                                        : alpha(theme.palette.action.hover, 0.08),
                                },
                            }}
                        >
                            <ListItemIcon sx={{ 
                                minWidth: 40,
                                color: isMusingsActive() 
                                    ? theme.palette.primary.main 
                                    : theme.palette.text.secondary 
                            }}>
                                <ArticleIcon />
                            </ListItemIcon>
                            <ListItemText 
                                primary="Musings"
                                primaryTypographyProps={{
                                    fontWeight: isMusingsActive() ? 600 : 400,
                                    color: isMusingsActive() 
                                        ? theme.palette.primary.main 
                                        : theme.palette.text.primary
                                }}
                            />
                            {musingsOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                        </ListItemButton>
                        
                        <Collapse in={musingsOpen} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding sx={{ pl: 2 }}>
                                <ListItem sx={{ px: 2, pb: 1 }}>
                                    <TextField
                                        fullWidth
                                        size="small"
                                        placeholder="Search musings..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <SearchIcon sx={{ fontSize: 18, color: 'text.secondary' }} />
                                                </InputAdornment>
                                            ),
                                        }}
                                        sx={{
                                            '& .MuiOutlinedInput-root': {
                                                backgroundColor: alpha(theme.palette.background.default, 0.5),
                                                '& fieldset': {
                                                    borderColor: alpha(theme.palette.divider, 0.1),
                                                },
                                                '&:hover fieldset': {
                                                    borderColor: alpha(theme.palette.primary.main, 0.3),
                                                },
                                            },
                                        }}
                                    />
                                </ListItem>
                                {filteredMusings.length > 0 ? (
                                    filteredMusings.map((musing) => (
                                        <ListItem key={musing.path} disablePadding>
                                            <ListItemButton
                                                onClick={() => {
                                                    navigate(musing.path);
                                                    setOpen(false);
                                                    setSearchTerm('');
                                                }}
                                                sx={{
                                                    borderRadius: 2,
                                                    py: 0.75,
                                                    backgroundColor: isActive(musing.path) 
                                                        ? alpha(theme.palette.primary.main, 0.08)
                                                        : 'transparent',
                                                    '&:hover': {
                                                        backgroundColor: alpha(theme.palette.action.hover, 0.08),
                                                    },
                                                }}
                                            >
                                                <ListItemIcon sx={{ minWidth: 30 }}>
                                                    <CircleIcon sx={{ fontSize: 8, color: theme.palette.text.secondary }} />
                                                </ListItemIcon>
                                                <ListItemText 
                                                    primary={musing.title}
                                                    primaryTypographyProps={{
                                                        fontSize: '0.9rem',
                                                        fontWeight: isActive(musing.path) ? 500 : 400,
                                                        color: isActive(musing.path) 
                                                            ? theme.palette.primary.main 
                                                            : theme.palette.text.secondary
                                                    }}
                                                />
                                            </ListItemButton>
                                        </ListItem>
                                    ))
                                ) : (
                                    <ListItem>
                                        <ListItemText 
                                            primary="No musings found"
                                            primaryTypographyProps={{
                                                fontSize: '0.85rem',
                                                color: 'text.secondary',
                                                textAlign: 'center'
                                            }}
                                        />
                                    </ListItem>
                                )}
                            </List>
                        </Collapse>
                    </ListItem>
                </List>
            </Drawer>
        </>
    );
}