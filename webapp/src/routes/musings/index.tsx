import { 
    Typography, 
    Paper, 
    Container, 
    Grid, 
    Card, 
    CardContent, 
    CardActionArea,
    Box,
    Chip,
    useTheme,
    alpha
} from '@mui/material';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { loadMusings } from '../../utils/musingsLoader';

export default function MusingsRoot() {
    const theme = useTheme();
    const navigate = useNavigate();
    const [musings, setMusings] = React.useState([]);

    React.useEffect(() => {
        const loadedMusings = loadMusings();
        setMusings(loadedMusings);
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

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Paper
                elevation={0}
                sx={{
                    p: { xs: 3, md: 4 },
                    mb: 4,
                    backgroundColor: alpha(theme.palette.background.paper, 0.6),
                    backdropFilter: 'blur(10px)',
                    border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                    borderRadius: 2,
                }}
            >
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
                
                <Typography variant="h6" sx={{ color: 'text.secondary', mb: 4 }}>
                    Thoughts, experiments, and explorations at the intersection of technology, mathematics, and human curiosity.
                </Typography>

                <Grid container spacing={3}>
                    {musings.map((musing) => (
                        <Grid item xs={12} md={6} key={musing.slug}>
                            <Card 
                                elevation={0}
                                sx={{
                                    height: '100%',
                                    backgroundColor: alpha(theme.palette.background.default, 0.3),
                                    border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                                    transition: 'all 0.3s ease',
                                    '&:hover': {
                                        transform: 'translateY(-4px)',
                                        boxShadow: `0 8px 25px ${alpha(theme.palette.primary.main, 0.15)}`,
                                        borderColor: alpha(theme.palette.primary.main, 0.3),
                                    }
                                }}
                            >
                                <CardActionArea 
                                    onClick={() => handleMusingClick(musing.slug)}
                                    sx={{ height: '100%' }}
                                >
                                    <CardContent sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                                        <Box sx={{ mb: 2 }}>
                                            <Chip 
                                                label={formatDate(musing.date)}
                                                size="small"
                                                sx={{ 
                                                    backgroundColor: alpha(theme.palette.primary.main, 0.1),
                                                    color: 'primary.main',
                                                    border: `1px solid ${alpha(theme.palette.primary.main, 0.3)}`
                                                }}
                                            />
                                        </Box>
                                        
                                        <Typography 
                                            variant="h5" 
                                            sx={{ 
                                                mb: 2, 
                                                fontWeight: 600,
                                                lineHeight: 1.3
                                            }}
                                        >
                                            {musing.title}
                                        </Typography>
                                        
                                        <Typography 
                                            variant="body2" 
                                            sx={{ 
                                                color: 'text.secondary',
                                                lineHeight: 1.6,
                                                flex: 1
                                            }}
                                        >
                                            {musing.excerpt}
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Grid>
                    ))}
                </Grid>

                {musings.length === 0 && (
                    <Box sx={{ textAlign: 'center', py: 8 }}>
                        <Typography variant="h6" sx={{ color: 'text.secondary', mb: 2 }}>
                            No musings available yet
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                            Check back soon for new thoughts and explorations.
                        </Typography>
                    </Box>
                )}
            </Paper>
        </Container>
    );
}