import { Paper, Typography, Divider, useTheme, alpha, Card, CardContent, Grid, Box } from '@mui/material';
import * as React from 'react';
import * as jStat from 'jstat';

// Import utility functions
import {
    generateBallRoll,
    calculateFrequentistStats,
    calculateBayesianStats,
    updateBayesianParams,
    generateRandomWhiteBallPosition,
    clickToTableCoordinates
} from '../../utils/billiards';

// Import all components
import { 
    BallCounts, 
    BallRoll, 
    WhiteBallPosition, 
    StatisticsData
} from '../../types/billiards';
import { BilliardsTable } from '../../components/billiards/BilliardsTable';
import { FrequentistApproachCard } from '../../components/billiards/FrequentistApproachCard';
import { BayesianApproachCard } from '../../components/billiards/BayesianApproachCard';

export const metadata = {
    title: 'Bayes\' Billiards: The Birth of Bayesian Inference',
    excerpt: 'Explore the famous billiards problem that led Thomas Bayes to develop one of the most important concepts in statistics through an interactive simulation...',
    slug: 'bayes-billiards',
    date: '2025-06-03'
};

export const IntroductionSection: React.FC = () => (
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


export const ComparisonSection: React.FC<any> = ({ theme }) => (
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
            const ballRoll = generateBallRoll(whiteBallPos, Date.now() + i);
            
            if (ballRoll.isLeftOfWhite) newLeftCount++;
            if (ballRoll.isAboveWhite) newAboveCount++;
            
            // Create visual ball (limit to reasonable number for performance)
            if (i < 100) { // Only create visual balls for first 100 in a batch
                newVisualBalls.push(ballRoll);
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

        // Update Bayesian parameters using utility function
        const updatedParams = updateBayesianParams(
            alphaParams,
            betaParams,
            newLeftCount,
            newAboveCount,
            k
        );
        setAlphaParams(updatedParams.alphaParams);
        setBetaParams(updatedParams.betaParams);
        
        setTimeout(() => setIsRolling(false), 100);
    };

    const resetExperiment = () => {
        setBallCounts({ totalRolls: 0, leftCount: 0, aboveCount: 0 });
        setVisualBalls([]);
        setAlphaParams([1, 1]);
        setBetaParams([1, 1]);
        setShowWhiteBall(false);
        setIsSettingMode(false);
        setWhiteBallPos(generateRandomWhiteBallPosition());
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
        const newPosition = clickToTableCoordinates(
            event.clientX,
            event.clientY,
            800, // tableWidth
            400, // tableHeight
            rect
        );
        
        setWhiteBallPos(newPosition);
        setShowWhiteBall(true);
        setIsSettingMode(false);
    };

    const frequentistStats = calculateFrequentistStats(ballCounts);
    const bayesianStats = calculateBayesianStats(alphaParams, betaParams);

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
                        isRolling={isRolling}
                        onRollBall={rollBall}
                        onResetExperiment={resetExperiment}
                        onRevealWhiteBall={revealWhiteBall}
                        onToggleSetMode={toggleSetMode}
                        k={k}
                        setK={setK}
                    />

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