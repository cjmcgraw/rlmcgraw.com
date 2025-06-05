import { Box, Typography, alpha } from '@mui/material';
import * as React from 'react';

interface PhilosophyBoxProps {
    title: string;
    philosophy: string;
    color: string;
    theme: any;
}

export const PhilosophyBox: React.FC<PhilosophyBoxProps> = ({ 
    title, 
    philosophy, 
    color, 
    theme 
}) => (
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