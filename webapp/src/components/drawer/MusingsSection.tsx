import { 
    Box, 
    Divider,
    List, 
    ListItem, 
    ListItemButton, 
    ListItemIcon, 
    ListItemText,
    TextField,
    Typography,
    Collapse,
    useTheme,
    alpha,
    InputAdornment,
    Chip
} from '@mui/material';
import ArticleIcon from '@mui/icons-material/Article';
import SearchIcon from '@mui/icons-material/Search';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import * as React from 'react';
import { loadMusings, MusingMetadata } from '../../utils/musingsLoader';
import MusingItem from './MusingItem';

interface MusingsSectionProps {
    onClose?: () => void;
}

export default function MusingsSection({ onClose }: MusingsSectionProps) {
    const theme = useTheme();
    const [musings, setMusings] = React.useState<MusingMetadata[]>([]);
    const [searchTerm, setSearchTerm] = React.useState('');
    const [musingsExpanded, setMusingsExpanded] = React.useState(false);

    React.useEffect(() => {
        try {
            const loadedMusings = loadMusings();
            setMusings(loadedMusings);
        } catch (error) {
            console.error('Error loading musings:', error);
        }
    }, []);

    const filteredMusings = React.useMemo(() => {
        if (!searchTerm.trim()) {
            // Return last 5 musings by date when no search term
            return musings.slice(0, 5);
        }
        
        // Filter musings by search term and return last 25 matches
        const filtered = musings.filter(musing =>
            musing.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            musing.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
        );
        
        return filtered.slice(0, 25);
    }, [musings, searchTerm]);

    const handleExpandToggle = () => {
        setMusingsExpanded(!musingsExpanded);
    };

    return (
        <>
            {/* Musings Section Header */}
            <Box sx={{ px: 2, py: 1 }}>
                <ListItem>
                    <ListItemButton 
                        onClick={handleExpandToggle}
                        sx={{ borderRadius: 1 }}
                    >
                        <ListItemIcon>
                            <ArticleIcon />
                        </ListItemIcon>
                        <ListItemText 
                            primary={
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                                        Musings
                                    </Typography>
                                    <Chip 
                                        label={filteredMusings.length} 
                                        size="small" 
                                        sx={{ 
                                            height: 18, 
                                            fontSize: '0.7rem',
                                            backgroundColor: alpha(theme.palette.primary.main, 0.2),
                                            color: theme.palette.primary.main
                                        }} 
                                    />
                                </Box>
                            }
                        />
                        <ListItemIcon sx={{ minWidth: 'auto' }}>
                            {musingsExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                        </ListItemIcon>
                    </ListItemButton>
                </ListItem>
                
                <Collapse in={musingsExpanded}>
                    {/* Search Box */}
                    <Box sx={{ px: 2, pb: 2 }}>
                        <TextField
                            size="small"
                            fullWidth
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
                                    borderRadius: 2,
                                    '& fieldset': {
                                        borderColor: alpha(theme.palette.divider, 0.2),
                                    },
                                    '&:hover fieldset': {
                                        borderColor: alpha(theme.palette.primary.main, 0.3),
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderColor: theme.palette.primary.main,
                                    },
                                },
                            }}
                        />
                    </Box>
                </Collapse>
            </Box>
            
            {/* Musings List */}
            <Collapse in={musingsExpanded}>
                <Box sx={{ 
                    flex: 1, 
                    overflow: 'auto',
                    px: 1,
                    '&::-webkit-scrollbar': {
                        width: 6,
                    },
                    '&::-webkit-scrollbar-track': {
                        backgroundColor: 'transparent',
                    },
                    '&::-webkit-scrollbar-thumb': {
                        backgroundColor: alpha(theme.palette.primary.main, 0.3),
                        borderRadius: 3,
                    },
                }}>
                    {filteredMusings.length === 0 ? (
                        <Box sx={{ p: 2, textAlign: 'center' }}>
                            <Typography variant="body2" sx={{ color: 'text.secondary', fontStyle: 'italic' }}>
                                {searchTerm ? 'No matching musings found' : 'No musings available'}
                            </Typography>
                        </Box>
                    ) : (
                        <List dense sx={{ py: 0 }}>
                            {filteredMusings.map((musing) => (
                                <MusingItem 
                                    key={musing.slug} 
                                    musing={musing} 
                                    onClose={onClose}
                                />
                            ))}
                        </List>
                    )}
                </Box>
            </Collapse>
            
            {/* Search Results Footer */}
            {searchTerm && (
                <>
                    <Divider />
                    <Box sx={{ p: 2 }}>
                        <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                            Showing {filteredMusings.length} result{filteredMusings.length !== 1 ? 's' : ''} for "{searchTerm}"
                        </Typography>
                    </Box>
                </>
            )}
        </>
    );
}