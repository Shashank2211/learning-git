import SearchUser from "./components/SearchUser/SearchUser";
import UserProfile from "./components/UserProfile/UserProfile";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function User() {
	return (
		<div className="App">
			<Router>
				<Switch>
					<Route path="/Users" exact default component={SearchUser}></Route>
					<Route path="/Users/user" component={UserProfile}></Route>
				</Switch>
			</Router>
			{/* <input type="text" disabled={disable} value={val} onChange={e => setVal(e.target.value)} />
       		<input type="button" value={(disable)?"Edit":"Save"} onClick={handleClick}/> */}
		</div>
	);
}

export default User;
