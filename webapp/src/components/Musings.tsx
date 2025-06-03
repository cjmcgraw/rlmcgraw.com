import { Box, Typography, Card, CardContent, CardActionArea, Grid, Container, useTheme, alpha } from '@mui/material';
import { CalendarToday, Article } from '@mui/icons-material';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { loadMusings, MusingMetadata } from '../utils/musingsLoader';

export default function Musings() {
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

    if (loading) {
        return (
            <Container maxWidth="lg" sx={{ py: 4 }}>
                <Typography variant="h4" sx={{ mb: 4, textAlign: 'center' }}>
                    Loading musings...
                </Typography>
            </Container>
        );
    }

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
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
                    Musings
                </Typography>
                <Typography variant="h6" sx={{ color: 'text.secondary', maxWidth: 600, mx: 'auto' }}>
                    Thoughts, ideas, and explorations in technology, algorithms, and software engineering
                </Typography>
            </Box>

            {musings.length === 0 ? (
                <Box sx={{ textAlign: 'center', py: 8 }}>
                    <Article sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
                    <Typography variant="h5" sx={{ mb: 2, color: 'text.secondary' }}>
                        No musings yet
                    </Typography>
                    <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                        Check back soon for new thoughts and ideas!
                    </Typography>
                </Box>
            ) : (
                <Grid container spacing={4}>
                    {musings.map((musing, index) => (
                        <Grid item xs={12} md={6} lg={4} key={musing.slug}>
                            <Card
                                sx={{
                                    height: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    backgroundColor: alpha(theme.palette.background.paper, 0.6),
                                    backdropFilter: 'blur(10px)',
                                    border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                                    transition: 'all 0.3s ease-in-out',
                                    '&:hover': {
                                        transform: 'translateY(-4px)',
                                        boxShadow: `0 8px 25px ${alpha(theme.palette.primary.main, 0.15)}`,
                                        borderColor: alpha(theme.palette.primary.main, 0.3),
                                    }
                                }}
                            >
                                <CardActionArea 
                                    onClick={() => handleMusingClick(musing.slug)}
                                    sx={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}
                                >
                                    <CardContent sx={{ flexGrow: 1, p: 3 }}>
                                        <Typography 
                                            variant="h6" 
                                            sx={{ 
                                                mb: 2, 
                                                fontWeight: 600,
                                                color: theme.palette.primary.main,
                                                lineHeight: 1.3
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
                                            <CalendarToday sx={{ fontSize: 16, mr: 1 }} />
                                            <Typography variant="caption">
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