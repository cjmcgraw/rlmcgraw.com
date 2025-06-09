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
    LinkedIn,
    Memory
} from '@mui/icons-material';
import * as React from 'react';

export default function About() {
    const theme = useTheme();

    const skills = [
        { name: 'Software Engineering', level: 98, color: '#4ecdc4' },
        { name: 'Programming', level: 97, color: '#96ceb4' },
        { name: 'Distributed Computing', level: 93, color: '#45b7d1' },
        { name: "*nix Ops", level: 77, color: '#a41dcc'},
        { name: "CI / CD", level: 91, color: '#1eba22' },
        { name: 'Systems Design', level: 96, color: '#feca57' },
        { name: 'Bayesian Statistics', level: 91, color: '#ff6b6b' },
        { name: 'Analytics & Mathematical Modeling', level: 97, color: '#ff9ff3' },
        { name: 'Frontend Engineering', level: 70, color: '#a8a8a8' },
        { name: 'Reactive UI', level: 62, color: '#b8b8b8' },
    ];

    const languages = [
        { name: 'Python', level: 99, color: '#3776ab' },
        { name: 'Java', level: 93, color: '#ed8b00' },
        { name: 'JavaScript/TypeScript', level: 96, color: '#f7df1e' },
        { name: 'PHP', level: 88, color: '#777bb4' },
        { name: 'Perl', level: 72, color: '#39457e' },
        { name: 'SQL', level: 91, color: '#336791' },
        { name: 'Bash', level: 94, color: '#4eaa25' },
        { name: 'Rust', level: 65, color: '#ce422b' },
        { name: 'C++', level: 72, color: '#00599c' },
        { name: 'C', level: 70, color: '#555555' },
    ];

    const frameworks = [
        {
            category: "Containerization",
            level: 93,
            color: '#a41dcc',
            items: "containers, docker, kubernetes, docker swarm"
        },
        {
            category: 'HTTP Backends',
            level: 95,
            color: '#1976d2',
            items: 'gRPC, WebSockets, FastAPI, Flask, Jetty, Servlets, Koa, Next.js'
        },
        {
            category: 'SQL Databases', 
            level: 92,
            color: '#336791',
            items: 'MySQL, PostgreSQL, BigQuery, OLAP/OLTP'
        },
        {
            category: 'NoSQL',
            level: 93,
            color: '#4db33d',
            items: 'Redis, Elasticsearch, MongoDB, MemSQL'
        },
        {
            category: 'Distributed Queues',
            level: 90,
            color: '#ff6b35',
            items: 'Kafka, RabbitMQ, Redis Streams'
        },
        {
            category: 'Mathematical Frameworks',
            level: 91,
            color: '#ff6b6b',
            items: 'TensorFlow, PyTensor, PyTorch, Theano, PyMC, Stan, R, NumPy, SciPy, Scikit-learn'
        },
        {
            category: 'Blob Storage',
            level: 82,
            color: '#f39c12',
            items: 'S3, Google Cloud Storage, Hadoop HDFS'
        }
    ];

    const experiences = [
        {
            title: 'Principal Engineer II',
            company: 'Accretive Technology Group',
            period: '2015 - Present',
            description: 'Lead engineering for dynamic marketing and pricing systems plus recommender systems generating approximately $1B annually. Manage a team of ~10 engineers daily, architecting scalable ML solutions at enterprise scale.'
        },
        {
            title: 'ML Systems Consultant',
            company: 'Stealth Startup', 
            period: '2012 - 2015',
            description: 'Specialized in distributed systems and cloud-based ML computation. Designed and implemented scalable machine learning pipelines for high-throughput data processing. Contact me for more details.'
        },
        {
            title: 'Software Engineer & Analyst',
            company: 'Insurance Sector',
            period: '2009 - 2012',
            description: 'Collaborated with actuaries to build predictively powerful mathematical models. Developed risk assessment algorithms and statistical analysis tools. Contact me for more details.'
        },
        {
            title: 'Software Engineering Consultant',
            company: 'Various Clients',
            period: '2007 - 2009',
            description: 'Full-stack development and system architecture consulting across multiple industries. Delivered custom software solutions for diverse business requirements. Contact me for more details.'
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
                    src="https://lh3.googleusercontent.com/a/ACg8ocJFLQJX230F1TNLshl7r_sWNYbJtc5OVoXT1fArZqWOiuggxwHF=s288-c-no"
                    alt="Carl McGraw"
                    sx={{
                        width: 120,
                        height: 120,
                        mx: 'auto',
                        mb: 3,
                        border: `3px solid ${alpha(theme.palette.primary.main, 0.2)}`
                    }}
                />

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
                    Principal Engineer & ML Systems Architect
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
                            I believe strongly in chaos engineering and have a deep love for Bayesian statistics—not just 
                            as mathematical curiosities, but as powerful frameworks for learning from data and driving 
                            iterative processes that create measurable real-world impact. My approach is fundamentally 
                            empirical: I build systems that can fail gracefully, measure everything that matters, and 
                            evolve based on evidence rather than assumptions.
                        </Typography>

                        <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.8 }}>
                            Empiricism isn't just a preference for me—it's a requirement. I've built my career on the 
                            principle that measurement is fundamental to engineering excellence. Whether designing 
                            billion-dollar recommendation systems or debugging distributed failures, I determine success 
                            and failure from empirical evidence weighted against initial assumptions, then systematically 
                            update processes based on what actually works versus what we thought would work.
                        </Typography>

                        <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.8 }}>
                            This methodology has enabled me to deliver value to organizations through a unique combination 
                            of deep software expertise, mathematical maturity, and data-driven decision making. I don't 
                            just write code—I build learning systems that get smarter over time, measure their own 
                            performance, and adapt to changing conditions. Every line of code should tell a story, 
                            every algorithm should serve a measurable purpose, and every system should teach us something 
                            about the problem we're solving.
                        </Typography>

                        {/* Engineering Philosophy */}
                        <Paper
                            elevation={0}
                            sx={{
                                p: 3,
                                my: 4,
                                backgroundColor: alpha(theme.palette.secondary.main, 0.05),
                                backdropFilter: 'blur(10px)',
                                border: `1px solid ${alpha(theme.palette.secondary.main, 0.1)}`,
                                borderRadius: 2,
                            }}
                        >
                            <Typography variant="h5" sx={{ mb: 3, fontWeight: 600, textAlign: 'center' }}>
                                Engineering Philosophy
                            </Typography>
                            
                            <Grid container spacing={3}>
                                <Grid item xs={12} md={6}>
                                    <Box sx={{ textAlign: 'center' }}>
                                        <TrendingUp sx={{ fontSize: 40, color: theme.palette.secondary.main, mb: 2 }} />
                                        <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, fontSize: '1rem' }}>
                                            Empirical Learning
                                        </Typography>
                                        <Typography variant="body2" sx={{ lineHeight: 1.6, fontSize: '0.85rem' }}>
                                            Continuous learning through empirical data and measurable results. Every decision backed by evidence, every system instrumented for learning, every failure converted into actionable insights for improvement.
                                        </Typography>
                                    </Box>
                                </Grid>
                                
                                <Grid item xs={12} md={6}>
                                    <Box sx={{ textAlign: 'center' }}>
                                        <Psychology sx={{ fontSize: 40, color: theme.palette.secondary.main, mb: 2 }} />
                                        <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, fontSize: '1rem' }}>
                                            Chaos Engineering
                                        </Typography>
                                        <Typography variant="body2" sx={{ lineHeight: 1.6, fontSize: '0.85rem' }}>
                                            Building robust production systems that are self-healing and blast tolerant. Intentionally introducing controlled failures to strengthen systems and ensure graceful degradation under real-world chaos.
                                        </Typography>
                                    </Box>
                                </Grid>
                                
                                <Grid item xs={12} md={6}>
                                    <Box sx={{ textAlign: 'center' }}>
                                        <Code sx={{ fontSize: 40, color: theme.palette.secondary.main, mb: 2 }} />
                                        <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, fontSize: '1rem' }}>
                                            Intentional Code
                                        </Typography>
                                        <Typography variant="body2" sx={{ lineHeight: 1.6, fontSize: '0.85rem' }}>
                                            Maintainable, reasonable, and understandable code that clearly handles its intention. Every line serves a purpose, every abstraction earns its place, and every function tells its story with clarity.
                                        </Typography>
                                    </Box>
                                </Grid>
                                
                                <Grid item xs={12} md={6}>
                                    <Box sx={{ textAlign: 'center' }}>
                                        <Memory sx={{ fontSize: 40, color: theme.palette.secondary.main, mb: 2 }} />
                                        <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, fontSize: '1rem' }}>
                                            Adaptive Systems
                                        </Typography>
                                        <Typography variant="body2" sx={{ lineHeight: 1.6, fontSize: '0.85rem' }}>
                                            Systems that use machine learning and data to feed processes in real time without human intervention. Self-optimizing algorithms that continuously adapt to changing conditions and improve performance autonomously.
                                        </Typography>
                                    </Box>
                                </Grid>
                            </Grid>
                        </Paper>

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

                        <Typography variant="h5" sx={{ mb: 3, mt: 4, fontWeight: 600 }}>
                            Programming Languages
                        </Typography>
                        
                        {languages.map((language, index) => (
                            <Box key={language.name} sx={{ mb: 2 }}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                        {language.name}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {language.level}%
                                    </Typography>
                                </Box>
                                <LinearProgress
                                    variant="determinate"
                                    value={language.level}
                                    sx={{
                                        height: 6,
                                        borderRadius: 3,
                                        backgroundColor: alpha(language.color, 0.1),
                                        '& .MuiLinearProgress-bar': {
                                            backgroundColor: language.color,
                                            borderRadius: 3,
                                        }
                                    }}
                                />
                            </Box>
                        ))}

                        <Typography variant="h5" sx={{ mb: 3, mt: 4, fontWeight: 600 }}>
                            Frameworks & Technologies
                        </Typography>
                        
                        {frameworks.map((framework, index) => (
                            <Box key={framework.category} sx={{ mb: 3 }}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                        {framework.category}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {framework.level}%
                                    </Typography>
                                </Box>
                                <LinearProgress
                                    variant="determinate"
                                    value={framework.level}
                                    sx={{
                                        height: 6,
                                        borderRadius: 3,
                                        backgroundColor: alpha(framework.color, 0.1),
                                        mb: 1,
                                        '& .MuiLinearProgress-bar': {
                                            backgroundColor: framework.color,
                                            borderRadius: 3,
                                        }
                                    }}
                                />
                                <Typography variant="caption" sx={{ color: 'text.secondary', fontStyle: 'italic' }}>
                                    {framework.items}
                                </Typography>
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

                    {/* Education */}
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
                            <School sx={{ mr: 2, color: theme.palette.primary.main }} />
                            Education
                        </Typography>
                        
                        <Box sx={{ mb: 2 }}>
                            <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                                Bachelor's Degree
                            </Typography>
                            <Typography variant="body2" sx={{ color: 'primary.main', mb: 1, fontWeight: 500 }}>
                                University of Washington, Seattle
                            </Typography>
                            <Typography variant="body2" sx={{ lineHeight: 1.6, mb: 2 }}>
                                Focused coursework in probability theory and axiomatic logic, building the mathematical foundations that underpin my approach to software engineering and statistical modeling.
                            </Typography>
                            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                                <Chip 
                                    label="Probability Theory" 
                                    size="small"
                                    variant="outlined"
                                    sx={{ backgroundColor: alpha(theme.palette.info.main, 0.05) }}
                                />
                                <Chip 
                                    label="Axiomatic Logic" 
                                    size="small"
                                    variant="outlined"
                                    sx={{ backgroundColor: alpha(theme.palette.secondary.main, 0.05) }}
                                />
                            </Box>
                        </Box>
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
                            <Box 
                                component="a"
                                href="mailto:contact@rlmcgraw.com"
                                sx={{ 
                                    display: 'flex', 
                                    alignItems: 'center', 
                                    cursor: 'pointer', 
                                    p: 1, 
                                    borderRadius: 1, 
                                    textDecoration: 'none',
                                    color: 'inherit',
                                    '&:hover': { backgroundColor: alpha(theme.palette.primary.main, 0.05) } 
                                }}
                            >
                                <Email sx={{ mr: 2, color: theme.palette.primary.main }} />
                                <Typography variant="body2">contact@rlmcgraw.com</Typography>
                            </Box>
                            
                            <Box 
                                component="a"
                                href="https://github.com/cjmcgraw"
                                target="_blank"
                                rel="noopener noreferrer"
                                sx={{ 
                                    display: 'flex', 
                                    alignItems: 'center', 
                                    cursor: 'pointer', 
                                    p: 1, 
                                    borderRadius: 1, 
                                    textDecoration: 'none',
                                    color: 'inherit',
                                    '&:hover': { backgroundColor: alpha(theme.palette.primary.main, 0.05) } 
                                }}
                            >
                                <GitHub sx={{ mr: 2, color: theme.palette.primary.main }} />
                                <Typography variant="body2">github.com/cjmcgraw</Typography>
                            </Box>
                            
                            <Box 
                                component="a"
                                href="https://linkedin.com/in/rlmcgraw"
                                target="_blank"
                                rel="noopener noreferrer"
                                sx={{ 
                                    display: 'flex', 
                                    alignItems: 'center', 
                                    cursor: 'pointer', 
                                    p: 1, 
                                    borderRadius: 1, 
                                    textDecoration: 'none',
                                    color: 'inherit',
                                    '&:hover': { backgroundColor: alpha(theme.palette.primary.main, 0.05) } 
                                }}
                            >
                                <LinkedIn sx={{ mr: 2, color: theme.palette.primary.main }} />
                                <Typography variant="body2">linkedin.com/in/rlmcgraw</Typography>
                            </Box>
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
}