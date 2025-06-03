import { 
    Box, 
    Container, 
    Typography, 
    Paper, 
    Grid, 
    Card, 
    CardContent, 
    Chip, 
    useTheme, 
    alpha,
    Divider,
    Avatar,
    LinearProgress
} from '@mui/material';
import { 
    Code, 
    Psychology, 
    TrendingUp, 
    School, 
    Work, 
    Email,
    GitHub,
    LinkedIn
} from '@mui/icons-material';
import * as React from 'react';

export default function About() {
    const theme = useTheme();

    const skills = [
        { name: 'Machine Learning', level: 90, color: '#ff6b6b' },
        { name: 'Software Architecture', level: 95, color: '#4ecdc4' },
        { name: 'Data Science', level: 85, color: '#45b7d1' },
        { name: 'Algorithm Design', level: 92, color: '#96ceb4' },
        { name: 'System Design', level: 88, color: '#feca57' },
        { name: 'Statistical Analysis', level: 87, color: '#ff9ff3' },
    ];

    const experiences = [
        {
            title: 'Senior Software Engineer',
            company: 'Tech Innovation Corp',
            period: '2021 - Present',
            description: 'Leading development of scalable ML systems and mentoring junior developers.'
        },
        {
            title: 'Machine Learning Engineer',
            company: 'DataCorp Solutions', 
            period: '2019 - 2021',
            description: 'Built production ML pipelines processing millions of data points daily.'
        },
        {
            title: 'Software Developer',
            company: 'StartupTech',
            period: '2017 - 2019',
            description: 'Full-stack development with focus on data-driven applications.'
        }
    ];

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            {/* Hero Section */}
            <Paper
                elevation={0}
                sx={{
                    p: { xs: 4, md: 6 },
                    mb: 4,
                    backgroundColor: alpha(theme.palette.background.paper, 0.6),
                    backdropFilter: 'blur(10px)',
                    border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                    borderRadius: 2,
                    textAlign: 'center',
                    position: 'relative',
                    overflow: 'hidden'
                }}
            >
                {/* Background pattern */}
                <Box
                    sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        opacity: 0.03,
                        backgroundImage: `repeating-linear-gradient(
                            45deg,
                            ${theme.palette.primary.main},
                            ${theme.palette.primary.main} 1px,
                            transparent 1px,
                            transparent 20px
                        )`
                    }}
                />
                
                <Avatar
                    sx={{
                        width: 120,
                        height: 120,
                        mx: 'auto',
                        mb: 3,
                        fontSize: '3rem',
                        backgroundColor: alpha(theme.palette.primary.main, 0.1),
                        color: theme.palette.primary.main,
                        border: `3px solid ${alpha(theme.palette.primary.main, 0.2)}`
                    }}
                >
                    Carl
                </Avatar>

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
                    Carl McGraw
                </Typography>

                <Typography variant="h5" sx={{ mb: 3, color: 'text.secondary', fontWeight: 300 }}>
                    Software Engineer & Data Scientist
                </Typography>

                <Box sx={{ mb: 4 }}>
                    <Typography variant="body1" sx={{ mb: 2, fontSize: '1.1rem', lineHeight: 1.6 }}>
                        Welcome to the intersection of mathematics, technology, and real-world problem solving.
                    </Typography>
                    
                    <Box sx={{ 
                        p: 3, 
                        backgroundColor: alpha(theme.palette.info.main, 0.05),
                        borderRadius: 2,
                        border: `1px solid ${alpha(theme.palette.info.main, 0.1)}`,
                        mb: 3
                    }}>
                        <Typography variant="body2" sx={{ fontStyle: 'italic', color: 'text.secondary' }}>
                            <strong>Fun fact:</strong> "RL McGraw" stands for "Real Life McGraw" — a playful nod to the fact that 
                            behind every algorithm, every line of code, and every mathematical model, there's a 
                            <em> real line</em> of thinking that connects abstract concepts to tangible solutions.
                        </Typography>
                    </Box>
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap' }}>
                    <Chip 
                        icon={<Psychology />} 
                        label="Machine Learning" 
                        variant="outlined"
                        sx={{ backgroundColor: alpha(theme.palette.primary.main, 0.05) }}
                    />
                    <Chip 
                        icon={<Code />} 
                        label="Full Stack" 
                        variant="outlined"
                        sx={{ backgroundColor: alpha(theme.palette.secondary.main, 0.05) }}
                    />
                    <Chip 
                        icon={<TrendingUp />} 
                        label="Data Science" 
                        variant="outlined"
                        sx={{ backgroundColor: alpha(theme.palette.info.main, 0.05) }}
                    />
                </Box>
            </Paper>

            <Grid container spacing={4}>
                {/* About Section */}
                <Grid item xs={12} md={8}>
                    <Paper
                        elevation={0}
                        sx={{
                            p: 4,
                            mb: 4,
                            backgroundColor: alpha(theme.palette.background.paper, 0.6),
                            backdropFilter: 'blur(10px)',
                            border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                            borderRadius: 2,
                        }}
                    >
                        <Typography variant="h4" sx={{ mb: 3, fontWeight: 600, display: 'flex', alignItems: 'center' }}>
                            <School sx={{ mr: 2, color: theme.palette.primary.main }} />
                            About Me
                        </Typography>
                        
                        <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.8 }}>
                            I'm a software engineer passionate about building systems that bridge the gap between 
                            theoretical computer science and practical applications. My work spans machine learning, 
                            distributed systems, and data engineering, with a particular fascination for algorithms 
                            that can learn and adapt.
                        </Typography>

                        <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.8 }}>
                            When I'm not coding, you'll find me exploring the mathematical foundations of machine learning, 
                            contributing to open source projects, or writing about the elegant connections between 
                            statistics, algorithms, and real-world problem solving.
                        </Typography>

                        <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.8 }}>
                            I believe the best software solutions come from understanding both the technical constraints 
                            and the human problems we're trying to solve. Every line of code should tell a story, 
                            and every algorithm should serve a purpose beyond theoretical elegance.
                        </Typography>

                        <Divider sx={{ my: 3 }} />

                        <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
                            Technical Skills
                        </Typography>
                        
                        {skills.map((skill, index) => (
                            <Box key={skill.name} sx={{ mb: 2 }}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                        {skill.name}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {skill.level}%
                                    </Typography>
                                </Box>
                                <LinearProgress
                                    variant="determinate"
                                    value={skill.level}
                                    sx={{
                                        height: 6,
                                        borderRadius: 3,
                                        backgroundColor: alpha(skill.color, 0.1),
                                        '& .MuiLinearProgress-bar': {
                                            backgroundColor: skill.color,
                                            borderRadius: 3,
                                        }
                                    }}
                                />
                            </Box>
                        ))}
                    </Paper>
                </Grid>

                {/* Sidebar */}
                <Grid item xs={12} md={4}>
                    {/* Experience */}
                    <Paper
                        elevation={0}
                        sx={{
                            p: 3,
                            mb: 4,
                            backgroundColor: alpha(theme.palette.background.paper, 0.6),
                            backdropFilter: 'blur(10px)',
                            border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                            borderRadius: 2,
                        }}
                    >
                        <Typography variant="h5" sx={{ mb: 3, fontWeight: 600, display: 'flex', alignItems: 'center' }}>
                            <Work sx={{ mr: 2, color: theme.palette.primary.main }} />
                            Experience
                        </Typography>
                        
                        {experiences.map((exp, index) => (
                            <Box key={index} sx={{ mb: 3, pb: 3, borderBottom: index < experiences.length - 1 ? `1px solid ${alpha(theme.palette.divider, 0.1)}` : 'none' }}>
                                <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                                    {exp.title}
                                </Typography>
                                <Typography variant="body2" sx={{ color: 'primary.main', mb: 1, fontWeight: 500 }}>
                                    {exp.company}
                                </Typography>
                                <Typography variant="caption" sx={{ color: 'text.secondary', mb: 2, display: 'block' }}>
                                    {exp.period}
                                </Typography>
                                <Typography variant="body2" sx={{ lineHeight: 1.6 }}>
                                    {exp.description}
                                </Typography>
                            </Box>
                        ))}
                    </Paper>

                    {/* Contact */}
                    <Paper
                        elevation={0}
                        sx={{
                            p: 3,
                            backgroundColor: alpha(theme.palette.background.paper, 0.6),
                            backdropFilter: 'blur(10px)',
                            border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                            borderRadius: 2,
                        }}
                    >
                        <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
                            Let's Connect
                        </Typography>
                        
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer', p: 1, borderRadius: 1, '&:hover': { backgroundColor: alpha(theme.palette.primary.main, 0.05) } }}>
                                <Email sx={{ mr: 2, color: theme.palette.primary.main }} />
                                <Typography variant="body2">contact@rlmcgraw.com</Typography>
                            </Box>
                            
                            <Box sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer', p: 1, borderRadius: 1, '&:hover': { backgroundColor: alpha(theme.palette.primary.main, 0.05) } }}>
                                <GitHub sx={{ mr: 2, color: theme.palette.primary.main }} />
                                <Typography variant="body2">github.com/rlmcgraw</Typography>
                            </Box>
                            
                            <Box sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer', p: 1, borderRadius: 1, '&:hover': { backgroundColor: alpha(theme.palette.primary.main, 0.05) } }}>
                                <LinkedIn sx={{ mr: 2, color: theme.palette.primary.main }} />
                                <Typography variant="body2">linkedin.com/in/rlmcgraw</Typography>
                            </Box>
                        </Box>
                    </Paper>
                </Grid>
            </Grid>

            {/* Philosophy Section */}
            <Paper
                elevation={0}
                sx={{
                    p: 4,
                    mt: 4,
                    backgroundColor: alpha(theme.palette.secondary.main, 0.05),
                    backdropFilter: 'blur(10px)',
                    border: `1px solid ${alpha(theme.palette.secondary.main, 0.1)}`,
                    borderRadius: 2,
                }}
            >
                <Typography variant="h4" sx={{ mb: 3, fontWeight: 600, textAlign: 'center' }}>
                    Engineering Philosophy
                </Typography>
                
                <Grid container spacing={3}>
                    <Grid item xs={12} md={4}>
                        <Box sx={{ textAlign: 'center' }}>
                            <Code sx={{ fontSize: 48, color: theme.palette.secondary.main, mb: 2 }} />
                            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                                Clean Code
                            </Typography>
                            <Typography variant="body2" sx={{ lineHeight: 1.6 }}>
                                Code should be readable, maintainable, and tell a story. Every function should have a single responsibility, and every abstraction should earn its place.
                            </Typography>
                        </Box>
                    </Grid>
                    
                    <Grid item xs={12} md={4}>
                        <Box sx={{ textAlign: 'center' }}>
                            <Psychology sx={{ fontSize: 48, color: theme.palette.secondary.main, mb: 2 }} />
                            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                                User-Centric Design
                            </Typography>
                            <Typography variant="body2" sx={{ lineHeight: 1.6 }}>
                                Technology exists to solve human problems. The best solutions are invisible to users—they just work, intuitively and reliably.
                            </Typography>
                        </Box>
                    </Grid>
                    
                    <Grid item xs={12} md={4}>
                        <Box sx={{ textAlign: 'center' }}>
                            <TrendingUp sx={{ fontSize: 48, color: theme.palette.secondary.main, mb: 2 }} />
                            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                                Continuous Learning
                            </Typography>
                            <Typography variant="body2" sx={{ lineHeight: 1.6 }}>
                                Technology evolves rapidly, but fundamental principles endure. Stay curious, question assumptions, and never stop learning.
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>
            </Paper>
        </Container>
    );
}