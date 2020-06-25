import React from "react";
import Button from "../../UI/Button/Button";

const orderSummary = props => {
	const ingredientSummary = [];
	const ingredients = Object.keys(props.ingredients);
	for (let ingredient of ingredients) {
		ingredientSummary.push(
			<li key={ingredient}>
				<span style={{ textTransform: "capitalize" }}>{ingredient} : </span>
				{props.ingredients[ingredient]}
			</li>
		);
	}

	return (
		<React.Fragment>
			<h3>Order Summary</h3>
			{ingredientSummary}
			<p>
				<strong>Amount : {props.price.toFixed(2)}</strong>
			</p>
			<Button btnType="Danger" clicked={props.closed}>
				Cancel
			</Button>
			<Button btnType="Success" clicked={props.continuePurchase}>
				Continue
			</Button>
		</React.Fragment>
	);
};

export default orderSummary;
