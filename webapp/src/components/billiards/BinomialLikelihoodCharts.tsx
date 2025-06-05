import { Box, Typography, alpha } from '@mui/material';
import * as React from 'react';
import { 
    AreaChart, Area, XAxis, YAxis, CartesianGrid, 
    ResponsiveContainer, ReferenceLine
} from 'recharts';
import * as jStat from 'jstat';
import { BallCounts, WhiteBallPosition, StatisticsData } from '../../types/billiards';

interface BinomialLikelihoodChartsProps {
    ballCounts: BallCounts;
    stats: StatisticsData['frequentist'];
    whiteBallPos: WhiteBallPosition;
    showWhiteBall: boolean;
    theme: any;
}

export const BinomialLikelihoodCharts: React.FC<BinomialLikelihoodChartsProps> = ({ 
    ballCounts, 
    stats, 
    whiteBallPos, 
    showWhiteBall, 
    theme 
}) => {
    if (ballCounts.totalRolls === 0) return null;

    const { totalRolls, leftCount, aboveCount } = ballCounts;

    // Generate likelihood data for X position - zoomed around MLE ±5%
    const xDomainMin = Math.max(0, stats.xMLE - 0.05);
    const xDomainMax = Math.min(1, stats.xMLE + 0.05);
    const xLikelihoodData = Array.from({length: 101}, (_, i) => {
        const p = xDomainMin + (i / 100) * (xDomainMax - xDomainMin);
        const likelihood = jStat.binomial.pdf(leftCount, totalRolls, p);
        return {
            p: p,
            likelihood: likelihood
        };
    });

    // Generate likelihood data for Y position - zoomed around MLE ±5%
    const yDomainMin = Math.max(0, stats.yMLE - 0.05);
    const yDomainMax = Math.min(1, stats.yMLE + 0.05);
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
                Marginal Likelihood Functions (Zoomed ±5% around MLE)
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