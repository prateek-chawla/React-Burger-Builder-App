import React from "react";

import classes from "./NavigationItems.css";
import NavigationItem from "./NavigationItem/NavigationItem";

const navigationItems = props => {
	let classList = [classes.NavBar];
	if (props.DesktopOnly) classList.push(classes.DesktopOnly);
	return (
		<nav className={classList.join(" ")}>
			<ul className={classes.NavigationItems}>
				<NavigationItem link="/" active>
					Burger Builder
				</NavigationItem>
				<NavigationItem link="/">Checkout</NavigationItem>
			</ul>
		</nav>
	);
};

export default navigationItems;
