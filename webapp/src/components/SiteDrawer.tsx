import { 
    Box, 
    Divider, 
    Drawer, 
    Fab,
    useTheme,
    alpha
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ArticleIcon from '@mui/icons-material/Article';
import { ChevronLeftRounded } from '@mui/icons-material';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { DrawerMenuItem, MusingsSection } from './drawer';

export default function SiteDrawer() {
    const navigate = useNavigate();
    const theme = useTheme();
    const [width] = React.useState(350);
    const [open, setOpen] = React.useState(false);

    const handleClose = () => setOpen(false);
    const handleOpen = () => setOpen(true);

    const handleNavigation = (path: string) => {
        navigate(path);
        handleClose();
    };

    const FloatingMenuButton = () => 
        open ? null : (
            <Fab 
                variant='circular'
                size='medium'
                sx={{
                    position: "fixed",
                    top: theme => theme.spacing(2),
                    left: theme => theme.spacing(2),
                    zIndex: theme.zIndex.drawer + 1,
                    backgroundColor: alpha(theme.palette.background.paper, 0.9),
                    backdropFilter: 'blur(10px)',
                    border: `1px solid ${alpha(theme.palette.divider, 0.2)}`,
                    color: theme.palette.text.primary,
                    boxShadow: `0 4px 20px ${alpha(theme.palette.common.black, 0.3)}`,
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    '&:hover': {
                        backgroundColor: alpha(theme.palette.primary.main, 0.1),
                        borderColor: alpha(theme.palette.primary.main, 0.3),
                        boxShadow: `0 6px 25px ${alpha(theme.palette.primary.main, 0.2)}`,
                        transform: 'translateY(-2px)',
                        color: theme.palette.primary.main,
                    },
                    '&:active': {
                        transform: 'translateY(0px)',
                        transition: 'all 0.1s cubic-bezier(0.4, 0, 0.2, 1)',
                    }
                }}
                onClick={handleOpen}
            >
                <MenuIcon fontSize="small" />
            </Fab>
        );

    return (
        <Box>
            <FloatingMenuButton />
            <Drawer 
                open={open} 
                onClose={handleClose}
                PaperProps={{
                    sx: {
                        backgroundColor: alpha(theme.palette.background.paper, 0.95),
                        backdropFilter: 'blur(10px)',
                        borderRight: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                    }
                }}
            >
                <Box width={width} sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                    {/* Header */}
                    <Box sx={{ p: 2 }}>
                        <DrawerMenuItem 
                            name='Close'
                            icon={<ChevronLeftRounded />}
                            onClick={handleClose}
                        />
                    </Box>
                    
                    <Divider />
                    
                    {/* Main Navigation */}
                    <Box sx={{ px: 2, py: 1 }}>
                        <DrawerMenuItem
                            name='Login'
                            icon={<AccountCircleIcon />}
                            onClick={() => handleNavigation('/login')}
                        />
                        
                        <DrawerMenuItem
                            name='Recent Musings'
                            icon={<ArticleIcon />}
                            onClick={() => handleNavigation('/musings')}
                        />
                    </Box>
                    
                    <Divider />
                    
                    {/* Musings Section */}
                    <Box sx={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                        <MusingsSection onClose={handleClose} />
                    </Box>
                </Box>
            </Drawer>
        </Box>
    );
}