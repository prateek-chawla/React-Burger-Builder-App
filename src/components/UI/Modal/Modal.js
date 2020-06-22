import React, { Component } from "react";
import Backdrop from "../Backdrop/Backdrop";

import classes from "./Modal.css";

class Modal extends Component {

	shouldComponentUpdate(nextProps, nextState) {
		return nextProps.showOrderModal !== this.props.showOrderModal;
	}

	render() {
		return (
			<React.Fragment>
				<Backdrop
					showBackdrop={this.props.showOrderModal}
					closed={this.props.closed}
				/>
				<div
					className={classes.Modal}
					style={{
						opacity: this.props.showOrderModal ? "1" : "0",
						transform: this.props.showOrderModal
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
