import * as actionTypes from "./actions";

const INGREDIENT_PRICES = {
	salad: 20,
	meat: 60,
	cheese: 15,
	bacon: 30,
};

const initialState = {
	ingredients: {
		salad: 0,
		bacon: 0,
		cheese: 0,
		meat: 0,
	},
	totalPrice: 50,
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.ADD_INGREDIENT:
			return {
				...state,
				ingredients: {
					...state.ingredients,
					[action.ingredientName]: state.ingredients[action.ingredientName] + 1,
				},
				totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
			};
		case actionTypes.REMOVE_INGREDIENT:
			return {
				...state,
				ingredients: {
					...state.ingredients,
					[action.ingredientName]: state.ingredients[action.ingredientName] - 1,
				},
				totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
			};
		default:
			return state;
	}
};

export default reducer;
