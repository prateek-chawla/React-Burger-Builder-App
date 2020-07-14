import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import classes from "./Auth.css";
import Spinner from "../../components/UI/Spinner/Spinner";
import * as actions from "../../store/actions/index";
import { updateObject, checkValidity } from "../../shared/utility";

const auth = props => {
	const [authForm, setAuthForm] = useState({
		email: {
			elementType: "input",
			elementConfig: {
				type: "email",
				placeholder: "Enter E-Mail",
			},
			value: "",
			validation: {
				required: true,
				isEmail: true,
			},
			valid: false,
			touched: false,
		},
		password: {
			elementType: "input",
			elementConfig: {
				type: "password",
				placeholder: "Enter Password",
			},
			value: "",
			validation: {
				required: true,
				minLength: 6,
			},
			valid: false,
			touched: false,
		},
	});

	const [isSignUp, toggleIsSignUp] = useState(true);

	useEffect(() => {
		if (!props.buildingBurger && props.authRedirectPath !== "/")
			props.onSetAuthRedirectPath();
	}, []);

	const inputChangedHandler = (event, controlName) => {
		const updatedControls = updateObject(authForm, {
			[controlName]: updateObject(authForm[controlName], {
				value: event.target.value,
				valid: checkValidity(event.target.value, authForm[controlName].validation),
				touched: true,
			}),
		});
		setAuthForm(updatedControls);
	};

	const submitHandler = event => {
		event.preventDefault();
		props.onAuth(authForm.email.value, authForm.password.value, isSignUp);
	};

	const switchAuthModeHandler = () => {
		toggleIsSignUp(!isSignUp);
	};

	const formElementsArray = [];
	for (let key in authForm) {
		formElementsArray.push({
			id: key,
			config: authForm[key],
		});
	}

	let form = formElementsArray.map(formElement => (
		<Input
			key={formElement.id}
			elementType={formElement.config.elementType}
			elementConfig={formElement.config.elementConfig}
			value={formElement.config.value}
			invalid={!formElement.config.valid}
			shouldValidate={formElement.config.validation}
			touched={formElement.config.touched}
			changed={event => inputChangedHandler(event, formElement.id)}
		/>
	));

	if (props.loading) form = <Spinner />;

	let errorMsg = null;
	if (props.error) {
		const msg = props.error.replace("_", " ");
		const style = {
			color: "firebrick",
			padding: "5px",
			margin: "auto",
			width: "50%",
		};
		errorMsg = <p style={style}>{msg}</p>;
	}

	let authRedirect = null;
	if (props.isAuth) authRedirect = <Redirect to={props.authRedirectPath} />;

	return (
		<div className={classes.Auth}>
			{authRedirect}
			{errorMsg}
			<form onSubmit={submitHandler}>
				{form}
				<Button btnType="Success">{isSignUp ? "SIGN UP" : "SIGN IN"}</Button>
			</form>
			<Button btnType="Danger" clicked={switchAuthModeHandler}>
				{isSignUp ? "SIGN IN Instead" : "SIGN UP Instead"}
			</Button>
		</div>
	);
};

const mapStateToProps = state => {
	return {
		loading: state.auth.loading,
		error: state.auth.error,
		isAuth: state.auth.token !== null,
		buildingBurger: state.burgerBuilder.building,
		authRedirectPath: state.auth.authRedirectPath,
	};
};
const mapDispatchToProps = dispatch => {
	return {
		onAuth: (email, password, isSignUp) => {
			dispatch(actions.auth(email, password, isSignUp));
		},
		onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath("/")),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(auth);
