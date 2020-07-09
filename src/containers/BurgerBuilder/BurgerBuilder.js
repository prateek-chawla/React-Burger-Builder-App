import React, { Component } from "react";
import { connect } from "react-redux";

import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import axios from "../../axios-orders";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import * as actions from "../../store/actions/index";

// const MAX_INGREDIENTS_ALLOWED = {
// 	salad: 2,
// 	meat: 2,
// 	cheese: 2,
// 	bacon: 3,
// };

class BurgerBuilder extends Component {
	state = {
		showModal: false,
	};

	componentDidMount() {
		console.log("component mounting");
		this.props.onFetchIngredients();
	}

	isPurchasable() {
		const ingredients = this.props.ingredients;
		const qty = Object.values(ingredients);
		const totalQty = qty.reduce((sum, el) => sum + el, 0);
		return totalQty > 0;
	}

	orderModalHandler = () => {
		if (this.props.isAuth) this.setState({ showModal: true });
		else {
			this.props.onSetAuthRedirectPath('/checkout');
			this.props.history.push("/auth");
		}
	};

	continuePurchaseHandler = () => {
		this.props.onInitPurchase();
		this.props.history.push("/checkout");
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
		if (this.props.error)
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
						isAuth={this.props.isAuth}
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
		ingredients: state.burgerBuilder.ingredients,
		price: state.burgerBuilder.totalPrice,
		error: state.burgerBuilder.error,
		isAuth: state.auth.token !== null,
	};
};
const mapDispatchToProps = dispatch => {
	return {
		onIngredientAdded: igName => dispatch(actions.addIngredient(igName)),
		onIngredientRemoved: igName => dispatch(actions.removeIngredient(igName)),
		onFetchIngredients: () => dispatch(actions.fetchIngredients()),
		onInitPurchase: () => dispatch(actions.purchaseInit()),
		onSetAuthRedirectPath: path => dispatch(actions.setAuthRedirectPath(path)),
	};
};
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
