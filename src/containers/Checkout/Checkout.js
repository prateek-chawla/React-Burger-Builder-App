import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import ContactData from "./ContactData/ContactData";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import { connect } from "react-redux";

class Checkout extends Component {
	checkoutCancelledHandler = () => {
		this.props.history.goBack();
	};

	checkoutContinuedHandler = () => {
		this.props.history.push("/checkout/contact-data");
	};

	render() {
		let checkoutSummary = <Redirect to="/" />;
		if (this.props.ingredients) {
			const purchaseRedirect = this.props.purchased ? <Redirect to="/" /> : null;
			checkoutSummary = (
				<div>
					{purchaseRedirect}
					<CheckoutSummary
						ingredients={this.props.ingredients}
						checkoutContinued={this.checkoutContinuedHandler}
						checkoutCancelled={this.checkoutCancelledHandler}
					/>
					<Route
						path={this.props.match.path + "/contact-data"}
						component={ContactData}
					/>
				</div>
			);
		}
		return checkoutSummary;
	}
}

const mapStateToProps = state => {
	return {
		ingredients: state.burgerBuilder.ingredients,
		purchased: state.order.purchased,
	};
};

export default connect(mapStateToProps)(Checkout);
