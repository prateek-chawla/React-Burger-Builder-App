import React, { Component } from "react";
import Modal from "../../components/UI/Modal/Modal";

const withErrorHandler = (WrappedComponent, axios) => {
	return class extends Component {
		state = {
			error: null,
		};

		componentWillMount() {
			this.reqInterceptor = axios.interceptors.request.use(req => {
				//Send new req without errors
				this.setState({ error: null });
				return req;
			});
			this.resInterceptor = axios.interceptors.response.use(
				res => res,
				error => {
					this.setState({ error: error });
				}
			);
		}

		componentWillUnmount() {
			axios.interceptors.request.eject(this.reqInterceptor);
			axios.interceptors.response.eject(this.resInterceptor);
		}

		closeErrorModal = () => {
			this.setState({ error: null });
		};
		render() {
			let errorMsg = null;
			if (this.state.error) errorMsg = this.state.error.message;
			return (
				<React.Fragment>
					<Modal showModal={this.state.error} closed={this.closeErrorModal}>
						{errorMsg}
					</Modal>
					<WrappedComponent {...this.props} />
				</React.Fragment>
			);
		}
	};
};

export default withErrorHandler;
