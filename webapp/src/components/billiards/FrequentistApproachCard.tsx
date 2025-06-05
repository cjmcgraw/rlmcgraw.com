import { Box, Typography, Card, CardContent, Divider, alpha } from '@mui/material';
import * as React from 'react';
import { BallCounts, WhiteBallPosition, StatisticsData } from '../../types/billiards';
import { BinomialLikelihoodCharts } from './BinomialLikelihoodCharts';
import { PhilosophyBox } from './PhilosophyBox';

interface FrequentistApproachCardProps {
    stats: StatisticsData['frequentist'];
    ballCounts: BallCounts;
    whiteBallPos: WhiteBallPosition;
    showWhiteBall: boolean;
    theme: any;
}

export const FrequentistApproachCard: React.FC<FrequentistApproachCardProps> = ({ 
    stats, 
    ballCounts, 
    whiteBallPos, 
    showWhiteBall, 
    theme 
}) => (
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