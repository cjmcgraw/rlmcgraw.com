import { 
    ListItem, 
    ListItemButton, 
    ListItemIcon, 
    ListItemText,
    useTheme,
    alpha 
} from '@mui/material';
import ArticleIcon from '@mui/icons-material/Article';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { MusingMetadata } from '../../utils/musingsLoader';

interface MusingItemProps {
    musing: MusingMetadata;
    onClose?: () => void;
}

export default function MusingItem({ musing, onClose }: MusingItemProps) {
    const theme = useTheme();
    const navigate = useNavigate();

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', { 
            month: 'short', 
            day: 'numeric',
            year: 'numeric'
        });
    };

    const handleClick = () => {
        navigate(musing.path);
        onClose?.();
    };

    return (
        <ListItem dense>
            <ListItemButton 
                onClick={handleClick}
                sx={{
                    borderRadius: 1,
                    '&:hover': {
                        backgroundColor: alpha(theme.palette.primary.main, 0.1),
                    }
                }}
            >
                <ListItemIcon sx={{ minWidth: 36 }}>
                    <ArticleIcon sx={{ fontSize: 18, color: 'text.secondary' }} />
                </ListItemIcon>
                <ListItemText 
                    primary={musing.title} 
                    secondary={formatDate(musing.date)}
                    primaryTypographyProps={{
                        fontSize: '0.875rem',
                        fontWeight: 400
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