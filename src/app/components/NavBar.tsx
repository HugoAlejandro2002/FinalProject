import * as React from 'react';
import { AppBar, Toolbar, IconButton, Typography, Avatar } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

interface NavBarProps {
    onMenuClick: () => void;
}

const NavBar: React.FC<NavBarProps> = ({ onMenuClick }) => {
    return (
        <AppBar position="static">
            <Toolbar>
                <IconButton edge="start" color="inherit" aria-label="menu" onClick={onMenuClick}>
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Nombre de la App
                </Typography>
                <Avatar />
            </Toolbar>
        </AppBar>
    );
};

export default NavBar;
