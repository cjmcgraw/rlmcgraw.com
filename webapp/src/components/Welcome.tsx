import { Box } from "@mui/material";

export default function Welcome() {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '80vh',
                textAlign: 'center',
                animation: 'fadeIn 0.6s ease-in',
                '@keyframes fadeIn': {
                    from: { opacity: 0, transform: 'translateY(20px)' },
                    to: { opacity: 1, transform: 'translateY(0)' },
                },
            }}
        >
            <Box
                component="h1"
                sx={{
                    fontSize: { xs: '3rem', md: '4rem' },
                    fontWeight: 700,
                    background: theme => `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    mb: 2,
                }}
            >
                rlmcgraw
            </Box>
            <Box
                component="p"
                sx={{
                    fontSize: '1.25rem',
                    color: 'text.secondary',
                    maxWidth: '600px',
                    mx: 'auto',
                }}
            >
                Welcome to my digital space
            </Box>
        </Box>
    );
}
