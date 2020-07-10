import React from "react";

import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import classes from "./SideDrawer.css";
import Backdrop from "../../UI/Backdrop/Backdrop";

const sideDrawer = props => {
	let attachedClasses = [classes.SideDrawer, classes.Close];
	if (props.showSidedrawer) {
		attachedClasses = [classes.SideDrawer, classes.Open];
	}

	return (
		<React.Fragment>
			<Backdrop showBackdrop={props.showSidedrawer} closed={props.closed} />
			<div className={attachedClasses.join(" ")} onClick={props.closed}>
				<div className={classes.Logo}>
					<Logo height="10%" />
				</div>
				<NavigationItems isAuth={props.isAuth} />
			</div>
		</React.Fragment>
	);
};

export default sideDrawer;
