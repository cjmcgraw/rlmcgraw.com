import {
    Box,
    Container,
    Typography,
    Paper,
    Grid,
    Chip,
    Button,
    Divider,
    alpha,
    useTheme,
    IconButton,
    Stack,
    Card,
    CardContent,
    Grow,
    Fade,
    List,
    ListItem,
    ListItemIcon,
    ListItemText
} from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import CloudIcon from '@mui/icons-material/Cloud';
import CodeIcon from '@mui/icons-material/Code';
import StorageIcon from '@mui/icons-material/Storage';
import TerminalIcon from '@mui/icons-material/Terminal';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import ScatterPlotIcon from '@mui/icons-material/ScatterPlot';
import HubIcon from '@mui/icons-material/Hub';
import PsychologyIcon from '@mui/icons-material/Psychology';
import BoltIcon from '@mui/icons-material/Bolt';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import * as React from 'react';

export default function About() {
    const theme = useTheme();
    const [isVisible, setIsVisible] = React.useState(false);

    React.useEffect(() => {
        setIsVisible(true);
    }, []);

    const skills = {
        languages: ['Python', 'Java', 'JavaScript', 'TypeScript', 'Bash'],
        ml: ['TensorFlow', 'Keras', 'PyTorch', 'Scikit-learn', 'JAX'],
        mathematics: ['Bayesian Inference', 'MCMC', 'Probabilistic Graphical Models', 'Statistical Learning'],
        distributed: ['Apache Kafka', 'Kubernetes', 'Spark', 'Ray', 'Dask'],
        cloud: ['Google Cloud Platform', 'BigQuery', 'Cloud Build', 'GKE'],
        engineering: ['Chaos Engineering', 'Site Reliability', 'Observability', 'Load Testing']
    };

    const interests = [
        {
            icon: <ScatterPlotIcon />,
            title: 'Bayesian Mathematics',
            description: 'Applying probabilistic reasoning and Bayesian inference to real-world problems, from A/B testing to predictive modeling',
            color: theme.palette.primary.main
        },
        {
            icon: <HubIcon />,
            title: 'Distributed Computing',
            description: 'Building resilient, scalable systems that handle millions of requests while maintaining consistency and performance',
            color: theme.palette.secondary.main
        },
        {
            icon: <PsychologyIcon />,
            title: 'Recommender Systems',
            description: 'Designing personalization algorithms that learn from user behavior to deliver relevant content at scale',
            color: theme.palette.info.main
        },
        {
            icon: <ShowChartIcon />,
            title: 'Dynamic Pricing Algorithms',
            description: 'Developing real-time pricing strategies using reinforcement learning and market dynamics modeling',
            color: theme.palette.success.main
        }
    ];

    const chaosPrinciples = [
        {
            title: 'Build a Hypothesis Around Steady State Behavior',
            description: 'Define measurable output that indicates normal behavior'
        },
        {
            title: 'Vary Real-world Events',
            description: 'Introduce variables that reflect real-world events like server crashes and network partitions'
        },
        {
            title: 'Run Experiments in Production',
            description: 'Test on production traffic to guarantee authenticity and relevance'
        },
        {
            title: 'Automate Experiments to Run Continuously',
            description: 'Automate experiments to run continuously and build confidence in the system'
        },
        {
            title: 'Minimize Blast Radius',
            description: 'Ensure fallback mechanisms and limit the scope of experiments'
        }
    ];

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Fade in={isVisible} timeout={1000}>
                <Box>
                    {/* Hero Section */}
                    <Paper
                        elevation={0}
                        sx={{
                            p: 6,
                            mb: 4,
                            background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.1)} 0%, ${alpha(theme.palette.secondary.main, 0.1)} 100%)`,
                            backdropFilter: 'blur(20px)',
                            border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                            borderRadius: 3,
                            position: 'relative',
                            overflow: 'hidden',
                            '&::before': {
                                content: '""',
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                background: `radial-gradient(circle at 20% 50%, ${alpha(theme.palette.primary.main, 0.1)} 0%, transparent 50%)`,
                                pointerEvents: 'none'
                            }
                        }}
                    >
                        <Typography
                            variant="h2"
                            sx={{
                                fontWeight: 800,
                                mb: 2,
                                background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                                backgroundClip: 'text',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                            }}
                        >
                            About Me
                        </Typography>
                        <Typography variant="h5" color="text.secondary" sx={{ mb: 4, fontWeight: 300 }}>
                            Software Engineer • ML Practitioner • Chaos Engineer
                        </Typography>
                        <Typography variant="body1" sx={{ mb: 3, fontSize: '1.1rem', lineHeight: 1.8 }}>
                            I'm a software engineer passionate about the intersection of mathematics, distributed systems, 
                            and machine learning. My work focuses on building antifragile systems that not only survive 
                            chaos but thrive in it. From Bayesian inference to chaos engineering, I believe in principled 
                            approaches to solving complex problems at scale.
                        </Typography>
                        <Stack direction="row" spacing={2}>
                            <Button
                                variant="contained"
                                startIcon={<GitHubIcon />}
                                href="https://github.com/cjmcgraw"
                                target="_blank"
                                rel="noopener noreferrer"
                                sx={{
                                    background: '#24292e',
                                    '&:hover': {
                                        background: '#1a1e22',
                                        transform: 'translateY(-2px)',
                                        boxShadow: theme.shadows[8]
                                    },
                                    transition: 'all 0.2s ease-in-out'
                                }}
                            >
                                GitHub
                            </Button>
                            <Button
                                variant="contained"
                                startIcon={<RocketLaunchIcon />}
                                href="https://hub.docker.com/u/cjmcgraw"
                                target="_blank"
                                rel="noopener noreferrer"
                                sx={{
                                    background: '#2496ed',
                                    '&:hover': {
                                        background: '#0e7ec4',
                                        transform: 'translateY(-2px)',
                                        boxShadow: theme.shadows[8]
                                    },
                                    transition: 'all 0.2s ease-in-out'
                                }}
                            >
                                Docker Hub
                            </Button>
                        </Stack>
                    </Paper>

                    {/* Core Interests */}
                    <Typography variant="h4" sx={{ mb: 3, fontWeight: 700 }}>
                        Core Interests
                    </Typography>
                    <Grid container spacing={3} sx={{ mb: 6 }}>
                        {interests.map((interest, index) => (
                            <Grid item xs={12} sm={6} md={3} key={index}>
                                <Grow in={isVisible} timeout={1000 + index * 200}>
                                    <Card
                                        sx={{
                                            height: '100%',
                                            background: alpha(theme.palette.background.paper, 0.8),
                                            backdropFilter: 'blur(10px)',
                                            border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                                            transition: 'all 0.3s ease-in-out',
                                            '&:hover': {
                                                transform: 'translateY(-4px)',
                                                boxShadow: theme.shadows[8],
                                                borderColor: interest.color
                                            }
                                        }}
                                    >
                                        <CardContent>
                                            <Box
                                                sx={{
                                                    display: 'inline-flex',
                                                    p: 1.5,
                                                    borderRadius: 2,
                                                    background: `linear-gradient(45deg, ${interest.color}, ${alpha(interest.color, 0.7)})`,
                                                    color: 'white',
                                                    mb: 2
                                                }}
                                            >
                                                {interest.icon}
                                            </Box>
                                            <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>
                                                {interest.title}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                {interest.description}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Grow>
                            </Grid>
                        ))}
                    </Grid>

                    {/* Chaos Engineering Section */}
                    <Paper
                        elevation={0}
                        sx={{
                            p: 4,
                            mb: 6,
                            background: `linear-gradient(135deg, ${alpha(theme.palette.error.main, 0.05)} 0%, ${alpha(theme.palette.warning.main, 0.05)} 100%)`,
                            border: `1px solid ${alpha(theme.palette.error.main, 0.2)}`,
                            borderRadius: 2,
                            position: 'relative',
                            overflow: 'hidden'
                        }}
                    >
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                            <BoltIcon sx={{ fontSize: 40, color: theme.palette.warning.main }} />
                            <Box>
                                <Typography variant="h4" sx={{ fontWeight: 700 }}>
                                    Chaos Engineering
                                </Typography>
                                <Typography variant="subtitle1" color="text.secondary">
                                    Building Confidence Through Controlled Chaos
                                </Typography>
                            </Box>
                        </Box>
                        <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.8 }}>
                            I'm a strong advocate for chaos engineering principles. By intentionally injecting failures 
                            into our systems, we discover weaknesses before they manifest in production. This proactive 
                            approach transforms potential disasters into learning opportunities.
                        </Typography>
                        <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                            The Five Principles of Chaos:
                        </Typography>
                        <List>
                            {chaosPrinciples.map((principle, index) => (
                                <Fade in={isVisible} timeout={1500 + index * 100} key={index}>
                                    <ListItem sx={{ pl: 0 }}>
                                        <ListItemIcon>
                                            <CheckCircleIcon color="success" />
                                        </ListItemIcon>
                                        <ListItemText
                                            primary={principle.title}
                                            secondary={principle.description}
                                            primaryTypographyProps={{ fontWeight: 600 }}
                                        />
                                    </ListItem>
                                </Fade>
                            ))}
                        </List>
                    </Paper>

                    {/* Technical Skills */}
                    <Typography variant="h4" sx={{ mb: 3, fontWeight: 700 }}>
                        Technical Expertise
                    </Typography>
                    <Grid container spacing={3}>
                        {Object.entries(skills).map(([category, items], categoryIndex) => (
                            <Grid item xs={12} md={6} key={category}>
                                <Fade in={isVisible} timeout={1500 + categoryIndex * 200}>
                                    <Paper
                                        elevation={0}
                                        sx={{
                                            p: 3,
                                            background: alpha(theme.palette.background.paper, 0.5),
                                            backdropFilter: 'blur(10px)',
                                            border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                                            borderRadius: 2
                                        }}
                                    >
                                        <Typography
                                            variant="h6"
                                            sx={{
                                                mb: 2,
                                                fontWeight: 600,
                                                textTransform: 'capitalize',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: 1
                                            }}
                                        >
                                            {category === 'languages' && <CodeIcon fontSize="small" />}
                                            {category === 'ml' && <AutoAwesomeIcon fontSize="small" />}
                                            {category === 'mathematics' && <ScatterPlotIcon fontSize="small" />}
                                            {category === 'distributed' && <HubIcon fontSize="small" />}
                                            {category === 'cloud' && <CloudIcon fontSize="small" />}
                                            {category === 'engineering' && <BoltIcon fontSize="small" />}
                                            {category === 'ml' ? 'Machine Learning' : category === 'distributed' ? 'Distributed Systems' : category}
                                        </Typography>
                                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                                            {items.map((skill, index) => (
                                                <Chip
                                                    key={index}
                                                    label={skill}
                                                    sx={{
                                                        background: `linear-gradient(45deg, ${alpha(theme.palette.primary.main, 0.1)}, ${alpha(theme.palette.secondary.main, 0.1)})`,
                                                        border: `1px solid ${alpha(theme.palette.primary.main, 0.3)}`,
                                                        '&:hover': {
                                                            background: `linear-gradient(45deg, ${alpha(theme.palette.primary.main, 0.2)}, ${alpha(theme.palette.secondary.main, 0.2)})`,
                                                        }
                                                    }}
                                                />
                                            ))}
                                        </Box>
                                    </Paper>
                                </Fade>
                            </Grid>
                        ))}
                    </Grid>

                    {/* Philosophy Section */}
                    <Paper
                        elevation={0}
                        sx={{
                            p: 4,
                            mt: 6,
                            background: alpha(theme.palette.background.paper, 0.5),
                            backdropFilter: 'blur(10px)',
                            border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                            borderRadius: 2,
                            textAlign: 'center'
                        }}
                    >
                        <Typography
                            variant="h5"
                            sx={{
                                mb: 2,
                                fontWeight: 700,
                                background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                                backgroundClip: 'text',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                            }}
                        >
                            Engineering Philosophy
                        </Typography>
                        <Typography variant="body1" sx={{ maxWidth: 800, mx: 'auto', lineHeight: 1.8 }}>
                            I believe in building systems that embrace uncertainty rather than fear it. Whether applying 
                            Bayesian methods to quantify uncertainty, designing distributed systems that gracefully handle 
                            partial failures, or implementing recommender systems that learn and adapt, my approach is 
                            grounded in mathematical rigor and engineering pragmatism. The best systems aren't just reliable—they're 
                            antifragile, growing stronger under stress.
                        </Typography>
                    </Paper>
                </Box>
            </Fade>
        </Container>
    );
}