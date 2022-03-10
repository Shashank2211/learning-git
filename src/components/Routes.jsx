import React from "react";

import { Route, Switch } from "react-router-dom";
import Dashboard from "../pages/dashboard/Dashboard";
import AscentTalks from "../pages/ascent-talks/AscentTalks";
import Users from "../pages/users/User";
import WebsiteMails from "../pages/website-mails/WebsiteMails";
import Orders from "../pages/orders/Orders";

const Routes = () => {
	return (
		<Switch>
			<Route path="/" exact component={Dashboard} />
			<Route path="/AscentTalks" component={AscentTalks} />
			<Route path="/Users" component={Users} />
			<Route path="/WebsiteMails" component={WebsiteMails} />
			<Route path="/Orders" component={Orders} />
		</Switch>
	);
};

export default Routes;
