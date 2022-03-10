import React from "react";
import { Link } from "react-router-dom";
import User from "../User/User";
import "./UserList.css";

const UserList = ({ userList }) => {
	return (
		<div className="user-list">
			{userList.map((i, index) => (
				<Link
					to={{ pathname: "/Users/user", state: { myuser: i } }}
					style={{ textDecoration: "none" }}
				>
					<User key={i.id} user={i} index={index} />
				</Link>
			))}
		</div>
	);
};

export default UserList;
