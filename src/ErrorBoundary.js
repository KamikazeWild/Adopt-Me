import { Component } from "react";
import { Link, Navigate } from "react-router-dom";

class ErrorBoundary extends Component {
	state = { hasError: false, redirect: false };

	static getDerivedStateFromError() {
		return { hasError: true };
	}

	componentDidCatch(error, info) {
		console.error(error, info);
	}

	componentDidUpdate() {
		if (this.state.hasError) {
			setTimeout(() => this.setState({ redirect: true }), 5000);
		}
	}

	render() {
		if (this.state.redirect) {
			return <Navigate to="/" />;
		} else if (this.state.hasError) {
			return (
				<h2>
					Oh no! There was an error. JK. <br></br>Redirecting you to the
					homepage in 5 seconds. <Link to="/">Click here</Link> to go back to
					the homepage now. Or not. I am not your mom :&#41;.
				</h2>
			);
		}

		return this.props.children;
	}
}

export default ErrorBoundary;
