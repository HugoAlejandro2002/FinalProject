import React, { useState } from 'react';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PreviewIcon from '@mui/icons-material/Preview';
import SearchIcon from '@mui/icons-material/Search';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import LogoutIcon from '@mui/icons-material/Logout';
import ArticleIcon from '@mui/icons-material/Article';
import { Link, Outlet } from 'react-router-dom';
import NavBar from '../components/NavBar';
import { useDispatch } from '../../context/ThemeProvider';
import { types } from '../../context/themeReducers';

interface MenuItem {
  text: string;
  icon: JSX.Element;
  link: string;
}

const menuItems: MenuItem[] = [
  { text: 'Mis practicas', icon: <ArticleIcon />, link: '/home' },
  { text: 'Solicitar practicas', icon: <SearchIcon />, link: '/pending' },
  { text: 'Resumen', icon: <PreviewIcon />, link: '/done' },
  { text: 'Cerrar sesion', icon: <LogoutIcon />, link: '/logout' },
];

const AppLayout: React.FC = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const dispatch = useDispatch();

  const toggleDrawer = (open: boolean) => () => {
    setIsDrawerOpen(open);
  };

  const handleLogout = () => {
    localStorage.clear();
    dispatch({ type: types.logout });
  };

  const renderMenuItems = () => {
    return (
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton component={Link} to={item.link} onClick={item.text === 'Logout' ? handleLogout : undefined}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    );
  };

  return (
    <div>
      <NavBar onMenuClick={toggleDrawer(true)} />
      <SwipeableDrawer
        anchor="left"
        open={isDrawerOpen}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
      >
        <Box sx={{ width: 250 }} role="presentation">
          {renderMenuItems()}
        </Box>
      </SwipeableDrawer>
      <Outlet />
    </div>
  );
};

export default AppLayout;