import { Box, Typography, Paper, Divider, useTheme, alpha, Button, Card, CardContent, Grid } from '@mui/material';
import * as React from 'react';
import { 
    LineChart, Line, AreaChart, Area, ScatterChart, Scatter, 
    XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    Cell, ReferenceLine, Legend
} from 'recharts';
import * as jStat from 'jstat';

// Custom 2D Histogram Component with Marginal Distributions
const Histogram2DWithMarginals: React.FC<{
    alphaX: number;
    betaX: number;
    alphaY: number;
    betaY: number;
    estimateX: number;
    estimateY: number;
    theme: any;
}> = ({ alphaX, betaX, alphaY, betaY, estimateX, estimateY, theme }) => {
    const width = 400;
    const height = 350;
    const marginTop = 70;
    const marginRight = 70;
    const marginBottom = 40;
    const marginLeft = 40;
    const plotWidth = width - marginLeft - marginRight;
    const plotHeight = height - marginTop - marginBottom;
    
    // Generate 2D histogram data
    const resolution = 25;
    const heatmapData = [];
    let maxDensity = 0;
    
    for (let i = 0; i < resolution; i++) {
        for (let j = 0; j < resolution; j++) {
            const x = i / (resolution - 1);
            const y = j / (resolution - 1);
            const densityX = jStat.beta.pdf(x, alphaX, betaX);
            const densityY = jStat.beta.pdf(y, alphaY, betaY);
            const jointDensity = densityX * densityY;
            
            heatmapData.push({
                i, j, x, y, density: jointDensity
            });
            maxDensity = Math.max(maxDensity, jointDensity);
        }
    }
    
    // Generate marginal distribution data
    const xMarginal = Array.from({length: 100}, (_, i) => {
        const x = i / 99;
        return {
            x,
            density: jStat.beta.pdf(x, alphaX, betaX)
        };
    });
    
    const yMarginal = Array.from({length: 100}, (_, i) => {
        const y = i / 99;
        return {
            y,
            density: jStat.beta.pdf(y, alphaY, betaY)
        };
    });
    
    const maxXDensity = Math.max(...xMarginal.map(d => d.density));
    const maxYDensity = Math.max(...yMarginal.map(d => d.density));
    
    // Color scale
    const colorScale = (density: number) => {
        const intensity = density / maxDensity;
        if (intensity < 0.1) return theme.palette.background.paper;
        if (intensity < 0.3) return alpha(theme.palette.primary.light, 0.3);
        if (intensity < 0.5) return alpha(theme.palette.primary.light, 0.5);
        if (intensity < 0.7) return alpha(theme.palette.primary.main, 0.7);
        return theme.palette.primary.main;
    };
    
    return (
        <svg width={width} height={height}>
            {/* Main 2D histogram */}
            <g transform={`translate(${marginLeft}, ${marginTop})`}>
                {/* Grid lines */}
                <rect 
                    width={plotWidth} 
                    height={plotHeight} 
                    fill="none" 
                    stroke={theme.palette.divider}
                    strokeWidth="1"
                />
                
                {/* Heatmap cells */}
                {heatmapData.map(d => (
                    <rect
                        key={`${d.i}-${d.j}`}
                        x={d.i * plotWidth / resolution}
                        y={plotHeight - (d.j + 1) * plotHeight / resolution}
                        width={plotWidth / resolution + 1}
                        height={plotHeight / resolution + 1}
                        fill={colorScale(d.density)}
                        stroke="none"
                    />
                ))}
                
                {/* Contour lines */}
                {[0.1, 0.3, 0.5, 0.7, 0.9].map(threshold => {
                    const contourLevel = threshold * maxDensity;
                    return (
                        <g key={threshold}>
                            {heatmapData
                                .filter(d => Math.abs(d.density - contourLevel) < maxDensity * 0.05)
                                .map(d => (
                                    <circle
                                        key={`contour-${threshold}-${d.i}-${d.j}`}
                                        cx={d.x * plotWidth}
                                        cy={plotHeight - d.y * plotHeight}
                                        r="1"
                                        fill="none"
                                        stroke={theme.palette.text.secondary}
                                        strokeWidth="0.5"
                                        opacity="0.5"
                                    />
                                ))}
                        </g>
                    );
                })}
                
                {/* Estimated position */}
                <circle
                    cx={estimateX * plotWidth}
                    cy={plotHeight - estimateY * plotHeight}
                    r="6"
                    fill={theme.palette.error.main}
                    stroke={theme.palette.background.paper}
                    strokeWidth="2"
                />
                <line
                    x1={estimateX * plotWidth}
                    y1={0}
                    x2={estimateX * plotWidth}
                    y2={plotHeight}
                    stroke={theme.palette.error.main}
                    strokeWidth="1"
                    strokeDasharray="3,3"
                    opacity="0.5"
                />
                <line
                    x1={0}
                    y1={plotHeight - estimateY * plotHeight}
                    x2={plotWidth}
                    y2={plotHeight - estimateY * plotHeight}
                    stroke={theme.palette.error.main}
                    strokeWidth="1"
                    strokeDasharray="3,3"
                    opacity="0.5"
                />
                
                {/* X axis */}
                <g transform={`translate(0, ${plotHeight})`}>
                    <line x1={0} y1={0} x2={plotWidth} y2={0} stroke={theme.palette.text.primary} />
                    {[0, 0.25, 0.5, 0.75, 1].map(tick => (
                        <g key={tick} transform={`translate(${tick * plotWidth}, 0)`}>
                            <line y1={0} y2={5} stroke={theme.palette.text.primary} />
                            <text
                                y={20}
                                textAnchor="middle"
                                fill={theme.palette.text.primary}
                                fontSize="10"
                            >
                                {tick}
                            </text>
                        </g>
                    ))}
                    <text
                        x={plotWidth / 2}
                        y={35}
                        textAnchor="middle"
                        fill={theme.palette.text.primary}
                        fontSize="12"
                    >
                        X Position
                    </text>
                </g>
                
                {/* Y axis */}
                <g>
                    <line x1={0} y1={0} x2={0} y2={plotHeight} stroke={theme.palette.text.primary} />
                    {[0, 0.25, 0.5, 0.75, 1].map(tick => (
                        <g key={tick} transform={`translate(0, ${plotHeight - tick * plotHeight})`}>
                            <line x1={-5} x2={0} stroke={theme.palette.text.primary} />
                            <text
                                x={-10}
                                textAnchor="end"
                                alignmentBaseline="middle"
                                fill={theme.palette.text.primary}
                                fontSize="10"
                            >
                                {tick}
                            </text>
                        </g>
                    ))}
                    <text
                        x={-25}
                        y={plotHeight / 2}
                        textAnchor="middle"
                        fill={theme.palette.text.primary}
                        fontSize="12"
                        transform={`rotate(-90, -25, ${plotHeight / 2})`}
                    >
                        Y Position
                    </text>
                </g>
            </g>
            
            {/* X marginal distribution (top) */}
            <g transform={`translate(${marginLeft}, 10)`}>
                <rect 
                    width={plotWidth} 
                    height={marginTop - 20} 
                    fill="none" 
                    stroke={theme.palette.divider}
                    strokeWidth="1"
                    opacity="0.3"
                />
                <path
                    d={`M ${xMarginal.map((d, i) => 
                        `${d.x * plotWidth},${(marginTop - 20) - (d.density / maxXDensity) * (marginTop - 25)}`
                    ).join(' L ')}`}
                    fill="none"
                    stroke="#ff6b6b"
                    strokeWidth="2"
                />
                <path
                    d={`M 0,${marginTop - 20} ${xMarginal.map((d, i) => 
                        `L ${d.x * plotWidth},${(marginTop - 20) - (d.density / maxXDensity) * (marginTop - 25)}`
                    ).join(' ')} L ${plotWidth},${marginTop - 20} Z`}
                    fill="#ff6b6b"
                    fillOpacity="0.2"
                />
            </g>
            
            {/* Y marginal distribution (right) */}
            <g transform={`translate(${marginLeft + plotWidth + 10}, ${marginTop})`}>
                <rect 
                    width={marginRight - 20} 
                    height={plotHeight} 
                    fill="none" 
                    stroke={theme.palette.divider}
                    strokeWidth="1"
                    opacity="0.3"
                />
                <path
                    d={`M ${yMarginal.map((d, i) => 
                        `${(d.density / maxYDensity) * (marginRight - 25)},${plotHeight - d.y * plotHeight}`
                    ).join(' L ')}`}
                    fill="none"
                    stroke="#4ecdc4"
                    strokeWidth="2"
                />
                <path
                    d={`M 0,0 ${yMarginal.map((d, i) => 
                        `L ${(d.density / maxYDensity) * (marginRight - 25)},${plotHeight - d.y * plotHeight}`
                    ).join(' ')} L 0,${plotHeight} Z`}
                    fill="#4ecdc4"
                    fillOpacity="0.2"
                />
            </g>
        </svg>
    );
};

// Export metadata for dynamic loading
export const metadata = {
    title: 'Bayes\' Billiards: The Birth of Bayesian Inference',
    excerpt: 'Explore the famous billiards problem that led Thomas Bayes to develop one of the most important concepts in statistics through an interactive simulation...',
    slug: 'bayes-billiards',
    date: '2025-06-03'
};

interface BallRoll {
    x: number;
    y: number;
    timestamp: number;
    isLeftOfWhite: boolean;
    isAboveWhite: boolean;
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
    const [showTable, setShowTable] = React.useState(true);

    // Parameters of x/y coordinates bayesian priors
    const [alphaParams, setAlphaParams] = React.useState([1, 1]); // successes + 1
    const [betaParams, setBetaParams] = React.useState([1, 1]);   // failures + 1

    const tableWidth = 400;
    const tableHeight = 300;

    const rollBall = () => {
        if (isRolling) return;
        
        setIsRolling(true);
        
        // Simulate a ball roll with some physics-like randomness
        const newX = Math.random();
        const newY = Math.random();
        
        const isLeft = newX < whiteBallPos.x;
        const isAbove = newY < whiteBallPos.y;
        
        const newRoll: BallRoll = {
            x: newX,
            y: newY,
            timestamp: Date.now(),
            isLeftOfWhite: isLeft,
            isAboveWhite: isAbove
        };

        const alphaUpdate = [0, 0];
        const betaUpdate = [0, 0];

        if (newX < whiteBallPos.x) {
            alphaUpdate[0] = 1;
        } else {
            betaUpdate[0] = 1;
        }

        if (newY < whiteBallPos.y) {
            alphaUpdate[1] = 1;
        } else {
            betaUpdate[1] = 1;
        }

        setAlphaParams(([a, b]) => [a + alphaUpdate[0], b + alphaUpdate[1]]);
        setBetaParams(([a, b]) => [a + betaUpdate[0], b + betaUpdate[1]]);

        setRolls(prev => [newRoll, ...prev]);
        setTimeout(() => setIsRolling(false), 10);
    };

    const resetExperiment = () => {
        setRolls([]);
        setAlphaParams([1, 1]);
        setBetaParams([1, 1]);
        setShowWhiteBall(false);
        setShowTable(true);
        // Randomly place white ball
        setWhiteBallPos({
            x: 0.1 + Math.random() * 0.8,
            y: 0.1 + Math.random() * 0.8,
        });
    };

    const revealWhiteBall = () => {
        setShowWhiteBall(true);
    };

    function calculatePosterior(pos: 'x'|'y') {
        const idx = pos === 'x' ? 0 : 1;
        const [a, b] = [alphaParams[idx], betaParams[idx]];
        return {
            mean: a / (a + b),
            variance: (a * b) / ((a + b + 1) * (a + b) ** 2),
            credibleInterval: [jStat.beta.inv(0.025, a, b), jStat.beta.inv(0.975, a, b)],
            alpha: a,
            beta: b
        };
    }

    // Calculate posterior statistics
    const betaXStats = calculatePosterior('x');
    const betaYStats = calculatePosterior('y');

    // Generate distribution data for charts
    const generateDistributionData = (alpha: number, beta: number) => {
        const data = [];
        for (let i = 0; i <= 100; i++) {
            const x = i / 100;
            data.push({
                x: x,
                y: jStat.beta.pdf(x, alpha, beta)
            });
        }
        return data;
    };

    const xDistData = generateDistributionData(alphaParams[0], betaParams[0]);
    const yDistData = generateDistributionData(alphaParams[1], betaParams[1]);

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
                                sx={{ mr: 2 }}
                            >
                                Reveal White Ball
                            </Button>
                            <Button 
                                variant="outlined"
                                color="primary"
                                onClick={() => setShowTable(!showTable)}
                            >
                                {showTable ? 'Hide Table' : 'Show Table'}
                            </Button>
                        </Box>

                        {/* Billiards Table and Contour Plot Side by Side */}
                        <Grid container spacing={2} sx={{ mb: 3 }}>
                            <Grid item xs={12} md={6}>
                                {showTable ? (
                                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
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
                                                        fill={roll.isLeftOfWhite && roll.isAboveWhite ? '#ff6b6b' : 
                                                              roll.isLeftOfWhite && !roll.isAboveWhite ? '#ffa726' :
                                                              !roll.isLeftOfWhite && roll.isAboveWhite ? '#66bb6a' : '#4ecdc4'}
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
                                                    cy={(1 -whiteBallPos.y) * tableHeight}
                                                    r={8}
                                                    fill="#ffffff"
                                                    stroke="#000"
                                                    strokeWidth="2"
                                                />
                                            )}
                                            
                                            {/* Crosshairs showing current best estimate */}
                                            {rolls.length > 0 && (
                                                <>
                                                    <line
                                                        x1={betaXStats.mean * tableWidth}
                                                        y1={0}
                                                        x2={betaXStats.mean * tableWidth}
                                                        y2={tableHeight}
                                                        stroke={theme.palette.secondary.main}
                                                        strokeWidth="2"
                                                        strokeDasharray="5,5"
                                                        opacity="0.7"
                                                    />
                                                    <line
                                                        x1={0}
                                                        y1={betaYStats.mean * tableHeight}
                                                        x2={tableWidth}
                                                        y2={betaYStats.mean * tableHeight}
                                                        stroke={theme.palette.secondary.main}
                                                        strokeWidth="2"
                                                        strokeDasharray="5,5"
                                                        opacity="0.7"
                                                    />
                                                </>
                                            )}
                                        </svg>
                                    </Box>
                                ) : (
                                    <Box sx={{ 
                                        p: 3, 
                                        height: tableHeight, 
                                        border: `1px solid ${theme.palette.divider}`, 
                                        borderRadius: 2,
                                        backgroundColor: alpha(theme.palette.background.default, 0.5),
                                        overflowY: 'auto'
                                    }}>
                                        <Typography variant="h6" gutterBottom>Roll Results</Typography>
                                        {rolls.length === 0 ? (
                                            <Typography color="text.secondary">No rolls yet. Click "Roll Ball" to start!</Typography>
                                        ) : (
                                            <Box>
                                                {rolls.slice(0, 10).map((roll, index) => (
                                                    <Typography 
                                                        key={roll.timestamp} 
                                                        variant="body2" 
                                                        sx={{ 
                                                            mb: 0.5,
                                                            opacity: 1 - (index / 15),
                                                            fontWeight: index === 0 ? 'bold' : 'normal'
                                                        }}
                                                    >
                                                        Roll {rolls.length - index}: {' '}
                                                        <Box component="span" sx={{ color: roll.isLeftOfWhite ? '#ff6b6b' : '#4ecdc4' }}>
                                                            {roll.isLeftOfWhite ? 'Left' : 'Right'}
                                                        </Box>
                                                        {' of white, '}
                                                        <Box component="span" sx={{ color: roll.isAboveWhite ? '#66bb6a' : '#ffa726' }}>
                                                            {roll.isAboveWhite ? 'Above' : 'Below'}
                                                        </Box>
                                                        {' white'}
                                                    </Typography>
                                                ))}
                                                {rolls.length > 10 && (
                                                    <Typography variant="caption" color="text.secondary" sx={{ mt: 1 }}>
                                                        ... and {rolls.length - 10} more rolls
                                                    </Typography>
                                                )}
                                            </Box>
                                        )}
                                    </Box>
                                )}
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                    <Histogram2DWithMarginals 
                                        alphaX={alphaParams[0]} 
                                        betaX={betaParams[0]}
                                        alphaY={alphaParams[1]} 
                                        betaY={betaParams[1]}
                                        estimateX={betaXStats.mean}
                                        estimateY={betaYStats.mean}
                                        theme={theme}
                                    />
                                </Box>
                            </Grid>
                        </Grid>

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
                                <Typography variant="body2" color="text.secondary">
                                    Above: {rolls.filter(r => r.isAboveWhite).length}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Below: {rolls.filter(r => !r.isAboveWhite).length}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} md={3}>
                                <Typography variant="h6" gutterBottom>X Estimate</Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Mean: {betaXStats.mean.toFixed(3)}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    95% CI: [{betaXStats.credibleInterval[0].toFixed(3)}, {betaXStats.credibleInterval[1].toFixed(3)}]
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    α: {betaXStats.alpha}, β: {betaXStats.beta}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} md={3}>
                                <Typography variant="h6" gutterBottom>Y Estimate</Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Mean: {betaYStats.mean.toFixed(3)}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    95% CI: [{betaYStats.credibleInterval[0].toFixed(3)}, {betaYStats.credibleInterval[1].toFixed(3)}]
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    α: {betaYStats.alpha}, β: {betaYStats.beta}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} md={3}>
                                <Typography variant="h6" gutterBottom>Uncertainty</Typography>
                                <Typography variant="body2" color="text.secondary">
                                    X Std Dev: {Math.sqrt(betaXStats.variance).toFixed(4)}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Y Std Dev: {Math.sqrt(betaYStats.variance).toFixed(4)}
                                </Typography>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>

                <Typography variant="h6" component="h4">
                    Posterior Distributions
                </Typography>

                <Grid container spacing={3} sx={{ mb: 4 }}>
                    <Grid item xs={12} md={6}>
                        <Typography variant="subtitle1" sx={{ textAlign: 'center', mb: 1 }}>
                            X-Position Posterior Distribution
                        </Typography>
                        <ResponsiveContainer width="100%" height={200}>
                            <AreaChart data={xDistData}>
                                <defs>
                                    <linearGradient id="colorX" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#ff6b6b" stopOpacity={0.8}/>
                                        <stop offset="95%" stopColor="#ff6b6b" stopOpacity={0.1}/>
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="x" ticks={[0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0]}/>
                                <YAxis tick={false} hide/>
                                <Tooltip formatter={(value: number) => value.toFixed(3)} />
                                <Area type="monotone" dataKey="y" stroke="#ff6b6b" fillOpacity={1} fill="url(#colorX)" />
                                <ReferenceLine x={betaXStats.mean} stroke={theme.palette.text.secondary} strokeDasharray="5 5" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Typography variant="subtitle1" sx={{ textAlign: 'center', mb: 1 }}>
                            Y-Position Posterior Distribution
                        </Typography>
                        <ResponsiveContainer width="100%" height={200}>
                            <AreaChart data={yDistData}>
                                <defs>
                                    <linearGradient id="colorY" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#4ecdc4" stopOpacity={0.8}/>
                                        <stop offset="95%" stopColor="#4ecdc4" stopOpacity={0.1}/>
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="x" ticks={[0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0]}/>
                                <YAxis tick={false} hide/>
                                <Tooltip formatter={(value: number) => value.toFixed(3)} />
                                <Area type="monotone" dataKey="y" stroke="#4ecdc4" fillOpacity={1} fill="url(#colorY)" />
                                <ReferenceLine x={betaYStats.mean} stroke={theme.palette.text.secondary} strokeDasharray="5 5" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </Grid>
                </Grid>

                <Typography variant="h6" component="h4">
                    Bayesian Learning in Action
                </Typography>

                <Typography variant="body1">
                    What you're witnessing is <strong>Bayesian updating</strong> in real-time. Each ball roll provides 
                    new evidence about the white ball's position. We start with uniform prior beliefs (the white ball 
                    is equally likely to be anywhere), and with each observation, we update our posterior distributions 
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
                    In our billiards problem, we're using <strong>Beta distributions</strong> for both X and Y positions 
                    as our priors and posteriors. This is a conjugate prior for the binomial likelihood, meaning our 
                    posterior remains in the same family of distributions. The parameters α and β represent our 
                    accumulated evidence: α increases with each "success" (left/above), β increases with each "failure" 
                    (right/below).
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
                    Notice how our estimates become more precise (the distributions narrow) as we collect more data, 
                    but they also show our remaining uncertainty. The credible intervals shrink, but never disappear 
                    entirely—an honest acknowledgment that we can never be completely certain about the white ball's 
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
                        Try rolling more balls and watch how the posterior distributions evolve. Notice how quickly 
                        the algorithm learns when the evidence is clear, and how it maintains appropriate uncertainty 
                        when the data is ambiguous. This is the essence of Bayesian thinking—being confident when 
                        warranted, uncertain when appropriate, and always ready to update beliefs in light of new evidence.
                    </Typography>
                </Box>
            </Box>
        </Paper>
    );
}