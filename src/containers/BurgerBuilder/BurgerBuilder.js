import React, { Component } from "react";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import axios from "../../axios-orders";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

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
		ingredients: null,
		totalPrice: 50,
		isPurchasable: false,
		showModal: false,
		loading: false,
		error: false,
	};

	componentDidMount() {
		axios
			.get("https://react-burger-builder-5c613.firebaseio.com/ingredients.json")
			.then(response => {
				this.setState({ ingredients: response.data });
			})
			.catch(error => {
				this.setState({ error: error });
			});
	}

	updatePurchasableState(ingredients) {
		const qty = Object.values(ingredients);
		const totalQty = qty.reduce((sum, el) => sum + el, 0);
		this.setState({ isPurchasable: totalQty > 0 });
	}

	orderModalHandler = () => {
		this.setState(prevState => {
			return { showModal: !prevState.showModal };
		});
	};

	continuePurchaseHandler = () => {
		let queryString = "?";
		const ingredientParams = [];
		for (let [ingredient, qty] of Object.entries(this.state.ingredients)) {
			ingredientParams.push(`${ingredient}=${qty}`);
		}
		ingredientParams.push(`price=${this.state.totalPrice}`);
		queryString += ingredientParams.join("&");

		this.props.history.push({ pathname: "/checkout", search: queryString });
	};

	addIngredientHandler = type => {
		const updatedCount = this.state.ingredients[type] + 1;
		const updatedPrice = this.state.totalPrice + INGREDIENT_PRICES[type];
		const updatedState = { ...this.state };
		updatedState.ingredients[type] = updatedCount;
		updatedState.totalPrice = updatedPrice;
		this.setState(updatedState);
		this.updatePurchasableState(updatedState.ingredients);
	};

	removeIngredientHandler = type => {
		if (this.state.ingredients[type] <= 0) return;
		const updatedCount = this.state.ingredients[type] - 1;
		const updatedPrice = this.state.totalPrice - INGREDIENT_PRICES[type];
		const updatedState = { ...this.state };
		updatedState.ingredients[type] = updatedCount;
		updatedState.totalPrice = updatedPrice;
		this.setState(updatedState);
		this.updatePurchasableState(updatedState.ingredients);
	};

	getDisabledInfo = () => {
		let disabledInfo = { ...this.state.ingredients };
		for (let ingredient of Object.keys(disabledInfo)) {
			disabledInfo[ingredient] = disabledInfo[ingredient] <= 0;
		}
		return disabledInfo;
	};

	errorStyle = {
		fontSize: "1.5rem",
		color: "firebrick",
		textAlign: "center",
	};

	render() {
		const disabledInfo = this.getDisabledInfo();

		let orderSummary = null;
		let burger = <Spinner />;

		if (this.state.error)
			burger = <p style={this.errorStyle}>Error Fetching Ingredients</p>;

		if (this.state.ingredients) {
			burger = (
				<React.Fragment>
					<Burger ingredients={this.state.ingredients} />
					<BuildControls
						ingredientAdded={this.addIngredientHandler}
						ingredientRemoved={this.removeIngredientHandler}
						price={this.state.totalPrice}
						disabledInfo={disabledInfo}
						purchasable={this.state.isPurchasable}
						displayOrderModal={this.orderModalHandler}
					/>
				</React.Fragment>
			);
			orderSummary = (
				<OrderSummary
					ingredients={this.state.ingredients}
					closed={this.orderModalHandler}
					continuePurchase={this.continuePurchaseHandler}
					price={this.state.totalPrice}
				/>
			);
		}

		if (this.state.loading) orderSummary = <Spinner />;

		return (
			<React.Fragment>
				<Modal showModal={this.state.showModal} closed={this.orderModalHandler}>
					{orderSummary}
				</Modal>
				{burger}
			</React.Fragment>
		);
	}
}

export default withErrorHandler(BurgerBuilder, axios);
