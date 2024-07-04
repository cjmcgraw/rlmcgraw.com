import { AppBar, Box, Container } from '@mui/material';
import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import SiteAppBar from './components/SiteAppBar';

export default function App() {
    return (
        <Container>
            <SiteAppBar/>
        </Container>
    );
}

document.body.innerHTML = '<div id="app"></div>';
const root = ReactDOM.createRoot(document.getElementById('app'));

root.render(<App/>);