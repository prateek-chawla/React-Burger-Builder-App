import React from "react";
import Backdrop from "../Backdrop/Backdrop";

import classes from "./Modal.css";

const modal = props => {
	return (
		<React.Fragment>
			<Backdrop showBackdrop={props.showModal} closed={props.closed} />
			<div
				className={classes.Modal}
				style={{
					opacity: props.showModal ? "1" : "0",
					transform: props.showModal
						? "translate(0%,0%) scale(1)"
						: "translate(100vw,-100vh) scale(0)",
				}}
			>
				{props.children}
			</div>
		</React.Fragment>
	);
};

export default React.memo(
	modal,
	(prevProps, nextProps) =>
		nextProps.children === prevProps.children &&
		nextProps.showModal === prevProps.showModal
);
