import React from "react";

import classes from "./NavigationItems.css";
import NavigationItem from "./NavigationItem/NavigationItem";

const navigationItems = props => {
	let classList = [classes.NavBar];
	if (props.DesktopOnly) classList.push(classes.DesktopOnly);
	return (
		<nav className={classList.join(" ")}>
			<ul className={classes.NavigationItems}>
				<NavigationItem link="/">Burger Builder</NavigationItem>
				{props.isAuth ? (
					<NavigationItem link="/orders">Orders</NavigationItem>
				) : null}
				{props.isAuth ? (
					<NavigationItem link="/logout">Logout</NavigationItem>
				) : (
					<NavigationItem link="/auth">Sign Up</NavigationItem>
				)}
			</ul>
		</nav>
	);
};

export default navigationItems;
