import { render } from "react-dom";
import SearchParams from "./SearchParams";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Details from "./Details";
import { StrictMode, useState } from "react";
import ThemeContext from "./ThemeContext";

const App = () => {
	const theme = useState("#f06d06");
	return (
		<StrictMode>
			<ThemeContext.Provider value={theme}>
				<BrowserRouter>
					<header>
						<Link to="/">Adopt Me!</Link>
					</header>
					<Routes>
						<Route path="/details/:id" element={<Details />} />
						<Route path="/" element={<SearchParams />} />
					</Routes>
				</BrowserRouter>
			</ThemeContext.Provider>
		</StrictMode>
	);
};

render(<App></App>, document.getElementById("root"));
