import { 
    ListItem, 
    ListItemButton, 
    ListItemIcon, 
    ListItemText,
    useTheme,
    alpha 
} from '@mui/material';
import * as React from 'react';

interface DrawerMenuItemProps {
    name: string;
    icon: React.ReactNode;
    onClick: () => void;
    dense?: boolean;
    secondary?: string | null;
}

export default function DrawerMenuItem({ 
    name, 
    icon, 
    onClick, 
    dense = false, 
    secondary = null 
}: DrawerMenuItemProps) {
    const theme = useTheme();

    return (
        <ListItem dense={dense}>
            <ListItemButton 
                onClick={onClick}
                sx={{
                    borderRadius: 1,
                    '&:hover': {
                        backgroundColor: alpha(theme.palette.primary.main, 0.1),
                    }
                }}
            >
                <ListItemIcon sx={{ minWidth: dense ? 36 : 56 }}>
                    {icon}
                </ListItemIcon>
                <ListItemText 
                    primary={name} 
                    secondary={secondary}
                    primaryTypographyProps={{
                        fontSize: dense ? '0.875rem' : '1rem',
                        fontWeight: dense ? 400 : 500
                    }}
                    secondaryTypographyProps={{
                        fontSize: '0.75rem',
                        color: 'text.secondary'
                    }}
                />
            </ListItemButton>
        </ListItem>
    );
}