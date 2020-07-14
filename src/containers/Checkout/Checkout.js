import React from "react";
import { Route, Redirect } from "react-router-dom";
import ContactData from "./ContactData/ContactData";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import { connect } from "react-redux";

const checkout = props => {
	const checkoutCancelledHandler = () => {
		props.history.goBack();
	};

	const checkoutContinuedHandler = () => {
		props.history.push("/checkout/contact-data");
	};

	let checkoutSummary = <Redirect to="/" />;
	if (props.ingredients) {
		const purchaseRedirect = props.purchased ? <Redirect to="/" /> : null;
		checkoutSummary = (
			<div>
				{purchaseRedirect}
				<CheckoutSummary
					ingredients={props.ingredients}
					checkoutContinued={checkoutContinuedHandler}
					checkoutCancelled={checkoutCancelledHandler}
				/>
				<Route path={props.match.path + "/contact-data"} component={ContactData} />
			</div>
		);
	}
	return checkoutSummary;
};

const mapStateToProps = state => {
	return {
		ingredients: state.burgerBuilder.ingredients,
		purchased: state.order.purchased,
	};
};

export default connect(mapStateToProps)(checkout);
