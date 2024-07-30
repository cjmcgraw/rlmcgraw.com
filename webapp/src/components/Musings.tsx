import React from 'react';
import Box from "@mui/material/Box";

const hellos = [...new Array(100).keys()].map(x => (
    <div key={`hello-world-${x}`}> Hello, world {x} </div>
));

export default function () {
    return (<Box>
        {hellos}
    </Box>)

}