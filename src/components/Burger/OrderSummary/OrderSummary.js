import React from "react";

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
            <h4>Continue to Checkout ? </h4>
		</React.Fragment>
	);
};

export default orderSummary;
