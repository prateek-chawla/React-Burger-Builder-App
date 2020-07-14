import React, { useState, useEffect } from "react";
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

const burgerBuilder = props => {
	const [showModal, setShowModal] = useState(false);

	useEffect(() => {
		props.onFetchIngredients();
	}, []);

	const isPurchasable = () => {
		const ingredients = props.ingredients;
		const qty = Object.values(ingredients);
		const totalQty = qty.reduce((sum, el) => sum + el, 0);
		return totalQty > 0;
	};

	const orderModalHandler = () => {
		if (props.isAuth) setShowModal(true);
		else {
			props.onSetAuthRedirectPath("/checkout");
			props.history.push("/auth");
		}
	};

	const cancelPurchaseHandler = () => {
		setShowModal(false)
	};

	const continuePurchaseHandler = () => {
		props.onInitPurchase();
		props.history.push("/checkout");
	};

	const getDisabledInfo = () => {
		let disabledInfo = { ...props.ingredients };
		for (let ingredient of Object.keys(disabledInfo)) {
			disabledInfo[ingredient] = disabledInfo[ingredient] <= 0;
		}
		return disabledInfo;
	};

	const errorStyle = {
		fontSize: "1.5rem",
		color: "firebrick",
		textAlign: "center",
	};

	const disabledInfo = getDisabledInfo();

	let orderSummary = null;
	let burger = <Spinner />;
	if (props.error) burger = <p style={errorStyle}>Error Fetching Ingredients</p>;

	if (props.ingredients) {
		burger = (
			<React.Fragment>
				<Burger ingredients={props.ingredients} />
				<BuildControls
					ingredientAdded={props.onIngredientAdded}
					ingredientRemoved={props.onIngredientRemoved}
					price={props.price}
					disabledInfo={disabledInfo}
					isAuth={props.isAuth}
					purchasable={isPurchasable()}
					displayOrderModal={orderModalHandler}
				/>
			</React.Fragment>
		);
		orderSummary = (
			<OrderSummary
				ingredients={props.ingredients}
				closed={cancelPurchaseHandler}
				continuePurchase={continuePurchaseHandler}
				price={props.price}
			/>
		);
	}

	return (
		<React.Fragment>
			<Modal showModal={showModal} closed={cancelPurchaseHandler}>
				{orderSummary}
			</Modal>
			{burger}
		</React.Fragment>
	);
};

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
)(withErrorHandler(burgerBuilder, axios));
