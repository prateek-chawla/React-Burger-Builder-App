import React, { Component } from "react";
import { connect } from "react-redux";

import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import axios from "../../axios-orders";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import * as actionTypes from "../../store/actions";

// const MAX_INGREDIENTS_ALLOWED = {
// 	salad: 2,
// 	meat: 2,
// 	cheese: 2,
// 	bacon: 3,
// };

class BurgerBuilder extends Component {
	state = {
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

	isPurchasable() {
		const ingredients = this.props.ingredients;
		const qty = Object.values(ingredients);
		const totalQty = qty.reduce((sum, el) => sum + el, 0);
		return totalQty > 0;
	}

	orderModalHandler = () => {
		this.setState(prevState => {
			return { showModal: !prevState.showModal };
		});
	};

	continuePurchaseHandler = () => {
		this.props.history.push("/checkout")
	};

	getDisabledInfo = () => {
		let disabledInfo = { ...this.props.ingredients };
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

		if (this.props.ingredients) {
			burger = (
				<React.Fragment>
					<Burger ingredients={this.props.ingredients} />
					<BuildControls
						ingredientAdded={this.props.onIngredientAdded}
						ingredientRemoved={this.props.onIngredientRemoved}
						price={this.props.price}
						disabledInfo={disabledInfo}
						purchasable={this.isPurchasable()}
						displayOrderModal={this.orderModalHandler}
					/>
				</React.Fragment>
			);
			orderSummary = (
				<OrderSummary
					ingredients={this.props.ingredients}
					closed={this.orderModalHandler}
					continuePurchase={this.continuePurchaseHandler}
					price={this.props.price}
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
const mapStateToProps = state => {
	return {
		ingredients: state.ingredients,
		price: state.totalPrice,
	};
};
const mapDispatchToProps = dispatch => {
	return {
		onIngredientAdded: igName =>
			dispatch({ type: actionTypes.ADD_INGREDIENT, ingredientName: igName }),
		onIngredientRemoved: igName =>
			dispatch({ type: actionTypes.REMOVE_INGREDIENT, ingredientName: igName }),
	};
};
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
