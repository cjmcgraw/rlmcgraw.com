// Shared types and interfaces for the Bayes Billiards simulation

export interface BallCounts {
    totalRolls: number;
    leftCount: number;
    aboveCount: number;
}

export interface BallRoll {
    x: number;
    y: number;
    timestamp: number;
    isLeftOfWhite: boolean;
    isAboveWhite: boolean;
}

export interface WhiteBallPosition {
    x: number;
    y: number;
}

export interface StatisticsData {
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