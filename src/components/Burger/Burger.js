import React from "react";
import classes from "./Burger.css";
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";

const burger = props => {
	const ingredientsObj = props.ingredients;
	let ingredients = [];
	let burgerIsEmpty = true;

	for (let [ingredient, totalQty] of Object.entries(ingredientsObj)) {
		for (let qty = 0; qty < totalQty; qty++) {
			burgerIsEmpty = false;
			ingredients.push(
				<BurgerIngredient key={ingredient + qty} type={ingredient} />
			);
		}
	}

	if (burgerIsEmpty) ingredients = <p>Add ingredients to make a burger</p>;

	return (
		<div className={classes.Burger}>
			<BurgerIngredient type="bread-top" />
			{ingredients}
			<BurgerIngredient type="bread-bottom" />
		</div>
	);
};

export default burger;
