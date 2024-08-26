import { useRouteError } from 'react-router-dom';
import * as React from 'react';
import { Box, Card, CardHeader, Paper, Typography } from '@mui/material';

export default function ErrorPage() {
    const error = useRouteError() as any;
    console.error(error);

    return (
        <Paper
            sx={{
                display: "flex",
                justifyContent: "center"
            }}
        >
            <Box>
                <Typography variant="h2">
                    Oops!
                </Typography>
                <Typography variant="body1">
                    Sorry, an unexpected error has occurred.
                </Typography>
                <Typography variant="caption">
                    <i>{error.statusText || error.mesage}</i>
                </Typography>
            </Box>
        </Paper>
    )
}