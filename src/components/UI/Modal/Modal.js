import React, { Component } from "react";
import Backdrop from "../Backdrop/Backdrop";

import classes from "./Modal.css";

class Modal extends Component {
	shouldComponentUpdate(nextProps, nextState) {
		return (
			nextProps.children !== this.props.children ||
			nextProps.showModal !== this.props.showModal
		);
	}

	render() {
		return (
			<React.Fragment>
				<Backdrop
					showBackdrop={this.props.showModal}
					closed={this.props.closed}
				/>
				<div
					className={classes.Modal}
					style={{
						opacity: this.props.showModal ? "1" : "0",
						transform: this.props.showModal
							? "translate(0%,0%) scale(1)"
							: "translate(100vw,-100vh) scale(0)",
					}}
				>
					{this.props.children}
				</div>
			</React.Fragment>
		);
	}
}

export default Modal;
