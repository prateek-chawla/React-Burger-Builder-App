import React, { useState } from "react";
import { connect } from "react-redux";

import classes from "./Layout.css";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";

const layout = props => {
	const [showSidedrawer, setShowSidedrawer] = useState(false);
	const closeSidedrawerHandler = () => {
		setShowSidedrawer(false);
	};
	const toggleSidedrawerHandler = () => {
		setShowSidedrawer(!showSidedrawer);
	};

	return (
		<React.Fragment>
			<Toolbar isAuth={props.isAuth} toggle={toggleSidedrawerHandler} />
			<SideDrawer
				isAuth={props.isAuth}
				closed={closeSidedrawerHandler}
				showSidedrawer={showSidedrawer}
			/>
			<main className={classes.Content}>{props.children}</main>
		</React.Fragment>
	);
};

const mapStateToProps = state => {
	return {
		isAuth: state.auth.token !== null,
	};
};
export default connect(mapStateToProps)(layout);
