import React, { Component } from "react";

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
            return { showSidedrawer: !prevState.showSidedrawer }
        })
    }
	render() {
		return (
			<React.Fragment>
                <Toolbar toggle={this.toggleSidedrawerHandler}/>
				<SideDrawer
					closed={this.closeSidedrawerHandler}
					showSidedrawer={this.state.showSidedrawer}
				/>
				<main className={classes.Content}>{this.props.children}</main>
			</React.Fragment>
		);
	}
}

export default Layout;
