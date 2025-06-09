import { 
    Box, 
    Divider, 
    Drawer, 
    Fab,
    Typography,
    useTheme,
    alpha
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import InfoIcon from '@mui/icons-material/Info';
import ArticleIcon from '@mui/icons-material/Article';
import EmailIcon from '@mui/icons-material/Email';
import { ChevronLeftRounded } from '@mui/icons-material';
import * as React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { DrawerMenuItem, MusingsSection } from './drawer';

export default function SiteDrawer() {
    const navigate = useNavigate();
    const location = useLocation();
    const theme = useTheme();
    const [width] = React.useState(380);
    const [open, setOpen] = React.useState(false);

    const handleClose = () => setOpen(false);
    const handleOpen = () => setOpen(true);

    const handleNavigation = (path: string) => {
        navigate(path);
        handleClose();
    };

    const isActive = (path: string) => location.pathname === path;

    const NavigationItem = ({ 
        name, 
        icon, 
        path, 
        external = false 
    }: { 
        name: string; 
        icon: React.ReactElement; 
        path: string; 
        external?: boolean;
    }) => (
        <Box
            component={external ? 'a' : 'button'}
            href={external ? path : undefined}
            onClick={external ? undefined : () => handleNavigation(path)}
            sx={{
                display: 'flex',
                alignItems: 'center',
                width: '100%',
                p: 2,
                border: 'none',
                background: 'none',
                cursor: 'pointer',
                borderRadius: 2,
                textDecoration: 'none',
                color: 'inherit',
                transition: 'all 0.2s ease',
                backgroundColor: isActive(path) ? alpha(theme.palette.primary.main, 0.1) : 'transparent',
                borderLeft: isActive(path) ? `4px solid ${theme.palette.primary.main}` : '4px solid transparent',
                '&:hover': {
                    backgroundColor: alpha(theme.palette.primary.main, 0.08),
                    transform: 'translateX(4px)',
                },
                '&:active': {
                    transform: 'translateX(2px)',
                }
            }}
        >
            <Box 
                sx={{ 
                    mr: 2, 
                    color: isActive(path) ? theme.palette.primary.main : theme.palette.text.secondary,
                    transition: 'color 0.2s ease',
                }}
            >
                {icon}
            </Box>
            <Typography 
                variant="body1" 
                sx={{ 
                    fontWeight: isActive(path) ? 600 : 400,
                    color: isActive(path) ? theme.palette.primary.main : theme.palette.text.primary,
                    transition: 'all 0.2s ease',
                }}
            >
                {name}
            </Typography>
        </Box>
    );

    return (
        <Box>
            {!open && (
                <Fab 
                    variant='circular'
                    size='medium'
                    sx={{
                        position: "fixed",
                        top: theme => theme.spacing(2),
                        left: theme => theme.spacing(2),
                        zIndex: theme.zIndex.drawer + 1,
                        backgroundColor: alpha(theme.palette.background.paper, 0.95),
                        backdropFilter: 'blur(15px)',
                        border: `1px solid ${alpha(theme.palette.divider, 0.2)}`,
                        color: theme.palette.text.primary,
                        boxShadow: `0 8px 32px ${alpha(theme.palette.common.black, 0.2)}`,
                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                        '&:hover': {
                            backgroundColor: alpha(theme.palette.primary.main, 0.1),
                            borderColor: alpha(theme.palette.primary.main, 0.3),
                            boxShadow: `0 12px 40px ${alpha(theme.palette.primary.main, 0.15)}`,
                            transform: 'translateY(-3px) scale(1.05)',
                            color: theme.palette.primary.main,
                        },
                        '&:active': {
                            transform: 'translateY(-1px) scale(1.02)',
                            transition: 'all 0.1s cubic-bezier(0.4, 0, 0.2, 1)',
                        }
                    }}
                    onClick={handleOpen}
                >
                    {React.createElement(MenuIcon)}
                </Fab>
            )}
            <Drawer 
                open={open} 
                onClose={handleClose}
                PaperProps={{
                    sx: {
                        backgroundColor: alpha(theme.palette.background.paper, 0.98),
                        backdropFilter: 'blur(20px)',
                        borderRight: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                        boxShadow: `0 8px 40px ${alpha(theme.palette.common.black, 0.2)}`,
                    }
                }}
            >
                <Box width={width} sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                    {/* Header with Logo */}
                    <Box sx={{ p: 3, pb: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                            <Typography 
                                variant="h5" 
                                sx={{ 
                                    fontWeight: 700,
                                    background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                                    WebkitBackgroundClip: 'text',
                                    backgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                }}
                            >
                                rlmcgraw
                            </Typography>
                            <Box
                                component="button"
                                onClick={handleClose}
                                sx={{
                                    border: 'none',
                                    background: 'none',
                                    cursor: 'pointer',
                                    p: 1,
                                    borderRadius: 1,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: theme.palette.text.secondary,
                                    transition: 'all 0.2s ease',
                                    '&:hover': {
                                        backgroundColor: alpha(theme.palette.text.primary, 0.08),
                                        color: theme.palette.text.primary,
                                    }
                                }}
                            >
                                <ChevronLeftRounded />
                            </Box>
                        </Box>
                        
                        <Typography 
                            variant="caption" 
                            sx={{ 
                                color: theme.palette.text.secondary,
                                fontStyle: 'italic',
                                display: 'block'
                            }}
                        >
                            chaos engineering ∩ programming ∩ mathematics
                        </Typography>
                    </Box>
                    
                    <Divider sx={{ mx: 2 }} />
                    
                    {/* Main Navigation */}
                    <Box sx={{ py: 2 }}>
                        <NavigationItem
                            name="Home"
                            icon={<HomeIcon />}
                            path="/"
                        />
                        
                        <NavigationItem
                            name="About"
                            icon={<InfoIcon />}
                            path="/about"
                        />
                        
                        <NavigationItem
                            name="Musings"
                            icon={<ArticleIcon />}
                            path="/musings"
                        />
                        
                        <NavigationItem
                            name="Login"
                            icon={<AccountCircleIcon />}
                            path="/login"
                        />
                    </Box>
                    
                    <Divider sx={{ mx: 2 }} />
                    
                    {/* Musings Section */}
                    <Box sx={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                        <MusingsSection onClose={handleClose} />
                    </Box>
                    
                    {/* Footer */}
                    <Box sx={{ p: 2, mt: 'auto' }}>
                        <Divider sx={{ mb: 2 }} />
                        <NavigationItem
                            name="Contact"
                            icon={<EmailIcon />}
                            path="mailto:c@rlmcgraw.com"
                            external
                        />
                        
                        <Typography 
                            variant="caption" 
                            sx={{ 
                                display: 'block',
                                textAlign: 'center',
                                color: theme.palette.text.secondary,
                                mt: 2,
                                opacity: 0.7
                            }}
                        >
                            Real Life McGraw © {new Date().getFullYear()}
                        </Typography>
                    </Box>
                </Box>
            </Drawer>
        </Box>
    );
}