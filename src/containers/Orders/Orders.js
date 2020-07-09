import React, { Component } from "react";
import { connect } from "react-redux";

import Order from "../../components/Order/Order";
import axios from "../../axios-orders";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import * as orderActions from "../../store/actions/index";
import Spinner from "../../components/UI/Spinner/Spinner";

class Orders extends Component {
	componentDidMount() {
		this.props.onFetchOrders(this.props.token, this.props.userId);
	}

	render() {
		let orders = <Spinner />;
		if (!this.props.loading) {
			orders = (
				<div>
					{this.props.orders.map(order => (
						<Order
							key={order.id}
							ingredients={order.ingredients}
							price={order.price}
						/>
					))}
				</div>
			);
		}
		return orders;
	}
}

const mapStateToProps = state => {
	return {
		loading: state.order.loading,
		orders: state.order.orders,
		token: state.auth.token,
		userId: state.auth.userId,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onFetchOrders: (token, userId) =>
			dispatch(orderActions.fetchOrders(token, userId)),
	};
};
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withErrorHandler(Orders, axios));
