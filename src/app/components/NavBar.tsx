import React from 'react';
import { AppBar, Toolbar, IconButton, Typography, Avatar } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { memo } from "react";

interface NavBarProps {
    onMenuClick: () => void;
    user: string;
}

const NavBar: React.FC<NavBarProps> = function ({ onMenuClick, user }) {
    return (
        <AppBar position="static">
            <Toolbar>
                <IconButton edge="start" color="inherit" aria-label="menu" onClick={onMenuClick}>
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                   {user}
                </Typography>
                <Avatar />
            </Toolbar>
        </AppBar>
    );
};

export default memo(NavBar);
