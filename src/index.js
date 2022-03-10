import React from "react";
import ReactDOM from "react-dom";

import Layout from "./components/layout/Layout";
import reportWebVitals from "./reportWebVitals";

import "./assets/css/index.css";

document.title = "Admin panel";

ReactDOM.render(
	<React.StrictMode>
		<Layout />
	</React.StrictMode>,
	document.getElementById("root")
);

reportWebVitals();
