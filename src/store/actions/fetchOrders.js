import * as actionTypes from "./actionTypes";
import axios from "../../axios-orders";

export const fetchOrdersSuccess = orders => {
	return {
		type: actionTypes.FETCH_ORDERS_SUCCESS,
		orders:orders,
	};
};

export const fetchOrdersFailed = error => {
	return {
		type: actionTypes.FETCH_ORDERS_FAILED,
		error,
	};
};

export const fetchOrdersStart = () => {
	return {
		type: actionTypes.FETCH_ORDERS_START,
	};
};

export const fetchOrders = (token) => {
	return dispatch => {
		dispatch(fetchOrdersStart());
		axios
			.get(`/orders.json?auth=${token}`)
			.then(res => {
				const fetchedOrders = [];
				for (let key in res.data) {
					fetchedOrders.push({
						...res.data[key],
						id: key,
					});
				}
				dispatch(fetchOrdersSuccess(fetchedOrders));
			})
			.catch(error => {
				dispatch(fetchOrdersFailed(error));
			});
	};
};
