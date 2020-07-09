import React from "react";
import BuildControl from "./BuildControl/BuildControl";
import classes from "./BuildControls.css";

const controls = [
	{ label: "Bacon", type: "bacon" },
	{ label: "Cheese", type: "cheese" },
	{ label: "Salad", type: "salad" },
	{ label: "Meat", type: "meat" },
];

const buildControls = props => {
	let BuildControlsArr = [];
	for (let ctrl of controls)
		BuildControlsArr.push(
			<BuildControl
				key={ctrl.label}
				label={ctrl.label}
				added={() => props.ingredientAdded(ctrl.type)}
				removed={() => props.ingredientRemoved(ctrl.type)}
				disableBtn={props.disabledInfo[ctrl.type]}
			/>
		);
	return (
		<React.Fragment>
			<div className={classes.BuildControls}>
				<p>
					Price : <strong>{props.price.toFixed(2)}</strong>
				</p>
				{BuildControlsArr}
				<button className={classes.OrderButton} disabled={!props.purchasable} onClick={props.displayOrderModal}>
					{props.isAuth?'Order Now':'Sign In to Order'}
				</button>
			</div>
		</React.Fragment>
	);
};

export default buildControls;
