import { Box, Container, CircularProgress, Typography, Paper } from '@mui/material';
import * as React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { getMusingBySlug } from '../../utils/musingsLoader';

export default function MusingPage() {
    const { slug } = useParams<{ slug: string }>();
    const [MusingComponent, setMusingComponent] = React.useState<React.ComponentType | null>(null);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(false);

    React.useEffect(() => {
        if (!slug) {
            setError(true);
            setLoading(false);
            return;
        }

        const loadMusing = async () => {
            try {
                // Load the specific musing by slug
                const musing = getMusingBySlug(slug);
                
                if (!musing || !musing.component) {
                    console.error(`No musing found for slug: ${slug}`);
                    setError(true);
                    setLoading(false);
                    return;
                }

                setMusingComponent(() => musing.component);
                setLoading(false);
            } catch (err) {
                console.error('Error loading musing:', err);
                setError(true);
                setLoading(false);
            }
        };

        loadMusing();
    }, [slug]);

    if (loading) {
        return (
            <Container maxWidth="lg" sx={{ py: 8, textAlign: 'center' }}>
                <CircularProgress size={40} />
                <Typography variant="body2" sx={{ mt: 2, color: 'text.secondary' }}>
                    Loading musing...
                </Typography>
            </Container>
        );
    }

    if (error || !MusingComponent) {
        return <Navigate to="/musings" replace />;
    }

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <MusingComponent />
        </Container>
    );
}