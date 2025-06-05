import { Box, alpha } from '@mui/material';
import * as React from 'react';
import * as jStat from 'jstat';
import { WhiteBallPosition } from '../../types/billiards';

interface Histogram2DWithMarginalsProps {
    alphaX: number;
    betaX: number;
    alphaY: number;
    betaY: number;
    whiteBallPos: WhiteBallPosition;
    showWhiteBall: boolean;
    theme: any;
}

export const Histogram2DWithMarginals: React.FC<Histogram2DWithMarginalsProps> = ({ 
    alphaX, 
    betaX, 
    alphaY, 
    betaY, 
    whiteBallPos, 
    showWhiteBall, 
    theme 
}) => {
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