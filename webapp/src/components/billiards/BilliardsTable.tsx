import { alpha, Box, Button, Chip, Typography } from '@mui/material';
import * as React from 'react';
import * as jStat from 'jstat';
import { BallCounts, BallRoll, WhiteBallPosition, StatisticsData } from '../../types/billiards';
import { theme } from 'highcharts';

interface BilliardsTableProps {
    ballCounts: BallCounts;
    visualBalls: BallRoll[];
    whiteBallPos: WhiteBallPosition;
    showWhiteBall: boolean;
    frequentistStats: StatisticsData['frequentist'];
    bayesianStats: StatisticsData['bayesian'];
    isSettingMode: boolean;
    onTableClick: (event: React.MouseEvent<SVGSVGElement>) => void;
    theme: any;
    onRollBall: () => void;
    onResetExperiment: () => void;
    onRevealWhiteBall: () => void;
    onToggleSetMode: () => void;
    isRolling: boolean;
    k: number;
    setK: (k: number) => void;
}



export const LegendChips: React.FC<any> = ({ theme }) => (
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
            <Chip size="small" label="Left+Below" sx={{ backgroundColor: '#ffa726', color: 'white' }} />
            <Chip size="small" label="Left+Above" sx={{ backgroundColor: '#ff6b6b', color: 'white' }} />
            <Chip size="small" label="Right+Below" sx={{ backgroundColor: '#4ecdc4', color: 'white' }} />
            <Chip size="small" label="Right+Above" sx={{ backgroundColor: '#66bb6a', color: 'white' }} />
        </Box>
    </Box>
);

export const BilliardsTable: React.FC<BilliardsTableProps> = (props) => {
    const tableWidth = 800;
    const tableHeight = 400;

    // Generate Bayesian contour visualization
    const generateBayesianContour = () => {
        if (props.ballCounts.totalRolls === 0) return null;
        
        const resolution = 80;
        const contourData = [];
        let maxDensity = 0;
        
        for (let i = 0; i < resolution; i++) {
            for (let j = 0; j < resolution; j++) {
                const x = i / (resolution - 1);
                const y = j / (resolution - 1);
                const densityX = jStat.beta.pdf(x, props.bayesianStats.x.alpha, props.bayesianStats.x.beta);
                const densityY = jStat.beta.pdf(y, props.bayesianStats.y.alpha, props.bayesianStats.y.beta);
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
                    fill={props.theme.palette.secondary.main}
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
        
        // this is a little strange. Above and below are flipped technically, because
        // we are dropping these on a grid. So we need a weird mapping. Remember this is critical!
        const [left, above] = [roll.isLeftOfWhite, !roll.isAboveWhite]
        return (
            <circle
                key={roll.timestamp}
                cx={roll.x * tableWidth}
                cy={tableHeight - roll.y * tableHeight}
                r={isRecent ? 6 : 4}
                fill={left && above ? '#ff6b6b' : 
                        left && !above ? '#ffa726' :
                        !left && above ? '#66bb6a' : 
                        '#4ecdc4'
                    }
                opacity={opacity}
                stroke={isRecent ? '#fff' : 'none'}
                strokeWidth={isRecent ? 2 : 0}
            />
        );
    };

    const ControlButtons = () => (
        <Box sx={{ textAlign: 'center', mb: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2, mb: 2, flexWrap: 'wrap' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography variant="body2" sx={{ minWidth: 'fit-content' }}>Roll</Typography>
                    <input
                        type="number"
                        value={props.k}
                        onChange={(e) => {
                            const value = Math.max(1, parseInt(e.target.value) || 1);
                            props.setK(value);
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
                    onClick={props.onRollBall}
                    disabled={props.isRolling || props.isSettingMode || props.k < 1}
                    sx={{ minWidth: '120px' }}
                >
                    {props.isRolling ? 'Rolling...' : `Roll ${props.k} Ball${props.k !== 1 ? 's' : ''}`}
                </Button>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2, flexWrap: 'wrap' }}>
                <Button variant="outlined" onClick={props.onResetExperiment}>
                    Reset Experiment
                </Button>
                <Button 
                    variant="contained" 
                    color="secondary" 
                    onClick={props.onRevealWhiteBall}
                    disabled={props.showWhiteBall}
                >
                    Reveal White Ball
                </Button>
                <Button 
                    variant={props.isSettingMode ? "contained" : "outlined"}
                    color="info"
                    onClick={props.onToggleSetMode}
                >
                    {props.isSettingMode ? 'Exit Set Mode' : 'Set White Ball'}
                </Button>
            </Box>
            {props.isSettingMode && (
                <Typography variant="caption" sx={{ display: 'block', mt: 1, color: 'info.main' }}>
                    Click on the table to position the white ball
                </Typography>
            )}
        </Box>
    );

    const BilliardsTableDisplay = () => (
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
            <svg 
                width={tableWidth} 
                height={tableHeight} 
                style={{ 
                    border: `4px solid ${props.isSettingMode ? props.theme.palette.info.main : props.theme.palette.divider}`, 
                    borderRadius: props.theme.shape.borderRadius * 2,
                    backgroundColor: '#0d5016',
                    boxShadow: props.theme.shadows[4],
                    cursor: props.isSettingMode ? 'crosshair' : 'default'
                }}
                onClick={props.isSettingMode ? props.onTableClick : undefined}
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
                {!props.isSettingMode && generateBayesianContour()}
                
                {/* White ball (if revealed or in setting mode) */}
                {(props.showWhiteBall || props.isSettingMode) && (
                    <circle
                        cx={props.whiteBallPos.x * tableWidth}
                        cy={tableHeight - props.whiteBallPos.y * tableHeight}
                        r="6"
                        fill="white"
                        stroke={props.isSettingMode ? props.theme.palette.info.main : "#333"}
                        strokeWidth={props.isSettingMode ? 3 : 2}
                        opacity={props.isSettingMode ? 0.8 : 1}
                    />
                )}
                
                {/* Visual balls */}
                {!props.isSettingMode && props.visualBalls.map(displayBalls)}
                
                {/* Frequentist estimate crosshairs only */}
                {!props.isSettingMode && props.ballCounts.totalRolls > 0 && (
                    <>
                        <line
                            x1={props.frequentistStats.xMLE * tableWidth}
                            y1={0}
                            x2={props.frequentistStats.xMLE * tableWidth}
                            y2={tableHeight}
                            stroke="#ff9800"
                            strokeWidth="3"
                            strokeDasharray="8,4"
                            opacity="0.8"
                        />
                        <line
                            x1={0}
                            y1={tableHeight - props.frequentistStats.yMLE * tableHeight}
                            x2={tableWidth}
                            y2={tableHeight - props.frequentistStats.yMLE * tableHeight}
                            stroke="#ff9800"
                            strokeWidth="3"
                            strokeDasharray="8,4"
                            opacity="0.8"
                        />
                    </>
                )}
                
                {/* Display ball counts as text overlay */}
                {!props.isSettingMode && props.ballCounts.totalRolls > 0 && (
                    <text
                        x={tableWidth - 10}
                        y={20}
                        textAnchor="end"
                        fill="grey"
                        fontSize="14"
                        fontWeight="bold"
                        opacity={0.5}
                        style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}
                    >
                        Total Rolls: {props.ballCounts.totalRolls}
                    </text>
                )}
            </svg>
        </Box>
    );

    return (
        <>
        <ControlButtons />
        <BilliardsTableDisplay/>
        <LegendChips theme={props.theme} />
        </>
    );
};