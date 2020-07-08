import * as actionTypes from "./actionTypes";
import axios from "../../axios-orders";


export const addIngredient = igName => {
	return {
		type: actionTypes.ADD_INGREDIENT,
		ingredientName: igName,
	};
};

export const removeIngredient = igName => {
	return {
		type: actionTypes.REMOVE_INGREDIENT,
		ingredientName: igName,
	};
};

export const fetchIngredients = () => {
	return dispatch => {
		axios
			.get("https://react-burger-builder-5c613.firebaseio.com/ingredients.json")
			.then(response => {
				dispatch(setIngredients(response.data));
			})
			.catch(error => {
				dispatch(fetchIngredientsFailed())
			});
	};
};

export const setIngredients = ingredients => {
	return {
		type: actionTypes.SET_INGREDIENTS,
		ingredients,
	};
};


export const fetchIngredientsFailed = () => {
    return {
        type:actionTypes.SET_INGREDIENTS_FAILED
    }
}