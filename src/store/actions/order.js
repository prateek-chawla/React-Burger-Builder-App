import * as actionTypes from "./actionTypes";
import axios from "../../axios-orders";

export const purchaseBurgerSuccess = (id, orderData) => {
	return {
		type: actionTypes.PURCHASE_BURGER_SUCCESS,
		orderId: id,
		orderData: orderData,
	};
};

export const purchaseBurgerFailed = error => {
	return {
		type: actionTypes.PURCHASE_BURGER_FAILED,
		error,
	};
};

export const purchaseBurgerStart = () => {
	return {
		type: actionTypes.PURCHASE_BURGER_START,
	};
};

export const purchaseBurger = (orderData,token) => {
	return dispatch => {
		dispatch(purchaseBurgerStart());
		axios
			.post(`/orders.json?auth=${token}`, orderData)
			.then(response => {
				dispatch(purchaseBurgerSuccess(response.data.name, orderData));
			})
			.catch(error => {
				dispatch(purchaseBurgerFailed(error));
			});
	};
};

export const purchaseInit = () => {
	return {
		type: actionTypes.PURCHASE_INIT,
	};
};
