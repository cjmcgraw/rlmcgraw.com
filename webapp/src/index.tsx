import { AppBar, Box, Container } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import SiteAppBar from './components/SiteAppBar';

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    }
})

export default function App() {
    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <Container>
                <SiteAppBar/>
            </Container>
        </ThemeProvider>
    );
}

document.body.innerHTML = '<div id="app"></div>';
const root = ReactDOM.createRoot(document.getElementById('app'));

root.render(<App/>);