import { 
    Typography, 
    Paper, 
    Box, 
    Container,
    Grid,
    Card,
    CardContent,
    CardActionArea,
    useTheme,
    alpha,
    Chip
} from '@mui/material';
import { CalendarToday, Article } from '@mui/icons-material';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { loadMusings, MusingMetadata } from '../../utils/musingsLoader';

export default function MusingsRoot() {
    const theme = useTheme();
    const navigate = useNavigate();
    const [musings, setMusings] = React.useState<MusingMetadata[]>([]);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        try {
            const loadedMusings = loadMusings();
            setMusings(loadedMusings);
        } catch (error) {
            console.error('Error loading musings:', error);
        } finally {
            setLoading(false);
        }
    }, []);

    const handleMusingClick = (slug: string) => {
        navigate(`/musings/${slug}`);
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });
    };

    const getTimeAgo = (dateString: string) => {
        const now = new Date();
        const musingDate = new Date(dateString);
        const diffInDays = Math.floor((now.getTime() - musingDate.getTime()) / (1000 * 60 * 60 * 24));
        
        if (diffInDays === 0) return 'Today';
        if (diffInDays === 1) return 'Yesterday';
        if (diffInDays < 7) return `${diffInDays} days ago`;
        if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`;
        if (diffInDays < 365) return `${Math.floor(diffInDays / 30)} months ago`;
        return `${Math.floor(diffInDays / 365)} years ago`;
    };

    if (loading) {
        return (
            <Container maxWidth="lg" sx={{ py: 6 }}>
                <Typography variant="h4" sx={{ mb: 4, textAlign: 'center', color: 'text.secondary' }}>
                    Loading musings...
                </Typography>
            </Container>
        );
    }

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            {/* Header */}
            <Box sx={{ mb: 6, textAlign: 'center' }}>
                <Typography 
                    variant="h2" 
                    sx={{ 
                        mb: 2,
                        fontWeight: 700,
                        background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                        backgroundClip: 'text',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                    }}
                >
                    All Musings
                </Typography>
                <Typography variant="h6" sx={{ color: 'text.secondary', maxWidth: 600, mx: 'auto', mb: 2 }}>
                    A collection of thoughts, ideas, and explorations in technology, algorithms, and software engineering
                </Typography>
                <Chip 
                    label={`${musings.length} ${musings.length === 1 ? 'musing' : 'musings'}`}
                    sx={{ 
                        backgroundColor: alpha(theme.palette.primary.main, 0.1),
                        color: theme.palette.primary.main,
                        fontWeight: 500
                    }}
                />
            </Box>

            {musings.length === 0 ? (
                <Paper
                    elevation={0}
                    sx={{
                        p: 8,
                        textAlign: 'center',
                        backgroundColor: alpha(theme.palette.background.paper, 0.6),
                        backdropFilter: 'blur(10px)',
                        border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                        borderRadius: 2,
                    }}
                >
                    <Article sx={{ fontSize: 80, color: 'text.secondary', mb: 3, opacity: 0.5 }} />
                    <Typography variant="h4" sx={{ mb: 2, color: 'text.secondary' }}>
                        No musings yet
                    </Typography>
                    <Typography variant="body1" sx={{ color: 'text.secondary', maxWidth: 400, mx: 'auto' }}>
                        This is where thoughts and ideas will be shared. Check back soon for new content exploring 
                        technology, algorithms, and software engineering concepts.
                    </Typography>
                </Paper>
            ) : (
                <Grid container spacing={3}>
                    {musings.map((musing, index) => (
                        <Grid item xs={12} sm={6} lg={4} key={musing.slug}>
                            <Card
                                sx={{
                                    height: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    backgroundColor: alpha(theme.palette.background.paper, 0.6),
                                    backdropFilter: 'blur(10px)',
                                    border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                                    transition: 'all 0.3s ease-in-out',
                                    position: 'relative',
                                    overflow: 'hidden',
                                    '&:hover': {
                                        transform: 'translateY(-8px)',
                                        boxShadow: `0 12px 35px ${alpha(theme.palette.primary.main, 0.2)}`,
                                        borderColor: alpha(theme.palette.primary.main, 0.4),
                                        '&::before': {
                                            opacity: 1,
                                        }
                                    },
                                    '&::before': {
                                        content: '""',
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        right: 0,
                                        height: 3,
                                        background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                                        opacity: 0,
                                        transition: 'opacity 0.3s ease-in-out',
                                    }
                                }}
                            >
                                <CardActionArea 
                                    onClick={() => handleMusingClick(musing.slug)}
                                    sx={{ 
                                        height: '100%', 
                                        display: 'flex', 
                                        flexDirection: 'column', 
                                        alignItems: 'stretch',
                                        p: 0
                                    }}
                                >
                                    <CardContent sx={{ flexGrow: 1, p: 3, pt: 4 }}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                            <Chip 
                                                label={getTimeAgo(musing.date)}
                                                size="small"
                                                sx={{ 
                                                    backgroundColor: alpha(theme.palette.secondary.main, 0.1),
                                                    color: theme.palette.secondary.main,
                                                    fontSize: '0.7rem',
                                                    height: 20
                                                }}
                                            />
                                        </Box>
                                        
                                        <Typography 
                                            variant="h6" 
                                            sx={{ 
                                                mb: 2, 
                                                fontWeight: 600,
                                                color: theme.palette.primary.main,
                                                lineHeight: 1.3,
                                                display: '-webkit-box',
                                                WebkitLineClamp: 2,
                                                WebkitBoxOrient: 'vertical',
                                                overflow: 'hidden',
                                            }}
                                        >
                                            {musing.title}
                                        </Typography>
                                        
                                        <Typography 
                                            variant="body2" 
                                            sx={{ 
                                                mb: 3, 
                                                color: 'text.secondary',
                                                lineHeight: 1.6,
                                                display: '-webkit-box',
                                                WebkitLineClamp: 3,
                                                WebkitBoxOrient: 'vertical',
                                                overflow: 'hidden',
                                            }}
                                        >
                                            {musing.excerpt}
                                        </Typography>
                                        
                                        <Box 
                                            sx={{ 
                                                display: 'flex', 
                                                alignItems: 'center', 
                                                color: 'text.secondary',
                                                mt: 'auto'
                                            }}
                                        >
                                            <CalendarToday sx={{ fontSize: 14, mr: 1 }} />
                                            <Typography variant="caption" sx={{ fontSize: '0.75rem' }}>
                                                {formatDate(musing.date)}
                                            </Typography>
                                        </Box>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            )}
        </Container>
    );
}