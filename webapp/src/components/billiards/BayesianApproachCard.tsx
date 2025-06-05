import { Box, Typography, Card, CardContent, alpha } from '@mui/material';
import * as React from 'react';
import * as jStat from 'jstat';
import { BallCounts, WhiteBallPosition, StatisticsData } from '../../types/billiards';
import { Histogram2DWithMarginals } from './Histogram2DWithMarginals';
import { PhilosophyBox } from './PhilosophyBox';

interface BayesianApproachCardProps {
    stats: StatisticsData['bayesian'];
    alphaParams: [number, number];
    betaParams: [number, number];
    ballCounts: BallCounts;
    whiteBallPos: WhiteBallPosition;
    showWhiteBall: boolean;
    theme: any;
}

export const BayesianApproachCard: React.FC<BayesianApproachCardProps> = ({ 
    stats, 
    alphaParams, 
    betaParams, 
    ballCounts, 
    whiteBallPos, 
    showWhiteBall, 
    theme 
}) => (
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