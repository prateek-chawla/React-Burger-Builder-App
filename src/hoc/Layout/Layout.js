import React, { Component } from "react";
import { connect } from "react-redux";

import classes from "./Layout.css";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";

class Layout extends Component {
	state = {
		showSidedrawer: false,
	};
	closeSidedrawerHandler = () => {
		this.setState({ showSidedrawer: false });
	};
	toggleSidedrawerHandler = () => {
		this.setState(prevState => {
			return { showSidedrawer: !prevState.showSidedrawer };
		});
	};
	render() {
		return (
			<React.Fragment>
				<Toolbar isAuth={this.props.isAuth} toggle={this.toggleSidedrawerHandler} />
				<SideDrawer
					isAuth={this.props.isAuth}
					closed={this.closeSidedrawerHandler}
					showSidedrawer={this.state.showSidedrawer}
				/>
				<main className={classes.Content}>{this.props.children}</main>
			</React.Fragment>
		);
	}
}

const mapStateToProps = state => {
	return {
		isAuth: state.auth.token !== null,
	};
};
export default connect(mapStateToProps)(Layout);
