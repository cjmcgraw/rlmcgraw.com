import React from 'react';
import { Box, Typography, Card, CardContent, Grid, Container } from '@mui/material';
import { Link } from 'react-router-dom';

export default function LandingPage() {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Hero Section */}
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <Typography
          variant="h2"
          component="h1"
          sx={{
            fontSize: { xs: '2.5rem', md: '3.5rem' },
            fontWeight: 700,
            mb: 2,
          }}
        >
          Real Life McGraw
        </Typography>
        
        <Typography
          variant="h5"
          sx={{
            color: 'text.secondary',
            fontWeight: 400,
            mb: 3,
            fontSize: { xs: '1rem', md: '1.3rem' },
            fontStyle: 'italic',
          }}
        >
          chaos engineering ∩ programming ∩ mathematics
        </Typography>
        
        <Typography
          variant="body1"
          sx={{
            fontSize: '1.1rem',
            maxWidth: '600px',
            margin: '0 auto',
            lineHeight: 1.6,
          }}
        >
          A collection of musings, algorithms, and insights from the trenches of software engineering. 
          Dive into data science experiments, mathematical explorations, and the occasional philosophical 
          rambling about why code behaves the way it does.
        </Typography>
      </Box>

      {/* Navigation Cards */}
      <Grid container spacing={3} sx={{ mb: 6 }}>
        {[
          { to: '/about', icon: '👨‍💻', title: 'About', desc: 'Learn about my journey and expertise' },
          { to: '/musings', icon: '🧠', title: 'Musings', desc: 'Thoughts on data, algorithms, and life' },
          { to: '/login', icon: '🔐', title: 'Login', desc: 'Access exclusive content' },
          { href: 'mailto:c@rlmcgraw.com', icon: '📧', title: 'Contact Me', desc: "Let's start a conversation" },
        ].map((item, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Box
              component={item.to ? Link : 'a'}
              to={item.to || undefined}
              href={item.href || undefined}
              sx={{ textDecoration: 'none', color: 'inherit' }}
            >
              <Card
                sx={{
                  height: '100%',
                  transition: 'all 0.2s ease',
                  cursor: 'pointer',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: 3,
                  },
                }}
              >
                <CardContent sx={{ textAlign: 'center', p: 3 }}>
                  <Typography sx={{ fontSize: '2rem', mb: 1 }}>
                    {item.icon}
                  </Typography>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                    {item.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {item.desc}
                  </Typography>
                </CardContent>
              </Card>
            </Box>
          </Grid>
        ))}
      </Grid>

      {/* Fun Stats */}
      <Box sx={{ textAlign: 'center' }}>
        <Typography variant="h5" sx={{ mb: 4, fontWeight: 600 }}>
          Current Status
        </Typography>
        
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={4}>
            <Typography variant="h4" sx={{ mb: 1 }}>
              🤔
            </Typography>
            <Typography variant="h6" color="primary">
              Confused
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Current State
            </Typography>
          </Grid>
          
          <Grid item xs={4}>
            <Typography variant="h4" sx={{ mb: 1 }}>
              100%
            </Typography>
            <Typography variant="h6" color="primary">
              Coffee
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Powered
            </Typography>
          </Grid>
          
          <Grid item xs={4}>
            <Box sx={{ mb: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Typography 
                component="div"
                sx={{ 
                  fontFamily: 'serif',
                  fontSize: '1.8rem',
                  color: 'primary.main',
                  lineHeight: 1.2,
                  textAlign: 'center'
                }}
              >
                <Box component="div" sx={{ 
                  borderBottom: '2px solid currentColor',
                  paddingBottom: '2px',
                  marginBottom: '4px'
                }}>
                  1
                </Box>
                <Box component="div" sx={{ 
                  fontSize: '0.9em',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 0.3
                }}>
                  <span>1</span>
                  <span>+</span>
                  <Box component="span" sx={{ 
                    display: 'inline-flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    fontSize: '0.75em',
                    lineHeight: 0.9,
                    position: 'relative',
                    top: '-0.1em'
                  }}>
                    <Box component="span" sx={{ 
                      borderBottom: '1px solid currentColor',
                      paddingBottom: '1px',
                      minWidth: '6px',
                      textAlign: 'center'
                    }}>
                      1
                    </Box>
                    <Box component="span" sx={{ 
                      fontStyle: 'italic'
                    }}>
                      e
                    </Box>
                  </Box>
                </Box>
              </Typography>
            </Box>
            <Typography variant="caption" color="text.secondary">
              Favorite Number
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}