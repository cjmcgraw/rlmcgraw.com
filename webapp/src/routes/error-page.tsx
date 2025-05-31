import { Box, Button, Typography, Container, useTheme, alpha } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';

export default function ErrorPage() {
    const navigate = useNavigate();
    const theme = useTheme();

    return (
        <Container maxWidth="md">
            <Box
                sx={{
                    minHeight: '80vh',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textAlign: 'center',
                    position: 'relative',
                    animation: 'glitch 2s infinite',
                    '@keyframes glitch': {
                        '0%': { transform: 'translate(0)' },
                        '20%': { transform: 'translate(-1px, 1px)' },
                        '40%': { transform: 'translate(-1px, -1px)' },
                        '60%': { transform: 'translate(1px, 1px)' },
                        '80%': { transform: 'translate(1px, -1px)' },
                        '100%': { transform: 'translate(0)' },
                    },
                }}
            >
                <Box
                    sx={{
                        position: 'relative',
                        mb: 4,
                    }}
                >
                    <Typography
                        variant="h1"
                        sx={{
                            fontSize: { xs: '6rem', md: '8rem' },
                            fontWeight: 900,
                            fontFamily: '"Courier New", monospace',
                            background: theme => `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                            backgroundClip: 'text',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            position: 'relative',
                            '&::before': {
                                content: '"404"',
                                position: 'absolute',
                                left: '2px',
                                textShadow: theme => `-2px 0 ${theme.palette.secondary.main}`,
                                animation: 'glitch-1 0.5s infinite',
                                opacity: 0.8,
                            },
                            '&::after': {
                                content: '"404"',
                                position: 'absolute',
                                left: '-2px',
                                textShadow: theme => `2px 0 ${theme.palette.primary.main}`,
                                animation: 'glitch-2 0.7s infinite',
                                opacity: 0.8,
                            },
                            '@keyframes glitch-1': {
                                '0%, 100%': { opacity: 0 },
                                '33%, 66%': { opacity: 0.8 },
                            },
                            '@keyframes glitch-2': {
                                '0%, 100%': { opacity: 0 },
                                '25%, 75%': { opacity: 0.8 },
                            },
                        }}
                    >
                        404
                    </Typography>
                </Box>

                <Typography variant="h4" sx={{ mb: 2, fontWeight: 600 }}>
                    Page Not Found
                </Typography>

                <Typography
                    variant="h6"
                    sx={{
                        color: 'text.secondary',
                        mb: 4,
                        fontFamily: '"Courier New", monospace',
                    }}
                >
                    The page you're looking for seems to have thrown an exception...
                </Typography>

                <Box
                    sx={{
                        backgroundColor: alpha(theme.palette.background.paper, 0.6),
                        backdropFilter: 'blur(10px)',
                        border: theme => `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                        borderRadius: 2,
                        p: 3,
                        mb: 4,
                        maxWidth: '600px',
                        width: '100%',
                        textAlign: 'left',
                        fontFamily: '"Courier New", monospace',
                        fontSize: '0.9rem',
                    }}
                >
                    <Box component="span" sx={{ color: theme.palette.secondary.main }}>try</Box> {'{\n'}
                    {'  '}<Box component="span" sx={{ color: theme.palette.secondary.main }}>const</Box> page = <Box component="span" sx={{ color: theme.palette.primary.light }}>findPage</Box>(<Box component="span" sx={{ color: '#98c379' }}>window.location.pathname</Box>);<br />
                    {'  '}<Box component="span" sx={{ color: theme.palette.secondary.main }}>return</Box> <Box component="span" sx={{ color: theme.palette.primary.light }}>render</Box>(page);<br />
                    {'}'} <Box component="span" sx={{ color: theme.palette.secondary.main }}>catch</Box> (error) {'{\n'}
                    {'  '}<Box component="span" sx={{ color: '#5c6370' }}>// TODO: Handle this properly someday</Box><br />
                    {'  '}<Box component="span" sx={{ color: theme.palette.secondary.main }}>throw new</Box> <Box component="span" sx={{ color: theme.palette.primary.light }}>Error</Box>(<Box component="span" sx={{ color: '#98c379' }}>"404: Resource undefined"</Box>);<br />
                    {'  '}<Box component="span" sx={{ color: '#5c6370' }}>// Fun fact: This page exists in a quantum superposition</Box><br />
                    {'  '}<Box component="span" sx={{ color: '#5c6370' }}>// until you observe it (then it's definitely not here)</Box><br />
                    {'}'}
                </Box>

                <Typography
                    variant="body1"
                    sx={{
                        mb: 4,
                        fontStyle: 'italic',
                        color: theme.palette.secondary.main,
                        fontSize: '1.1rem',
                    }}
                >
                    ∄ page ∈ website : page.url = requested_url
                </Typography>

                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: 'center' }}>
                    <Button
                        variant="contained"
                        startIcon={<HomeIcon />}
                        onClick={() => navigate('/')}
                        sx={{
                            background: theme => `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                            px: 3,
                            py: 1.5,
                            '&:hover': {
                                transform: 'translateY(-2px)',
                                boxShadow: theme => theme.shadows[8],
                            },
                            transition: 'all 0.2s ease-in-out',
                        }}
                    >
                        Go Home
                    </Button>
                    <Button
                        variant="outlined"
                        startIcon={<ArrowBackIcon />}
                        onClick={() => window.history.back()}
                        sx={{
                            borderColor: theme => alpha(theme.palette.primary.main, 0.5),
                            color: theme.palette.primary.main,
                            px: 3,
                            py: 1.5,
                            '&:hover': {
                                borderColor: theme.palette.primary.main,
                                backgroundColor: theme => alpha(theme.palette.primary.main, 0.1),
                            },
                        }}
                    >
                        Go Back
                    </Button>
                </Box>
            </Box>
        </Container>
    );
}
