import { Box, Typography, Paper, Divider, useTheme, alpha, Button, Slider, Card, CardContent, Grid } from '@mui/material';
import * as React from 'react';
import * as Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import HighchartsHeatmap from 'highcharts/modules/heatmap';
import * as jStat from 'jstat';

// Export metadata for dynamic loading
export const metadata = {
    title: 'Bayes\' Billiards: The Birth of Bayesian Inference',
    excerpt: 'Explore the famous billiards problem that led Thomas Bayes to develop one of the most important concepts in statistics through an interactive simulation...',
    date: '2025-06-03'
};

interface BallRoll {
    x: number;
    y: number;
    timestamp: number;
    isLeftOfWhite: boolean;
}

interface WhiteBallPosition {
    x: number;
    y: number;
}

export default function BayesBilliardsMusing() {
    const theme = useTheme();
    const [rolls, setRolls] = React.useState<BallRoll[]>([]);
    const [whiteBallPos, setWhiteBallPos] = React.useState<WhiteBallPosition>({ x: 0.6, y: 0.5 });
    const [showWhiteBall, setShowWhiteBall] = React.useState(false);
    const [isRolling, setIsRolling] = React.useState(false);
    
    // Bayesian parameters (Beta distribution)
    const [alphaParam, setAlphaParam] = React.useState(1); // successes + 1
    const [betaParam, setBetaParam] = React.useState(1);   // failures + 1

    const tableWidth = 600;
    const tableHeight = 300;

    const rollBall = () => {
        if (isRolling) return;
        
        setIsRolling(true);
        
        // Simulate a ball roll with some physics-like randomness
        const newX = Math.random();
        const newY = 0.2 + Math.random() * 0.6; // Keep balls in middle area
        
        const isLeft = newX < whiteBallPos.x;
        
        const newRoll: BallRoll = {
            x: newX,
            y: newY,
            timestamp: Date.now(),
            isLeftOfWhite: isLeft
        };
        
        // Update Bayesian parameters
        if (isLeft) {
            setAlphaParam(prev => prev + 1);
        } else {
            setBetaParam(prev => prev + 1);
        }
        
        setRolls(prev => [newRoll, ...prev].slice(0, 20));
        
        setTimeout(() => setIsRolling(false), 300);
    };

    const resetExperiment = () => {
        setRolls([]);
        setAlphaParam(1);
        setBetaParam(1);
        setShowWhiteBall(false);
        // Randomly place white ball
        setWhiteBallPos({
            x: 0.2 + Math.random() * 0.6,
            y: 0.5
        });
    };

    const revealWhiteBall = () => {
        setShowWhiteBall(true);
    };

    // Calculate posterior statistics
    const posteriorMean = alphaParam / (alphaParam + betaParam);
    const posteriorVariance = (alphaParam * betaParam) / ((alphaParam + betaParam) ** 2 * (alphaParam + betaParam + 1));
    const credibleInterval = [
        jStat.beta.inv(0.025, alphaParam, betaParam),
        jStat.beta.inv(0.975, alphaParam, betaParam)
    ];

    // Generate heatmap data
    const generateHeatmapData = () => {
        const data = [];
        const resolution = 20;
        
        for (let i = 0; i < resolution; i++) {
            for (let j = 0; j < resolution; j++) {
                const x = i / (resolution - 1);
                const y = j / (resolution - 1);
                
                // Calculate likelihood of white ball being at this position
                let likelihood = 1;
                
                rolls.forEach(roll => {
                    const actuallyLeft = roll.x < x;
                    const observedLeft = roll.isLeftOfWhite;
                    
                    if (actuallyLeft === observedLeft) {
                        likelihood *= 0.95; // High probability for consistent observation
                    } else {
                        likelihood *= 0.05; // Low probability for inconsistent observation
                    }
                });
                
                data.push([i, j, Math.log(likelihood + 0.001)]);
            }
        }
        
        return data;
    };

    // Heatmap chart configuration
    const heatmapOptions: Highcharts.Options = {
        chart: {
            type: 'heatmap',
            backgroundColor: 'transparent',
            height: 250
        },
        title: {
            text: 'Posterior Probability Heatmap',
            style: { color: theme.palette.text.primary }
        },
        xAxis: {
            title: { text: 'X Position', style: { color: theme.palette.text.primary } },
            labels: { style: { color: theme.palette.text.secondary } },
            gridLineColor: theme.palette.divider
        },
        yAxis: {
            title: { text: 'Y Position', style: { color: theme.palette.text.primary } },
            labels: { style: { color: theme.palette.text.secondary } },
            gridLineColor: theme.palette.divider
        },
        colorAxis: {
            min: -10,
            max: 0,
            stops: [
                [0, '#000428'],
                [0.3, '#004e92'],
                [0.6, '#009ffd'],
                [1, '#00d2ff']
            ]
        },
        legend: {
            itemStyle: { color: theme.palette.text.primary }
        },
        series: [{
            name: 'Log Likelihood',
            data: generateHeatmapData(),
            type: 'heatmap'
        }],
        credits: { enabled: false }
    };

    // X-position histogram
    const xHistogramOptions: Highcharts.Options = {
        chart: {
            type: 'area',
            backgroundColor: 'transparent',
            height: 200
        },
        title: {
            text: 'X-Position Posterior Distribution',
            style: { color: theme.palette.text.primary }
        },
        xAxis: {
            title: { text: 'X Position', style: { color: theme.palette.text.primary } },
            labels: { style: { color: theme.palette.text.secondary } },
            min: 0,
            max: 1
        },
        yAxis: {
            title: { text: 'Probability Density', style: { color: theme.palette.text.primary } },
            labels: { style: { color: theme.palette.text.secondary } }
        },
        series: [{
            name: 'Posterior',
            data: Array.from({ length: 100 }, (_, i) => {
                const x = i / 99;
                return [x, jStat.beta.pdf(x, alphaParam, betaParam)];
            }),
            type: 'area',
            color: {
                linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                stops: [
                    [0, alphaParam > betaParam ? '#ff6b6b' : '#4ecdc4'],
                    [1, alphaParam > betaParam ? 'rgba(255, 107, 107, 0.1)' : 'rgba(78, 205, 196, 0.1)']
                ]
            }
        }],
        legend: { enabled: false },
        credits: { enabled: false }
    };

    return (
        <Paper
            elevation={0}
            sx={{
                p: { xs: 3, md: 4 },
                backgroundColor: alpha(theme.palette.background.paper, 0.6),
                backdropFilter: 'blur(10px)',
                border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                borderRadius: 2,
            }}
        >
            <Typography 
                variant="h3" 
                sx={{ 
                    mb: 2,
                    fontWeight: 700,
                    background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                }}
            >
                {metadata.title}
            </Typography>
            
            <Typography variant="body2" sx={{ mb: 3, color: 'text.secondary' }}>
                {new Date(metadata.date).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                })}
            </Typography>

            <Divider sx={{ mb: 4, opacity: 0.1 }} />

            <Box sx={{ 
                '& p': { mb: 3, lineHeight: 1.8 },
                '& h4': { mt: 4, mb: 2, fontWeight: 600 },
                '& code': { 
                    backgroundColor: alpha(theme.palette.primary.main, 0.1),
                    padding: '2px 6px',
                    borderRadius: 1,
                    fontFamily: '"Courier New", monospace',
                }
            }}>
                <Typography variant="body1">
                    In 1763, two years after Thomas Bayes' death, his friend Richard Price published a revolutionary paper 
                    that would change statistics forever. At its heart was a deceptively simple thought experiment: 
                    imagine a billiard table where a white ball is placed at some unknown position, and colored balls 
                    are rolled across it. By observing whether each ball lands to the left or right of the white ball, 
                    can we infer where the white ball is located?
                </Typography>

                <Typography variant="body1">
                    This elegant problem introduced the world to <em>Bayesian inference</em>—the process of updating 
                    our beliefs about unknown parameters as we gather evidence. Let's explore this foundational concept 
                    through an interactive simulation.
                </Typography>

                <Typography variant="h6" component="h4">
                    The Interactive Billiards Table
                </Typography>

                <Card sx={{ mb: 4, backgroundColor: alpha(theme.palette.background.default, 0.3) }}>
                    <CardContent>
                        <Box sx={{ textAlign: 'center', mb: 2 }}>
                            <Button 
                                variant="contained" 
                                onClick={rollBall}
                                disabled={isRolling}
                                sx={{ mr: 2 }}
                            >
                                {isRolling ? 'Rolling...' : 'Roll Ball'}
                            </Button>
                            <Button variant="outlined" onClick={resetExperiment} sx={{ mr: 2 }}>
                                Reset Experiment
                            </Button>
                            <Button 
                                variant="contained" 
                                color="secondary" 
                                onClick={revealWhiteBall}
                                disabled={showWhiteBall}
                            >
                                Reveal White Ball
                            </Button>
                        </Box>

                        {/* Billiards Table */}
                        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
                            <svg width={tableWidth} height={tableHeight} style={{ border: `3px solid ${theme.palette.divider}`, borderRadius: 8, backgroundColor: '#0d5016' }}>
                                {/* Table felt pattern */}
                                <defs>
                                    <pattern id="felt" patternUnits="userSpaceOnUse" width="20" height="20">
                                        <rect width="20" height="20" fill="#0d5016"/>
                                        <circle cx="10" cy="10" r="0.5" fill="#0a4013" opacity="0.3"/>
                                    </pattern>
                                </defs>
                                <rect width="100%" height="100%" fill="url(#felt)"/>
                                
                                {/* Rolled balls with fading opacity */}
                                {rolls.map((roll, index) => {
                                    const opacity = Math.max(0.1, 1 - (index / 20));
                                    const age = Date.now() - roll.timestamp;
                                    const isRecent = age < 1000;
                                    
                                    return (
                                        <circle
                                            key={roll.timestamp}
                                            cx={roll.x * tableWidth}
                                            cy={roll.y * tableHeight}
                                            r={isRecent ? 8 : 6}
                                            fill={roll.isLeftOfWhite ? '#ff6b6b' : '#4ecdc4'}
                                            opacity={opacity}
                                            stroke={isRecent ? '#fff' : 'none'}
                                            strokeWidth={isRecent ? 2 : 0}
                                        />
                                    );
                                })}
                                
                                {/* White ball (hidden until revealed) */}
                                {showWhiteBall && (
                                    <circle
                                        cx={whiteBallPos.x * tableWidth}
                                        cy={whiteBallPos.y * tableHeight}
                                        r={8}
                                        fill="#ffffff"
                                        stroke="#000"
                                        strokeWidth="2"
                                    />
                                )}
                                
                                {/* Vertical line showing current best estimate */}
                                {rolls.length > 0 && (
                                    <line
                                        x1={posteriorMean * tableWidth}
                                        y1={0}
                                        x2={posteriorMean * tableWidth}
                                        y2={tableHeight}
                                        stroke={theme.palette.secondary.main}
                                        strokeWidth="2"
                                        strokeDasharray="5,5"
                                        opacity="0.7"
                                    />
                                )}
                            </svg>
                        </Box>

                        {/* Statistics Display */}
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={3}>
                                <Typography variant="h6" gutterBottom>Rolls: {rolls.length}</Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Left: {rolls.filter(r => r.isLeftOfWhite).length}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Right: {rolls.filter(r => !r.isLeftOfWhite).length}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} md={3}>
                                <Typography variant="h6" gutterBottom>Estimate: {posteriorMean.toFixed(3)}</Typography>
                                <Typography variant="body2" color="text.secondary">
                                    95% CI: [{credibleInterval[0].toFixed(3)}, {credibleInterval[1].toFixed(3)}]
                                </Typography>
                            </Grid>
                            <Grid item xs={12} md={3}>
                                <Typography variant="h6" gutterBottom>Parameters</Typography>
                                <Typography variant="body2" color="text.secondary">
                                    α (successes): {alphaParam}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    β (failures): {betaParam}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} md={3}>
                                <Typography variant="h6" gutterBottom>Uncertainty</Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Variance: {posteriorVariance.toFixed(4)}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Std Dev: {Math.sqrt(posteriorVariance).toFixed(4)}
                                </Typography>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>

                <Typography variant="h6" component="h4">
                    Bayesian Learning in Action
                </Typography>

                <Grid container spacing={3} sx={{ mb: 4 }}>
                    <Grid item xs={12} md={6}>
                        <HighchartsReact highcharts={Highcharts} options={xHistogramOptions} />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <HighchartsReact highcharts={Highcharts} options={heatmapOptions} />
                    </Grid>
                </Grid>

                <Typography variant="body1">
                    What you're witnessing is <strong>Bayesian updating</strong> in real-time. Each ball roll provides 
                    new evidence about the white ball's position. We start with a uniform prior belief (the white ball 
                    is equally likely to be anywhere), and with each observation, we update our posterior distribution 
                    using Bayes' theorem:
                </Typography>

                <Box sx={{ 
                    my: 3, 
                    p: 3, 
                    backgroundColor: alpha(theme.palette.info.main, 0.1),
                    borderRadius: 2,
                    border: `1px solid ${alpha(theme.palette.info.main, 0.3)}`
                }}>
                    <Typography variant="h6" sx={{ mb: 2, color: 'info.main' }}>
                        Bayes' Theorem
                    </Typography>
                    <Typography variant="body1" sx={{ fontFamily: 'monospace', fontSize: '1.1rem' }}>
                        P(θ|data) ∝ P(data|θ) × P(θ)
                    </Typography>
                    <Typography variant="body2" sx={{ mt: 1, color: 'text.secondary' }}>
                        Posterior ∝ Likelihood × Prior
                    </Typography>
                </Box>

                <Typography variant="body1">
                    In our billiards problem, we're using a <strong>Beta distribution</strong> as our prior and posterior. 
                    This is a conjugate prior for the binomial likelihood, meaning our posterior remains in the same 
                    family of distributions. The parameters α and β represent our accumulated evidence: α increases 
                    with each "left" observation, β increases with each "right" observation.
                </Typography>

                <Typography variant="h6" component="h4">
                    The Revolutionary Insight
                </Typography>

                <Typography variant="body1">
                    Bayes' billiards problem was revolutionary because it provided a principled way to quantify uncertainty 
                    and learn from data. Unlike frequentist statistics, which treats parameters as fixed unknowns, 
                    Bayesian inference treats them as random variables with probability distributions that evolve as 
                    we gather evidence.
                </Typography>

                <Typography variant="body1">
                    Notice how our estimate becomes more precise (the distribution narrows) as we collect more data, 
                    but it also shows our remaining uncertainty. The credible interval shrinks, but never disappears 
                    entirely—a honest acknowledgment that we can never be completely certain about the white ball's 
                    true position.
                </Typography>

                <Typography variant="h6" component="h4">
                    Modern Applications
                </Typography>

                <Typography variant="body1">
                    This simple billiards thought experiment underlies countless modern applications: machine learning 
                    algorithms updating their beliefs about model parameters, medical diagnostics combining prior 
                    knowledge with test results, spam filters learning from new emails, and even the algorithms 
                    that power search engines and recommendation systems.
                </Typography>

                <Typography variant="body1">
                    Thomas Bayes gave us more than a mathematical theorem—he provided a framework for rational 
                    thinking under uncertainty. In our age of big data and artificial intelligence, his insights 
                    about learning and belief updating remain as relevant as ever, guiding how we build systems 
                    that can learn, adapt, and make decisions in an uncertain world.
                </Typography>

                <Box sx={{ 
                    mt: 4, 
                    p: 3, 
                    backgroundColor: alpha(theme.palette.secondary.main, 0.1),
                    borderRadius: 2,
                    border: `1px solid ${alpha(theme.palette.secondary.main, 0.3)}`
                }}>
                    <Typography variant="body2" sx={{ fontStyle: 'italic', color: 'text.secondary' }}>
                        Try rolling more balls and watch how the posterior distribution evolves. Notice how quickly 
                        the algorithm learns when the evidence is clear, and how it maintains appropriate uncertainty 
                        when the data is ambiguous. This is the essence of Bayesian thinking—being confident when 
                        warranted, uncertain when appropriate, and always ready to update beliefs in light of new evidence.
                    </Typography>
                </Box>
            </Box>
        </Paper>
    );
}