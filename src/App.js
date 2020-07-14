import React, { useEffect, Suspense } from "react";
import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import Layout from "./hoc/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Checkout from "./containers/Checkout/Checkout";
import Auth from "./containers/Auth/Auth";
import Logout from "./containers/Auth/Logout/Logout";
import * as actions from "./store/actions/index";

const Orders = React.lazy(() => import("./containers/Orders/Orders"));

const app = props => {
	useEffect(() => {
		props.onTryAutoSignup();
	}, []);

	let routes = (
		<Switch>
			<Route path="/auth" component={Auth} />
			<Route path="/" exact component={BurgerBuilder} />
			<Redirect to="/" />
		</Switch>
	);

	if (props.isAuth) {
		routes = (
			<Switch>
				<Route path="/checkout" component={Checkout} />
				<Route
					path="/orders"
					render={props=> (
						<Suspense fallback={<p>Fetching Orders</p>}>
							<Orders {...props} />
						</Suspense>
					)}
				/>
				<Route path="/logout" component={Logout} />
				<Route path="/auth" component={Auth} />
				<Route path="/" exact component={BurgerBuilder} />
				<Redirect to="/" />
			</Switch>
		);
	}

	return (
		<div>
			<Layout>{routes}</Layout>
		</div>
	);
};

const mapStateToProps = state => {
	return {
		isAuth: state.auth.token !== null,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onTryAutoSignup: () => dispatch(actions.authCheckState()),
	};
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(app));
