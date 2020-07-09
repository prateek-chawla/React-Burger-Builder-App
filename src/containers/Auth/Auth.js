import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import classes from "./Auth.css";
import Spinner from "../../components/UI/Spinner/Spinner";
import * as actions from "../../store/actions/index";

class Auth extends Component {
	state = {
		controls: {
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
		},
		isSignUp: true,
	};

	checkValidity(value, rules) {
		let isValid = true;
		if (!rules) {
			return true;
		}

		if (rules.required) {
			isValid = value.trim() !== "" && isValid;
		}

		if (rules.minLength) {
			isValid = value.length >= rules.minLength && isValid;
		}

		if (rules.maxLength) {
			isValid = value.length <= rules.maxLength && isValid;
		}

		if (rules.isEmail) {
			const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
			isValid = pattern.test(value) && isValid;
		}

		if (rules.isNumeric) {
			const pattern = /^\d+$/;
			isValid = pattern.test(value) && isValid;
		}

		return isValid;
	}

	inputChangedHandler = (event, controlName) => {
		const updatedControls = {
			...this.state.controls,
			[controlName]: {
				...this.state.controls[controlName],
				value: event.target.value,
				valid: this.checkValidity(
					event.target.value,
					this.state.controls[controlName].validation
				),
				touched: true,
			},
		};
		this.setState({ controls: updatedControls });
	};

	submitHandler = event => {
		event.preventDefault();
		this.props.onAuth(
			this.state.controls.email.value,
			this.state.controls.password.value,
			this.state.isSignUp
		);
	};

	switchAuthModeHandler = () => {
		this.setState(prevState => {
			return {
				isSignUp: !prevState.isSignUp,
			};
		});
	};

	render() {
		const formElementsArray = [];
		for (let key in this.state.controls) {
			formElementsArray.push({
				id: key,
				config: this.state.controls[key],
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
				changed={event => this.inputChangedHandler(event, formElement.id)}
			/>
		));

		if (this.props.loading) form = <Spinner />;

		let errorMsg = null;
		if (this.props.error) {
			const msg = this.props.error.replace("_", " ");
			const style = {
				color: "firebrick",
				padding: "5px",
				margin: "auto",
				width: "50%",
			};
			errorMsg = <p style={style}>{msg}</p>;
		}

		let authRedirect = null;
		if (this.props.isAuth) authRedirect = <Redirect to="/" />;

		return (
			<div className={classes.Auth}>
				{authRedirect}
				{errorMsg}
				<form onSubmit={this.submitHandler}>
					{form}
					<Button btnType="Success">
						{this.state.isSignUp ? "SIGN UP" : "SIGN IN"}
					</Button>
				</form>
				<Button btnType="Danger" clicked={this.switchAuthModeHandler}>
					{this.state.isSignUp ? "SIGN IN Instead" : "SIGN UP Instead"}
				</Button>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		loading: state.auth.loading,
		error: state.auth.error,
		isAuth: state.auth.token !== null,
	};
};
const mapDispatchToProps = dispatch => {
	return {
		onAuth: (email, password, isSignUp) => {
			dispatch(actions.auth(email, password, isSignUp));
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
