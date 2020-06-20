import React from "react";
import classes from "./Burger.css";
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";

const burger = props => {
	const ingredientsObj = props.ingredients;
	console.log(ingredientsObj);
    const ingredients = [];

	for (let [ingredient, totalQty] of Object.entries(ingredientsObj)) {
		for (let qty = 0; qty < totalQty; qty++)
			ingredients.push(
				<BurgerIngredient key={ingredient + qty} type={ingredient} />
			);
    }
    
	return (
		<div className={classes.Burger}>
			<BurgerIngredient type="bread-top" />
			{ingredients}
			<BurgerIngredient type="bread-bottom" />
		</div>
	);
};

export default burger;
