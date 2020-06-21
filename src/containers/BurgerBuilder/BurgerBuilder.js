import React, { Component } from "react";
import Aux from "../../hoc/Auxiliary";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";

const INGREDIENT_PRICES = {
	salad: 20,
	meat: 60,
	cheese: 15,
	bacon: 30,
};

// const MAX_INGREDIENTS_ALLOWED = {
// 	salad: 2,
// 	meat: 2,
// 	cheese: 2,
// 	bacon: 3,
// };

class BurgerBuilder extends Component {
	state = {
		ingredients: { salad: 0, meat: 0, bacon: 0, cheese: 0 },
		totalPrice: 50,
	};

	addIngredientHandler = type => {
		const updatedCount = this.state.ingredients[type] + 1;
		const updatedPrice = this.state.totalPrice + INGREDIENT_PRICES[type];
		const updatedState = { ...this.state };
		updatedState.ingredients[type] = updatedCount;
		updatedState.totalPrice = updatedPrice;
		this.setState(updatedState);
	};
	removeIngredientHandler = type => {
		if (this.state.ingredients[type] <= 0) return;
		const updatedCount = this.state.ingredients[type] - 1;
		const updatedPrice = this.state.totalPrice - INGREDIENT_PRICES[type];
		const updatedState = { ...this.state };
		updatedState.ingredients[type] = updatedCount;
		updatedState.totalPrice = updatedPrice;
		this.setState(updatedState);
	};

	getDisabledInfo = () => {
		let disabledInfo = { ...this.state.ingredients };
		for (let ingredient of Object.keys(disabledInfo)) {
			disabledInfo[ingredient] = disabledInfo[ingredient] <= 0;
		}
		return disabledInfo;
	};

	render() {
		const disabledInfo = this.getDisabledInfo()
		return (
			<Aux>
				<Burger ingredients={this.state.ingredients} />
				<BuildControls
					ingredientAdded={this.addIngredientHandler}
					ingredientRemoved={this.removeIngredientHandler}
					price={this.state.totalPrice}
					disabledInfo={disabledInfo}
				/>
			</Aux>
		);
	}
}

export default BurgerBuilder;
