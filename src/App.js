import React, { Component, Suspense } from "react";
import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import Layout from "./hoc/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Checkout from "./containers/Checkout/Checkout";
import Auth from "./containers/Auth/Auth";
import Logout from "./containers/Auth/Logout/Logout";
import * as actions from "./store/actions/index";

const Orders = React.lazy(() => import("./containers/Orders/Orders"));

class App extends Component {
	componentDidMount() {
		this.props.onTryAutoSignup();
	}

	render() {
		let routes = (
			<Switch>
				<Route path="/auth" component={Auth} />
				<Route path="/" exact component={BurgerBuilder} />
				<Redirect to="/" />
			</Switch>
		);

		if (this.props.isAuth) {
			routes = (
				<Switch>
					<Route path="/checkout" component={Checkout} />
					<Route
						path="/orders"
						render={() => (
							<Suspense fallback={<p>Fetching Orders</p>}>
								<Orders />
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
	}
}

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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
