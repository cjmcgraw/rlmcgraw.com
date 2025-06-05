import { Box, Typography, Paper, Divider, useTheme, alpha, Button, Card, CardContent, Grid, Chip } from '@mui/material';
import * as React from 'react';
import { 
    LineChart, Line, AreaChart, Area, ScatterChart, Scatter, 
    XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    Cell, ReferenceLine, Legend
} from 'recharts';
import * as jStat from 'jstat';

// Export metadata for dynamic loading
export const metadata = {
    title: 'Bayes\' Billiards: The Birth of Bayesian Inference',
    excerpt: 'Explore the famous billiards problem that led Thomas Bayes to develop one of the most important concepts in statistics through an interactive simulation...',
    slug: 'bayes-billiards',
    date: '2025-06-03'
};

interface BallCounts {
    totalRolls: number;
    leftCount: number;
    aboveCount: number;
}

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

interface StatisticsData {
    frequentist: {
        xMLE: number;
        yMLE: number;
        xConfidenceInterval: [number, number];
        yConfidenceInterval: [number, number];
        xStdError: number;
        yStdError: number;
    };
    bayesian: {
        x: {
            mean: number;
            variance: number;
            credibleInterval: [number, number];
            alpha: number;
            beta: number;
        };
        y: {
            mean: number;
            variance: number;
            credibleInterval: [number, number];
            alpha: number;
            beta: number;
        };
    };
}

// Philosophy Box Component
const PhilosophyBox: React.FC<{
    title: string;
    philosophy: string;
    color: string;
    theme: any;
}> = ({ title, philosophy, color, theme }) => (
    <Box sx={{ 
        mt: 'auto',
        p: 2, 
        backgroundColor: alpha(color, 0.1),
        borderRadius: 1
    }}>
        <Typography variant="caption" color="text.secondary">
            <strong>{title} Philosophy:</strong> {philosophy}
        </Typography>
    </Box>
);

// Control Buttons Component
const ControlButtons: React.FC<{
    onRollBall: () => void;
    onResetExperiment: () => void;
    onRevealWhiteBall: () => void;
    onToggleSetMode: () => void;
    isRolling: boolean;
    showWhiteBall: boolean;
    isSettingMode: boolean;
    k: number;
    setK: (k: number) => void;
}> = ({ onRollBall, onResetExperiment, onRevealWhiteBall, onToggleSetMode, isRolling, showWhiteBall, isSettingMode, k, setK }) => (
    <Box sx={{ textAlign: 'center', mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2, mb: 2, flexWrap: 'wrap' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography variant="body2" sx={{ minWidth: 'fit-content' }}>Roll</Typography>
                <input
                    type="number"
                    value={k}
                    onChange={(e) => {
                        const value = Math.max(1, parseInt(e.target.value) || 1);
                        setK(value);
                    }}
                    min="1"
                    style={{
                        width: '60px',
                        padding: '4px 8px',
                        border: '1px solid #ccc',
                        borderRadius: '4px',
                        fontSize: '14px',
                        textAlign: 'center'
                    }}
                />
                <Typography variant="body2" sx={{ minWidth: 'fit-content' }}>balls</Typography>
            </Box>
            <Button 
                variant="contained" 
                onClick={onRollBall}
                disabled={isRolling || isSettingMode || k < 1}
                sx={{ minWidth: '120px' }}
            >
                {isRolling ? 'Rolling...' : `Roll ${k} Ball${k !== 1 ? 's' : ''}`}
            </Button>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2, flexWrap: 'wrap' }}>
            <Button variant="outlined" onClick={onResetExperiment}>
                Reset Experiment
            </Button>
            <Button 
                variant="contained" 
                color="secondary" 
                onClick={onRevealWhiteBall}
                disabled={showWhiteBall}
            >
                Reveal White Ball
            </Button>
            <Button 
                variant={isSettingMode ? "contained" : "outlined"}
                color="info"
                onClick={onToggleSetMode}
            >
                {isSettingMode ? 'Exit Set Mode' : 'Set White Ball'}
            </Button>
        </Box>
        {isSettingMode && (
            <Typography variant="caption" sx={{ display: 'block', mt: 1, color: 'info.main' }}>
                Click on the table to position the white ball
            </Typography>
        )}
    </Box>
);

// Legend Chips Component
const LegendChips: React.FC<{ theme: any }> = ({ theme }) => (
    <Box sx={{ textAlign: 'center', mb: 3 }}>
        <Box sx={{ mb: 1 }}>
            <Chip 
                label="---- Frequentist Estimate" 
                sx={{ 
                    mr: 2, 
                    backgroundColor: alpha('#ff9800', 0.1),
                    color: '#ff9800',
                    fontWeight: 'bold'
                }}
            />
            <Chip 
                label="Bayesian Credible Region" 
                sx={{ 
                    backgroundColor: alpha(theme.palette.secondary.main, 0.1),
                    color: theme.palette.secondary.main,
                    fontWeight: 'bold'
                }}
            />
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap' }}>
            <Chip size="small" label="Left+Above" sx={{ backgroundColor: '#ff6b6b', color: 'white' }} />
            <Chip size="small" label="Left+Below" sx={{ backgroundColor: '#ffa726', color: 'white' }} />
            <Chip size="small" label="Right+Above" sx={{ backgroundColor: '#66bb6a', color: 'white' }} />
            <Chip size="small" label="Right+Below" sx={{ backgroundColor: '#4ecdc4', color: 'white' }} />
        </Box>
    </Box>
);

// Binomial Likelihood Charts Component
const BinomialLikelihoodCharts: React.FC<{
    ballCounts: BallCounts;
    stats: StatisticsData['frequentist'];
    whiteBallPos: WhiteBallPosition;
    showWhiteBall: boolean;
    theme: any;
}> = ({ ballCounts, stats, whiteBallPos, showWhiteBall, theme }) => {
    if (ballCounts.totalRolls === 0) return null;

    const { totalRolls, leftCount, aboveCount } = ballCounts;

    // Generate likelihood data for X position - zoomed around MLE ±1%
    const xDomainMin = Math.max(0, stats.xMLE - 0.01);
    const xDomainMax = Math.min(1, stats.xMLE + 0.01);
    const xLikelihoodData = Array.from({length: 101}, (_, i) => {
        const p = xDomainMin + (i / 100) * (xDomainMax - xDomainMin);
        const likelihood = jStat.binomial.pdf(leftCount, totalRolls, p);
        return {
            p: p,
            likelihood: likelihood
        };
    });

    // Generate likelihood data for Y position - zoomed around MLE ±1%
    const yDomainMin = Math.max(0, stats.yMLE - 0.01);
    const yDomainMax = Math.min(1, stats.yMLE + 0.01);
    const yLikelihoodData = Array.from({length: 101}, (_, i) => {
        const p = yDomainMin + (i / 100) * (yDomainMax - yDomainMin);
        const likelihood = jStat.binomial.pdf(aboveCount, totalRolls, p);
        return {
            p: p,
            likelihood: likelihood
        };
    });

    return (
        <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle2" gutterBottom>
                Marginal Likelihood Functions (Zoomed ±1% around MLE)
            </Typography>
            
            <Box sx={{ mb: 2 }}>
                <Typography variant="caption" sx={{ display: 'block', mb: 1, textAlign: 'center' }}>
                    X Position Likelihood
                </Typography>
                <ResponsiveContainer width="100%" height={120}>
                    <AreaChart data={xLikelihoodData}>
                        <defs>
                            <linearGradient id="colorXLikelihood" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#ff9800" stopOpacity={0.8}/>
                                <stop offset="95%" stopColor="#ff9800" stopOpacity={0.1}/>
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis 
                            dataKey="p" 
                            type="number"
                            scale="linear"
                            domain={[xDomainMin, xDomainMax]}
                            tickFormatter={(value) => value.toFixed(3)}
                        />
                        <YAxis tick={false}/>
                        <Area 
                            type="monotone" 
                            dataKey="likelihood" 
                            stroke="#ff9800" 
                            fillOpacity={1} 
                            fill="url(#colorXLikelihood)" 
                        />
                        <ReferenceLine 
                            x={stats.xMLE} 
                            stroke={theme.palette.error.main} 
                            strokeDasharray="5 5"
                            strokeWidth={2}
                        />
                        {showWhiteBall && (
                            <ReferenceLine 
                                x={whiteBallPos.x} 
                                stroke="white" 
                                strokeWidth={3}
                            />
                        )}
                    </AreaChart>
                </ResponsiveContainer>
            </Box>

            <Box sx={{ mb: 2 }}>
                <Typography variant="caption" sx={{ display: 'block', mb: 1, textAlign: 'center' }}>
                    Y Position Likelihood
                </Typography>
                <ResponsiveContainer width="100%" height={120}>
                    <AreaChart data={yLikelihoodData}>
                        <defs>
                            <linearGradient id="colorYLikelihood" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#ff9800" stopOpacity={0.8}/>
                                <stop offset="95%" stopColor="#ff9800" stopOpacity={0.1}/>
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis 
                            dataKey="p" 
                            type="number"
                            scale="linear"
                            domain={[yDomainMin, yDomainMax]}
                            tickFormatter={(value) => value.toFixed(3)}
                        />
                        <YAxis tick={false}/>
                        <Area 
                            type="monotone" 
                            dataKey="likelihood" 
                            stroke="#ff9800" 
                            fillOpacity={1} 
                            fill="url(#colorYLikelihood)" 
                        />
                        <ReferenceLine 
                            x={stats.yMLE} 
                            stroke={theme.palette.error.main} 
                            strokeDasharray="5 5"
                            strokeWidth={2}
                        />
                        {showWhiteBall && (
                            <ReferenceLine 
                                x={whiteBallPos.y} 
                                stroke="white" 
                                strokeWidth={3}
                            />
                        )}
                    </AreaChart>
                </ResponsiveContainer>
            </Box>
            
            <Typography variant="caption" color="text.secondary" sx={{ display: 'block', textAlign: 'center' }}>
                Red dashed line shows Maximum Likelihood Estimate (MLE) - Charts zoomed to ±1% around MLE
                {showWhiteBall && <><br />White line shows true ball position</>}
            </Typography>
            
            <Box sx={{ 
                mt: 2, 
                p: 1.5, 
                backgroundColor: alpha('#ff9800', 0.1),
                borderRadius: 1,
                border: `1px solid ${alpha('#ff9800', 0.3)}`
            }}>
                <Typography variant="caption" color="text.secondary" sx={{ fontStyle: 'italic' }}>
                    ⚠️ <strong>Note:</strong> These likelihood curves show the probability of observing our data given different parameter values. 
                    They represent estimates for a single parameterization and are NOT credible intervals. 
                    For Bayesian credible intervals, see the posterior distribution visualization.
                </Typography>
            </Box>
        </Box>
    );
};

// Billiards Table Component
const BilliardsTable: React.FC<{
    ballCounts: BallCounts;
    visualBalls: BallRoll[];
    whiteBallPos: WhiteBallPosition;
    showWhiteBall: boolean;
    frequentistStats: StatisticsData['frequentist'];
    bayesianStats: StatisticsData['bayesian'];
    isSettingMode: boolean;
    onTableClick: (event: React.MouseEvent<SVGSVGElement>) => void;
    theme: any;
}> = ({ ballCounts, visualBalls, whiteBallPos, showWhiteBall, frequentistStats, bayesianStats, isSettingMode, onTableClick, theme }) => {
    const tableWidth = 800;
    const tableHeight = 400;

    // Generate Bayesian contour visualization
    const generateBayesianContour = () => {
        if (ballCounts.totalRolls === 0) return null;
        
        const resolution = 80;
        const contourData = [];
        let maxDensity = 0;
        
        for (let i = 0; i < resolution; i++) {
            for (let j = 0; j < resolution; j++) {
                const x = i / (resolution - 1);
                const y = j / (resolution - 1);
                const densityX = jStat.beta.pdf(x, bayesianStats.x.alpha, bayesianStats.x.beta);
                const densityY = jStat.beta.pdf(y, bayesianStats.y.alpha, bayesianStats.y.beta);
                const jointDensity = densityX * densityY;
                
                contourData.push({
                    i, j, x, y, density: jointDensity
                });
                maxDensity = Math.max(maxDensity, jointDensity);
            }
        }
        
        return contourData.map(d => {
            const intensity = d.density / maxDensity;
            if (intensity < 0.1) return null;
            
            const opacity = Math.min(0.7, intensity * 0.8);
            const cellSize = Math.min(tableWidth, tableHeight) / resolution;
            
            return (
                <rect
                    key={`${d.i}-${d.j}`}
                    x={d.x * tableWidth - cellSize/2}
                    y={tableHeight - d.y * tableHeight - cellSize/2}
                    width={cellSize}
                    height={cellSize}
                    fill={theme.palette.secondary.main}
                    opacity={opacity}
                    rx={cellSize * 0.3}
                    ry={cellSize * 0.3}
                />
            );
        }).filter(Boolean);
    };

    const displayBalls = (roll: BallRoll, idx: number) => {
        const opacity = Math.max(0.2, 1-(idx / 15));
        const age = Date.now() - roll.timestamp;
        const isRecent = age < 1000;
        return (
            <circle
                key={roll.timestamp}
                cx={roll.x * tableWidth}
                cy={tableHeight - roll.y * tableHeight}
                r={isRecent ? 6 : 4}
                fill={roll.isLeftOfWhite && roll.isAboveWhite ? '#ff6b6b' : 
                        roll.isLeftOfWhite && !roll.isAboveWhite ? '#ffa726' :
                        !roll.isLeftOfWhite && roll.isAboveWhite ? '#66bb6a' : '#4ecdc4'}
                opacity={opacity}
                stroke={isRecent ? '#fff' : 'none'}
                strokeWidth={isRecent ? 2 : 0}
            />
        );
    };

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
            <svg 
                width={tableWidth} 
                height={tableHeight} 
                style={{ 
                    border: `4px solid ${isSettingMode ? theme.palette.info.main : theme.palette.divider}`, 
                    borderRadius: theme.shape.borderRadius * 2,
                    backgroundColor: '#0d5016',
                    boxShadow: theme.shadows[4],
                    cursor: isSettingMode ? 'crosshair' : 'default'
                }}
                onClick={isSettingMode ? onTableClick : undefined}
            >
                {/* Table felt pattern */}
                <defs>
                    <pattern id="felt" patternUnits="userSpaceOnUse" width="20" height="20">
                        <rect width="20" height="20" fill="#0d5016"/>
                        <circle cx="10" cy="10" r="0.5" fill="#0a4013" opacity="0.3"/>
                    </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#felt)"/>
                
                {/* Bayesian contour visualization */}
                {!isSettingMode && generateBayesianContour()}
                
                {/* White ball (if revealed or in setting mode) */}
                {(showWhiteBall || isSettingMode) && (
                    <circle
                        cx={whiteBallPos.x * tableWidth}
                        cy={tableHeight - whiteBallPos.y * tableHeight}
                        r="6"
                        fill="white"
                        stroke={isSettingMode ? theme.palette.info.main : "#333"}
                        strokeWidth={isSettingMode ? 3 : 2}
                        opacity={isSettingMode ? 0.8 : 1}
                    />
                )}
                
                {/* Visual balls */}
                {!isSettingMode && visualBalls.map(displayBalls)}
                
                {/* Frequentist estimate crosshairs only */}
                {!isSettingMode && ballCounts.totalRolls > 0 && (
                    <>
                        <line
                            x1={frequentistStats.xMLE * tableWidth}
                            y1={0}
                            x2={frequentistStats.xMLE * tableWidth}
                            y2={tableHeight}
                            stroke="#ff9800"
                            strokeWidth="3"
                            strokeDasharray="8,4"
                            opacity="0.8"
                        />
                        <line
                            x1={0}
                            y1={tableHeight - frequentistStats.yMLE * tableHeight}
                            x2={tableWidth}
                            y2={tableHeight - frequentistStats.yMLE * tableHeight}
                            stroke="#ff9800"
                            strokeWidth="3"
                            strokeDasharray="8,4"
                            opacity="0.8"
                        />
                    </>
                )}
                
                {/* Display ball counts as text overlay */}
                {!isSettingMode && ballCounts.totalRolls > 0 && (
                    <text
                        x={tableWidth - 10}
                        y={20}
                        textAnchor="end"
                        fill="white"
                        fontSize="14"
                        fontWeight="bold"
                        style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}
                    >
                        Total Rolls: {ballCounts.totalRolls}
                    </text>
                )}
            </svg>
        </Box>
    );
};

// 2D Histogram Component with Marginal Distributions
const Histogram2DWithMarginals: React.FC<{
    alphaX: number;
    betaX: number;
    alphaY: number;
    betaY: number;
    whiteBallPos: WhiteBallPosition;
    showWhiteBall: boolean;
    theme: any;
}> = ({ alphaX, betaX, alphaY, betaY, whiteBallPos, showWhiteBall, theme }) => {
    const width = 500;
    const height = 400;
    const marginTop = 60;
    const marginRight = 80;
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
    
    const maxXDensity = Math.max(...xMarginal.map(d => d.density)) || 1;
    const maxYDensity = Math.max(...yMarginal.map(d => d.density)) || 1;
    
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
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <svg 
                width={width} 
                height={height} 
                style={{ 
                    border: `1px solid ${theme.palette.divider}`, 
                    borderRadius: theme.shape.borderRadius,
                    backgroundColor: theme.palette.background.paper
                }}
            >
                {/* Main 2D histogram */}
                <g transform={`translate(${marginLeft}, ${marginTop})`}>
                    {/* Grid */}
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
                    
                    {/* True white ball position (when revealed) */}
                    {showWhiteBall && (
                        <>
                            <circle
                                cx={whiteBallPos.x * plotWidth}
                                cy={plotHeight - whiteBallPos.y * plotHeight}
                                r="2"
                                fill="white"
                                stroke="#333"
                                strokeWidth="2"
                            />
                            <line
                                x1={whiteBallPos.x * plotWidth}
                                y1={0}
                                x2={whiteBallPos.x * plotWidth}
                                y2={plotHeight}
                                stroke="white"
                                strokeWidth="2"
                                opacity="0.7"
                            />
                            <line
                                x1={0}
                                y1={plotHeight - whiteBallPos.y * plotHeight}
                                x2={plotWidth}
                                y2={plotHeight - whiteBallPos.y * plotHeight}
                                stroke="white"
                                strokeWidth="2"
                                opacity="0.7"
                            />
                        </>
                    )}
                    
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
                                    fontSize="11"
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
                                    fontSize="11"
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
                <g transform={`translate(${marginLeft}, 5)`}>
                    <rect 
                        width={plotWidth} 
                        height={marginTop - 15} 
                        fill="none" 
                        stroke={theme.palette.divider}
                        strokeWidth="1"
                        opacity="0.3"
                    />
                    <path
                        d={`M ${xMarginal[0].x * plotWidth},${(marginTop - 15) - (xMarginal[0].density / maxXDensity) * (marginTop - 17)} ${xMarginal.slice(1).map((d, i) => 
                            `L ${d.x * plotWidth},${(marginTop - 15) - (d.density / maxXDensity) * (marginTop - 17)}`
                        ).join(' ')}`}
                        fill="none"
                        stroke={theme.palette.secondary.main}
                        strokeWidth="2"
                    />
                    <path
                        d={`M 0,${marginTop - 15} L ${xMarginal[0].x * plotWidth},${(marginTop - 15) - (xMarginal[0].density / maxXDensity) * (marginTop - 17)} ${xMarginal.slice(1).map((d, i) => 
                            `L ${d.x * plotWidth},${(marginTop - 15) - (d.density / maxXDensity) * (marginTop - 17)}`
                        ).join(' ')} L ${plotWidth},${marginTop - 15} Z`}
                        fill={theme.palette.secondary.main}
                        fillOpacity="0.2"
                    />
                    {/* True position line */}
                    {showWhiteBall && (
                        <line
                            x1={whiteBallPos.x * plotWidth}
                            y1={0}
                            x2={whiteBallPos.x * plotWidth}
                            y2={marginTop - 15}
                            stroke="white"
                            strokeWidth="2"
                            opacity="0.8"
                        />
                    )}
                    <text
                        x={5}
                        y={12}
                        fill={theme.palette.text.secondary}
                        fontSize="9"
                    >
                        P(X)
                    </text>
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
                    {/* Fill area */}
                    <path
                        d={`M 0,${plotHeight} L ${(yMarginal[0].density / maxYDensity) * (marginRight - 22)},${plotHeight - (yMarginal[0].y * plotHeight)} ${yMarginal.slice(1).map((d, i) => {
                            const x = (d.density / maxYDensity) * (marginRight - 22);
                            const y = plotHeight - (d.y * plotHeight);
                            return `L ${x},${y}`;
                        }).join(' ')} L 0,0 Z`}
                        fill={theme.palette.secondary.main}
                        fillOpacity="0.2"
                    />
                    {/* Line */}
                    <path
                        d={`M ${(yMarginal[0].density / maxYDensity) * (marginRight - 22)},${plotHeight - (yMarginal[0].y * plotHeight)} ${yMarginal.slice(1).map((d, i) => {
                            const x = (d.density / maxYDensity) * (marginRight - 22);
                            const y = plotHeight - (d.y * plotHeight);
                            return `L ${x},${y}`;
                        }).join(' ')}`}
                        fill="none"
                        stroke={theme.palette.secondary.main}
                        strokeWidth="2"
                    />
                    {/* True position line */}
                    {showWhiteBall && (
                        <line
                            x1={0}
                            y1={plotHeight - (whiteBallPos.y * plotHeight)}
                            x2={marginRight - 20}
                            y2={plotHeight - (whiteBallPos.y * plotHeight)}
                            stroke="white"
                            strokeWidth="2"
                            opacity="0.8"
                        />
                    )}
                    <text
                        x={(marginRight - 20) / 2}
                        y={plotHeight + 14}
                        textAnchor="middle"
                        alignmentBaseline="middle"
                        fill={theme.palette.text.secondary}
                        fontSize="9"
                    >
                        P(Y)
                    </text>
                </g>
            </svg>
        </Box>
    );
};

// Frequentist Approach Card Component
const FrequentistApproachCard: React.FC<{
    stats: StatisticsData['frequentist'];
    ballCounts: BallCounts;
    whiteBallPos: WhiteBallPosition;
    showWhiteBall: boolean;
    theme: any;
}> = ({ stats, ballCounts, whiteBallPos, showWhiteBall, theme }) => (
    <Card sx={{ 
        width: '100%',
        height: '100%',
        backgroundColor: alpha('#ff9800', 0.05),
        border: `2px solid ${alpha('#ff9800', 0.2)}`,
        display: 'flex',
        flexDirection: 'column'
    }}>
        <CardContent sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <Typography variant="h6" sx={{ mb: 2, color: '#ff9800', fontWeight: 'bold' }}>
                Frequentist Approach
            </Typography>
            
            <BinomialLikelihoodCharts 
                ballCounts={ballCounts} 
                stats={stats} 
                whiteBallPos={whiteBallPos}
                showWhiteBall={showWhiteBall}
                theme={theme} 
            />
            
            <Typography variant="subtitle2" gutterBottom>
                Maximum Likelihood Estimation
            </Typography>
            
            <Box sx={{ mb: 3 }}>
                <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.9rem', mb: 1 }}>
                    <strong>Sample Summary:</strong>
                </Typography>
                <Box sx={{ pl: 1, fontSize: '0.85rem' }}>
                    <Typography variant="body2" color="text.secondary">
                        Total Rolls: {ballCounts.totalRolls}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Left of White Ball: {ballCounts.leftCount} / {ballCounts.totalRolls} = {ballCounts.totalRolls > 0 ? (ballCounts.leftCount / ballCounts.totalRolls).toFixed(3) : '---'}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Above White Ball: {ballCounts.aboveCount} / {ballCounts.totalRolls} = {ballCounts.totalRolls > 0 ? (ballCounts.aboveCount / ballCounts.totalRolls).toFixed(3) : '---'}
                    </Typography>
                </Box>
            </Box>

            <Divider sx={{ my: 2 }} />

            <Typography variant="subtitle2" gutterBottom>X-Position Parameter</Typography>
            <Box sx={{ mb: 2, pl: 1 }}>
                <Typography variant="body2" sx={{ fontWeight: 500, mb: 0.5 }}>
                    MLE: {stats.xMLE.toFixed(3)}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.85rem' }}>
                    <strong>95% Confidence Interval:</strong> [{stats.xConfidenceInterval[0].toFixed(3)}, {stats.xConfidenceInterval[1].toFixed(3)}]
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.85rem' }}>
                    <strong>Standard Error:</strong> {stats.xStdError.toFixed(4)}
                </Typography>
            </Box>

            <Typography variant="subtitle2" gutterBottom>Y-Position Parameter</Typography>
            <Box sx={{ mb: 2, pl: 1 }}>
                <Typography variant="body2" sx={{ fontWeight: 500, mb: 0.5 }}>
                    MLE: {stats.yMLE.toFixed(3)}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.85rem' }}>
                    <strong>95% Confidence Interval:</strong> [{stats.yConfidenceInterval[0].toFixed(3)}, {stats.yConfidenceInterval[1].toFixed(3)}]
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.85rem' }}>
                    <strong>Standard Error:</strong> {stats.yStdError.toFixed(4)}
                </Typography>
            </Box>

            <PhilosophyBox
                title="Frequentist"
                philosophy="Parameters are fixed unknowns. We estimate them using maximum likelihood and quantify uncertainty through confidence intervals based on sampling distributions."
                color="#ff9800"
                theme={theme}
            />
        </CardContent>
    </Card>
);

// Bayesian Approach Card Component
const BayesianApproachCard: React.FC<{
    stats: StatisticsData['bayesian'];
    alphaParams: [number, number];
    betaParams: [number, number];
    ballCounts: BallCounts;
    whiteBallPos: WhiteBallPosition;
    showWhiteBall: boolean;
    theme: any;
}> = ({ stats, alphaParams, betaParams, ballCounts, whiteBallPos, showWhiteBall, theme }) => (
    <Card sx={{ 
        width: '100%',
        height: '100%',
        backgroundColor: alpha(theme.palette.secondary.main, 0.05),
        border: `2px solid ${alpha(theme.palette.secondary.main, 0.2)}`,
        display: 'flex',
        flexDirection: 'column'
    }}>
        <CardContent sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <Typography variant="h6" sx={{ mb: 2, color: 'secondary.main', fontWeight: 'bold' }}>
                Bayesian Approach
            </Typography>
            
            <Typography variant="subtitle2" gutterBottom>
                Joint Posterior Distribution
            </Typography>

            <Box sx={{ mb: 2 }}>
                <Histogram2DWithMarginals 
                    alphaX={alphaParams[0]} 
                    betaX={betaParams[0]}
                    alphaY={alphaParams[1]} 
                    betaY={betaParams[1]}
                    whiteBallPos={whiteBallPos}
                    showWhiteBall={showWhiteBall}
                    theme={theme}
                />
            </Box>

            {/* Mathematical Formulation */}
            <Box sx={{ 
                mb: 3, 
                p: 2, 
                backgroundColor: alpha(theme.palette.secondary.main, 0.05),
                borderRadius: 1,
                border: `1px solid ${alpha(theme.palette.secondary.main, 0.2)}`
            }}>
                <Typography variant="subtitle2" gutterBottom sx={{ color: 'secondary.main' }}>
                    Mathematical Formulation
                </Typography>
                <Box sx={{ fontSize: '1rem', lineHeight: 1.8 }}>
                    <Typography component="div" sx={{ mb: 1.5, fontFamily: 'serif' }}>
                        <strong>Prior:</strong> <em>p</em> ∼ Beta(1, 1)
                    </Typography>
                    <Typography component="div" sx={{ mb: 1.5, fontFamily: 'serif' }}>
                        <strong>Likelihood:</strong> <em>k</em> ∼ Binomial(<em>n</em>, <em>p</em>)
                    </Typography>
                    <Typography component="div" sx={{ mb: 1.5, fontFamily: 'serif' }}>
                        <strong>Posterior:</strong> by the defintion of <em>conditional probability</em>
                    </Typography>
                    <Typography component="div" sx={{ mb: 1.5, fontFamily: 'serif', textIndent: '20px' }}>
                        π(<em>p|k</em>, <em>n</em>) ∝ Binomial(<em>n</em>, <em>p</em>) × Beta(1, 1)
                    </Typography>
                    <Typography component="div" sx={{ mb: 1.5, fontFamily: 'serif', textIndent: '20px' }}>
                        π(<em>p|k</em>, <em>n</em>) = Beta(<em>k</em> + 1, <em>n</em> - <em>k</em> + 1)
                    </Typography>
                    {ballCounts.totalRolls > 0 && (
                        <Typography component="div" sx={{ mt: 2, fontSize: '0.9rem', color: 'text.secondary', fontFamily: 'monospace' }}>
                            <strong>Current Data:</strong><br />
                            • X-direction: <em>k</em> = {ballCounts.leftCount}, <em>n</em> = {ballCounts.totalRolls}<br />
                            • Y-direction: <em>k</em> = {ballCounts.aboveCount}, <em>n</em> = {ballCounts.totalRolls}
                        </Typography>
                    )}
                </Box>
            </Box>

            <Typography variant="subtitle2" gutterBottom>X-Position Parameter</Typography>
            <Box sx={{ mb: 2, pl: 1 }}>
                <Typography variant="body2" sx={{ fontWeight: 500, mb: 0.5 }}>
                    Beta({stats.x.alpha}, {stats.x.beta})
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.85rem', lineHeight: 1.3 }}>
                    <strong>Quantiles:</strong><br />
                    0%: {jStat.beta.inv(0.0, stats.x.alpha, stats.x.beta).toFixed(3)}, 
                    10%: {jStat.beta.inv(0.1, stats.x.alpha, stats.x.beta).toFixed(3)}, 
                    25%: {jStat.beta.inv(0.25, stats.x.alpha, stats.x.beta).toFixed(3)}<br />
                    50%: {jStat.beta.inv(0.5, stats.x.alpha, stats.x.beta).toFixed(3)}, 
                    75%: {jStat.beta.inv(0.75, stats.x.alpha, stats.x.beta).toFixed(3)}, 
                    90%: {jStat.beta.inv(0.9, stats.x.alpha, stats.x.beta).toFixed(3)}, 
                    100%: {jStat.beta.inv(1.0, stats.x.alpha, stats.x.beta).toFixed(3)}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.85rem', mt: 0.5 }}>
                    <strong>95% Credible Interval:</strong> [{stats.x.credibleInterval[0].toFixed(3)}, {stats.x.credibleInterval[1].toFixed(3)}]
                </Typography>
            </Box>

            <Typography variant="subtitle2" gutterBottom>Y-Position Parameter</Typography>
            <Box sx={{ mb: 2, pl: 1 }}>
                <Typography variant="body2" sx={{ fontWeight: 500, mb: 0.5 }}>
                    Beta({stats.y.alpha}, {stats.y.beta})
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.85rem', lineHeight: 1.3 }}>
                    <strong>Quantiles:</strong><br />
                    0%: {jStat.beta.inv(0.0, stats.y.alpha, stats.y.beta).toFixed(3)}, 
                    10%: {jStat.beta.inv(0.1, stats.y.alpha, stats.y.beta).toFixed(3)}, 
                    25%: {jStat.beta.inv(0.25, stats.y.alpha, stats.y.beta).toFixed(3)}<br />
                    50%: {jStat.beta.inv(0.5, stats.y.alpha, stats.y.beta).toFixed(3)}, 
                    75%: {jStat.beta.inv(0.75, stats.y.alpha, stats.y.beta).toFixed(3)}, 
                    90%: {jStat.beta.inv(0.9, stats.y.alpha, stats.y.beta).toFixed(3)}, 
                    100%: {jStat.beta.inv(1.0, stats.y.alpha, stats.y.beta).toFixed(3)}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.85rem', mt: 0.5 }}>
                    <strong>95% Credible Interval:</strong> [{stats.y.credibleInterval[0].toFixed(3)}, {stats.y.credibleInterval[1].toFixed(3)}]
                </Typography>
            </Box>

            <PhilosophyBox
                title="Bayesian"
                philosophy="Parameters are random variables with probability distributions. We start with priors and update them with data to get posteriors that represent our beliefs."
                color={theme.palette.secondary.main}
                theme={theme}
            />
        </CardContent>
    </Card>
);

// Introduction Section Component
const IntroductionSection: React.FC = () => (
    <Box sx={{ 
        '& p': { mb: 3, lineHeight: 1.8 },
        '& h4': { mt: 4, mb: 2, fontWeight: 600 },
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
            through an interactive simulation comparing Frequentist and Bayesian approaches.
        </Typography>
    </Box>
);

// Comparison Section Component
const ComparisonSection: React.FC<{ theme: any }> = ({ theme }) => (
    <Box sx={{ mt: 4 }}>
        <Typography variant="h6" component="h4">
            Comparing the Approaches
        </Typography>

        <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.8 }}>
            Notice how both approaches provide estimates, but they differ fundamentally in their interpretation. 
            The Frequentist approach treats the white ball's position as a fixed unknown value and provides 
            confidence intervals based on the sampling distribution. The Bayesian approach treats the position 
            as a random variable and provides credible intervals representing our degree of belief.
        </Typography>

        <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.8 }}>
            With sufficient data, both approaches converge to similar point estimates, but their uncertainty 
            quantification differs. Bayesian credible intervals have a more intuitive interpretation: 
            "There's a 95% probability the true position lies within this interval." Frequentist confidence 
            intervals are trickier: "If we repeated this experiment many times, 95% of such intervals would 
            contain the true position."
        </Typography>

        <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.8 }}>
            The joint probability distribution in the Bayesian approach shows the full uncertainty structure, 
            revealing correlations and the complete shape of our beliefs—something impossible to capture 
            with simple point estimates and confidence intervals.
        </Typography>

        <Box sx={{ 
            mt: 4, 
            p: 3, 
            backgroundColor: alpha(theme.palette.secondary.main, 0.1),
            borderRadius: 2,
            border: `1px solid ${alpha(theme.palette.secondary.main, 0.3)}`
        }}>
            <Typography variant="body2" sx={{ fontStyle: 'italic', color: 'text.secondary' }}>
                Try rolling more balls and watch how both approaches evolve. Notice how the Bayesian approach 
                naturally incorporates prior knowledge and updates smoothly, while the Frequentist approach 
                relies purely on the observed data. Both have their strengths and are widely used in modern 
                statistics and machine learning.
            </Typography>
        </Box>
    </Box>
);

// Main Component
export default function BayesBilliardsMusing() {
    const theme = useTheme();
    const [ballCounts, setBallCounts] = React.useState<BallCounts>({ totalRolls: 0, leftCount: 0, aboveCount: 0 });
    const [visualBalls, setVisualBalls] = React.useState<BallRoll[]>([]); // For visual display only
    const [whiteBallPos, setWhiteBallPos] = React.useState<WhiteBallPosition>({ x: 0.6, y: 0.5 });
    const [showWhiteBall, setShowWhiteBall] = React.useState(false);
    const [isRolling, setIsRolling] = React.useState(false);
    const [isSettingMode, setIsSettingMode] = React.useState(false);
    const [k, setK] = React.useState(1);

    // Parameters for Bayesian approach - use uniform priors Beta(1,1)
    const [alphaParams, setAlphaParams] = React.useState<[number, number]>([1, 1]); 
    const [betaParams, setBetaParams] = React.useState<[number, number]>([1, 1]);   

    const rollBall = () => {
        if (isRolling || k < 1) return;
        
        setIsRolling(true);
        
        let newLeftCount = 0;
        let newAboveCount = 0;
        const newVisualBalls: BallRoll[] = [];
        
        // Roll k balls and count results + create visual balls for display
        for (let i = 0; i < k; i++) {
            const newX = Math.random();
            const newY = Math.random();
            
            const isLeft = newX < whiteBallPos.x;
            const isAbove = newY < whiteBallPos.y;
            
            if (isLeft) newLeftCount++;
            if (isAbove) newAboveCount++;
            
            // Create visual ball (limit to reasonable number for performance)
            if (i < 100) { // Only create visual balls for first 100 in a batch
                newVisualBalls.push({
                    x: newX,
                    y: newY,
                    timestamp: Date.now() + i,
                    isLeftOfWhite: isLeft,
                    isAboveWhite: isAbove
                });
            }
        }

        // Update counts
        setBallCounts(prev => ({
            totalRolls: prev.totalRolls + k,
            leftCount: prev.leftCount + newLeftCount,
            aboveCount: prev.aboveCount + newAboveCount
        }));

        // Update visual balls (keep only recent ones for performance)
        setVisualBalls(prev => [...newVisualBalls, ...prev].slice(0, 200));

        // Update Bayesian parameters directly
        setAlphaParams(([alphaX, alphaY]) => [
            alphaX + newLeftCount,
            alphaY + newAboveCount
        ]);
        setBetaParams(([betaX, betaY]) => [
            betaX + (k - newLeftCount),
            betaY + (k - newAboveCount)
        ]);
        
        setTimeout(() => setIsRolling(false), 100);
    };

    const resetExperiment = () => {
        setBallCounts({ totalRolls: 0, leftCount: 0, aboveCount: 0 });
        setVisualBalls([]);
        setAlphaParams([1, 1]);
        setBetaParams([1, 1]);
        setShowWhiteBall(false);
        setIsSettingMode(false);
        setWhiteBallPos({
            x: 0.2 + Math.random() * 0.8,
            y: 0.2 + Math.random() * 0.8,
        });
    };

    const revealWhiteBall = () => {
        setShowWhiteBall(true);
    };

    const toggleSetMode = () => {
        setIsSettingMode(!isSettingMode);
    };

    const handleTableClick = (event: React.MouseEvent<SVGSVGElement>) => {
        if (!isSettingMode) return;
        
        const svg = event.currentTarget;
        const rect = svg.getBoundingClientRect();
        const x = (event.clientX - rect.left) / 800;
        const y = 1.0 - (event.clientY - rect.top) / 400; // FIXED: Flip Y coordinate
        
        // Clamp values between 0.05 and 0.95 to keep ball away from edges
        const clampedX = Math.max(0.05, Math.min(0.95, x));
        const clampedY = Math.max(0.05, Math.min(0.95, y));
        
        setWhiteBallPos({ x: clampedX, y: clampedY });
        setShowWhiteBall(true);
        setIsSettingMode(false);
    };

    // Calculate statistics
    const calculateFrequentistStats = (): StatisticsData['frequentist'] => {
        if (ballCounts.totalRolls === 0) {
            return {
                xMLE: 0.5,
                yMLE: 0.5,
                xConfidenceInterval: [0, 1],
                yConfidenceInterval: [0, 1],
                xStdError: 0.5,
                yStdError: 0.5
            };
        }

        const n = ballCounts.totalRolls;
        const xMLE = ballCounts.leftCount / n;
        const yMLE = ballCounts.aboveCount / n;

        const xStdError = Math.sqrt(xMLE * (1 - xMLE) / n);
        const yStdError = Math.sqrt(yMLE * (1 - yMLE) / n);

        const z = 1.96;
        const xConfidenceInterval: [number, number] = [
            Math.max(0, xMLE - z * xStdError),
            Math.min(1, xMLE + z * xStdError)
        ];
        const yConfidenceInterval: [number, number] = [
            Math.max(0, yMLE - z * yStdError),
            Math.min(1, yMLE + z * yStdError)
        ];

        return {
            xMLE,
            yMLE,
            xConfidenceInterval,
            yConfidenceInterval,
            xStdError,
            yStdError
        };
    };

    const calculateBayesianStats = (): StatisticsData['bayesian'] => {
        const calculateStats = (alpha: number, beta: number) => ({
            mean: alpha / (alpha + beta),
            variance: (alpha * beta) / ((alpha + beta + 1) * (alpha + beta) ** 2),
            credibleInterval: [jStat.beta.inv(0.025, alpha, beta), jStat.beta.inv(0.975, alpha, beta)] as [number, number],
            alpha,
            beta
        });

        return {
            x: calculateStats(alphaParams[0], betaParams[0]),
            y: calculateStats(alphaParams[1], betaParams[1])
        };
    };

    const frequentistStats = calculateFrequentistStats();
    const bayesianStats = calculateBayesianStats();

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

            <IntroductionSection />

            <Typography variant="h6" component="h4">
                The Interactive Billiards Table
            </Typography>

            <Card sx={{ mb: 4, backgroundColor: alpha(theme.palette.background.default, 0.3) }}>
                <CardContent>
                    <ControlButtons
                        onRollBall={rollBall}
                        onResetExperiment={resetExperiment}
                        onRevealWhiteBall={revealWhiteBall}
                        onToggleSetMode={toggleSetMode}
                        isRolling={isRolling}
                        showWhiteBall={showWhiteBall}
                        isSettingMode={isSettingMode}
                        k={k}
                        setK={setK}
                    />

                    <BilliardsTable
                        ballCounts={ballCounts}
                        visualBalls={visualBalls}
                        whiteBallPos={whiteBallPos}
                        showWhiteBall={showWhiteBall}
                        frequentistStats={frequentistStats}
                        bayesianStats={bayesianStats}
                        isSettingMode={isSettingMode}
                        onTableClick={handleTableClick}
                        theme={theme}
                    />

                    <LegendChips theme={theme} />

                    {/* Two-column layout for approaches */}
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6} sx={{ display: 'flex' }}>
                            <FrequentistApproachCard
                                stats={frequentistStats}
                                ballCounts={ballCounts}
                                whiteBallPos={whiteBallPos}
                                showWhiteBall={showWhiteBall}
                                theme={theme}
                            />
                        </Grid>

                        <Grid item xs={12} md={6} sx={{ display: 'flex' }}>
                            <BayesianApproachCard
                                stats={bayesianStats}
                                alphaParams={alphaParams}
                                betaParams={betaParams}
                                ballCounts={ballCounts}
                                whiteBallPos={whiteBallPos}
                                showWhiteBall={showWhiteBall}
                                theme={theme}
                            />
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>

            <ComparisonSection theme={theme} />
        </Paper>
    );
}