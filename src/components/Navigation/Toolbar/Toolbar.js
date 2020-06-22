import React from 'react';

import classes from './Toolbar.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';

const toolbar = props => (
	<header className={classes.Toolbar}>
        <DrawerToggle clicked={props.toggle} />
		<Logo height="80%" />
        <NavigationItems DesktopOnly />
	</header>
);

export default toolbar;