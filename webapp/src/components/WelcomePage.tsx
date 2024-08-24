import React from 'react';
import { Box, Typography } from "@mui/material";

const randomStr = (Math.random() + 1).toString().substring(14);
const hellos = [...new Array(100).keys()].map(x => (
    <div key={`hello-world-${x}`}> {randomStr} - {x} </div>
));

export default function () {
    return (
        <Box>
            <Typography>
                Hello, World!
            </Typography>
        </Box>
    )

}