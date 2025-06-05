import * as jStat from 'jstat';
import { BallCounts, BallRoll, WhiteBallPosition, StatisticsData } from '../types/billiards';

/**
 * Determines the color of a ball based on its position relative to the white ball
 */
export const getBallColor = (isLeftOfWhite: boolean, isAboveWhite: boolean): string => {
    if (isLeftOfWhite && isAboveWhite) return '#ff6b6b';      // Left+Above - Red
    if (isLeftOfWhite && !isAboveWhite) return '#ffa726';     // Left+Below - Orange  
    if (!isLeftOfWhite && isAboveWhite) return '#66bb6a';     // Right+Above - Green
    return '#4ecdc4';                                          // Right+Below - Teal
};

/**
 * Determines if a ball position is left of and above the white ball
 */
export const getBallPosition = (ballX: number, ballY: number, whiteBall: WhiteBallPosition) => {
    return {
        isLeftOfWhite: ballX < whiteBall.x,
        
        // above is actually below, because grid is 0 on top left, because of SVG
        isAboveWhite: ballY < whiteBall.y
    };
};

/**
 * Generates a new ball roll with random position and classification
 */
export const generateBallRoll = (whiteBallPos: WhiteBallPosition, timestamp: number): BallRoll => {
    const x = Math.random();
    const y = Math.random();
    const { isLeftOfWhite, isAboveWhite } = getBallPosition(x, y, whiteBallPos);
    
    return {
        x,
        y,
        timestamp,
        isLeftOfWhite,
        isAboveWhite
    };
};

/**
 * Calculates frequentist statistics including MLE and confidence intervals
 */
export const calculateFrequentistStats = (ballCounts: BallCounts): StatisticsData['frequentist'] => {
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

    const z = 1.96; // 95% confidence interval
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

/**
 * Calculates Bayesian statistics for a single parameter
 */
const calculateBayesianParameterStats = (alpha: number, beta: number) => ({
    mean: alpha / (alpha + beta),
    variance: (alpha * beta) / ((alpha + beta + 1) * (alpha + beta) ** 2),
    credibleInterval: [
        jStat.beta.inv(0.025, alpha, beta), 
        jStat.beta.inv(0.975, alpha, beta)
    ] as [number, number],
    alpha,
    beta
});

/**
 * Calculates Bayesian statistics for both X and Y parameters
 */
export const calculateBayesianStats = (
    alphaParams: [number, number], 
    betaParams: [number, number]
): StatisticsData['bayesian'] => {
    return {
        x: calculateBayesianParameterStats(alphaParams[0], betaParams[0]),
        y: calculateBayesianParameterStats(alphaParams[1], betaParams[1])
    };
};

/**
 * Updates Bayesian parameters based on new ball roll results
 */
export const updateBayesianParams = (
    currentAlphaParams: [number, number],
    currentBetaParams: [number, number],
    newLeftCount: number,
    newAboveCount: number,
    totalNewRolls: number
): {
    alphaParams: [number, number];
    betaParams: [number, number];
} => {
    return {
        alphaParams: [
            currentAlphaParams[0] + newLeftCount,
            currentAlphaParams[1] + newAboveCount
        ],
        betaParams: [
            currentBetaParams[0] + (totalNewRolls - newLeftCount),
            currentBetaParams[1] + (totalNewRolls - newAboveCount)
        ]
    };
};

/**
 * Generates likelihood data for plotting marginal likelihood functions
 */
export const generateLikelihoodData = (
    observedCount: number,
    totalRolls: number,
    mle: number,
    range: number = 0.01,
    points: number = 101
): Array<{ p: number; likelihood: number }> => {
    const domainMin = Math.max(0, mle - range);
    const domainMax = Math.min(1, mle + range);
    
    return Array.from({ length: points }, (_, i) => {
        const p = domainMin + (i / (points - 1)) * (domainMax - domainMin);
        const likelihood = jStat.binomial.pdf(observedCount, totalRolls, p);
        return { p, likelihood };
    });
};

/**
 * Generates data for marginal distribution plotting
 */
export const generateMarginalData = (
    alpha: number,
    beta: number,
    points: number = 100
): Array<{ value: number; density: number }> => {
    return Array.from({ length: points }, (_, i) => {
        const value = i / (points - 1);
        return {
            value,
            density: jStat.beta.pdf(value, alpha, beta)
        };
    });
};

/**
 * Generates 2D density data for Bayesian contour visualization
 */
export interface DensityPoint {
    i: number;
    j: number;
    x: number;
    y: number;
    density: number;
}

export const generate2DDensityData = (
    alphaX: number,
    betaX: number,
    alphaY: number,
    betaY: number,
    resolution: number = 80
): { data: DensityPoint[]; maxDensity: number } => {
    const data: DensityPoint[] = [];
    let maxDensity = 0;
    
    for (let i = 0; i < resolution; i++) {
        for (let j = 0; j < resolution; j++) {
            const x = i / (resolution - 1);
            const y = j / (resolution - 1);
            const densityX = jStat.beta.pdf(x, alphaX, betaX);
            const densityY = jStat.beta.pdf(y, alphaY, betaY);
            const jointDensity = densityX * densityY;
            
            data.push({
                i, j, x, y, density: jointDensity
            });
            maxDensity = Math.max(maxDensity, jointDensity);
        }
    }
    
    return { data, maxDensity };
};

/**
 * Filters density data to only include significant density points
 */
export const filterSignificantDensity = (
    densityData: DensityPoint[],
    maxDensity: number,
    threshold: number = 0.1
): DensityPoint[] => {
    return densityData.filter(d => (d.density / maxDensity) >= threshold);
};

/**
 * Calculates opacity for density visualization
 */
export const calculateDensityOpacity = (
    density: number,
    maxDensity: number,
    maxOpacity: number = 0.7
): number => {
    const intensity = density / maxDensity;
    return Math.min(maxOpacity, intensity * 0.8);
};

/**
 * Generates a random white ball position within safe bounds
 */
export const generateRandomWhiteBallPosition = (): WhiteBallPosition => {
    return {
        x: 0.2 + Math.random() * 0.6, // Keep away from edges
        y: 0.2 + Math.random() * 0.6
    };
};

/**
 * Clamps a white ball position to safe bounds
 */
export const clampWhiteBallPosition = (x: number, y: number): WhiteBallPosition => {
    return {
        x: Math.max(0.05, Math.min(0.95, x)),
        y: Math.max(0.05, Math.min(0.95, y))
    };
};

/**
 * Converts click coordinates to table coordinates
 */
export const clickToTableCoordinates = (
    clickX: number,
    clickY: number,
    tableWidth: number,
    tableHeight: number,
    rect: DOMRect
): WhiteBallPosition => {
    const x = (clickX - rect.left) / tableWidth;
    const y = 1.0 - (clickY - rect.top) / tableHeight; // Flip Y coordinate
    
    return clampWhiteBallPosition(x, y);
};

/**
 * Calculates ball opacity based on age and position in display list
 */
export const calculateBallOpacity = (ballIndex: number, maxBalls: number = 15): number => {
    return Math.max(0.2, 1 - (ballIndex / maxBalls));
};

/**
 * Determines if a ball should be highlighted as recent
 */
export const isBallRecent = (timestamp: number, currentTime: number, threshold: number = 1000): boolean => {
    return (currentTime - timestamp) < threshold;
};

/**
 * Formats a confidence/credible interval for display
 */
export const formatInterval = (interval: [number, number], decimals: number = 3): string => {
    return `[${interval[0].toFixed(decimals)}, ${interval[1].toFixed(decimals)}]`;
};

/**
 * Calculates beta distribution quantiles
 */
export const calculateBetaQuantiles = (alpha: number, beta: number): Record<string, number> => {
    const quantiles = [0.0, 0.1, 0.25, 0.5, 0.75, 0.9, 1.0];
    const result: Record<string, number> = {};
    
    quantiles.forEach(q => {
        const key = `${Math.round(q * 100)}%`;
        result[key] = jStat.beta.inv(q, alpha, beta);
    });
    
    return result;
};