import * as actionTypes from "./actionTypes";
import axios from "../../axios-orders";

export const fetchOrdersSuccess = orders => {
	return {
		type: actionTypes.FETCH_ORDERS_SUCCESS,
		orders: orders,
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

export const fetchOrders = (token, userId) => {
	return dispatch => {
		dispatch(fetchOrdersStart());
		const queryParams =
			"?auth=" + token + '&orderBy="userId"&equalTo="' + userId + '"';
		axios
			.get("/orders.json" + queryParams)
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
