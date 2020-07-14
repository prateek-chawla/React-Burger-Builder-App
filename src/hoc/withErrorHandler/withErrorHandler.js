import React, { useState, useEffect } from "react";
import Modal from "../../components/UI/Modal/Modal";

const withErrorHandler = (WrappedComponent, axios) => {
	return props => {
		const [error, setError] = useState(null);

		const reqInterceptor = axios.interceptors.request.use(req => {
			//Send new req without errors
			setError(null);
			return req;
		});
		const resInterceptor = axios.interceptors.response.use(
			res => res,
			err => setError(err)
		);

		useEffect(() => {
			return () => {
				axios.interceptors.request.eject(reqInterceptor);
				axios.interceptors.response.eject(resInterceptor);
			};
		}, [reqInterceptor, resInterceptor]);

		const closeErrorModal = () => {
			setError(null);
		};

		let errorMsg = null;
		if (error) errorMsg = error.message;
		return (
			<React.Fragment>
				<Modal showModal={error} closed={closeErrorModal}>
					{errorMsg}
				</Modal>
				<WrappedComponent {...props} />
			</React.Fragment>
		);
	};
};

export default withErrorHandler;
