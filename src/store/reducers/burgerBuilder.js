import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../shared/utility";

const INGREDIENT_PRICES = {
	salad: 20,
	meat: 60,
	cheese: 15,
	bacon: 30,
};
const BASE_PRICE = 50;

const initialState = {
	ingredients: null,
	totalPrice: BASE_PRICE,
	error: false,
	building: false,
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.ADD_INGREDIENT:
			return addIngredient(state, action);

		case actionTypes.REMOVE_INGREDIENT:
			return removeIngredient(state, action);

		case actionTypes.SET_INGREDIENTS:
			return setIngredients(state, action);

		case actionTypes.SET_INGREDIENTS_FAILED:
			return setIngredientsFailed(state, action);

		default:
			return state;
	}
};

const addIngredient = (state, action) => {
	const updatedIngredientAdded = {
		[action.ingredientName]: state.ingredients[action.ingredientName] + 1,
	};
	const updatedIngredientsAdded = updateObject(
		state.ingredients,
		updatedIngredientAdded
	);
	const updatedStateAdded = {
		ingredients: updatedIngredientsAdded,
		building: true,
		totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
	};
	return updateObject(state, updatedStateAdded);
};

const removeIngredient = (state, action) => {
	const updatedIngredientRemoved = {
		[action.ingredientName]: state.ingredients[action.ingredientName] - 1,
	};
	const updatedIngredientsRemoved = updateObject(
		state.ingredients,
		updatedIngredientRemoved
	);
	const updatedStateRemoved = {
		ingredients: updatedIngredientsRemoved,
		building: true,
		totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
	};
	return updateObject(state, updatedStateRemoved);
};

const setIngredients = (state, action) => {
	return updateObject(state, {
		ingredients: {
			salad: action.ingredients.salad,
			bacon: action.ingredients.bacon,
			cheese: action.ingredients.cheese,
			meat: action.ingredients.meat,
		},
		totalPrice: BASE_PRICE,
		error: false,
		building: false,
	});
};

const setIngredientsFailed = (state, action) => {
	return updateObject(state, {
		error: true,
	});
};
export default reducer;
