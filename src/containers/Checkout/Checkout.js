import React, { Component } from "react";
import { Route } from "react-router-dom";
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
		return (
			<div>
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
}

const mapStateToProps = state => {
	return {
		ingredients: state.ingredients,
	};
};

export default connect(mapStateToProps)(Checkout);
