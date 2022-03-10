import React from "react";
import { Link } from "react-router-dom";

import "./Sidebar.css";

import logo from "../../assets/images/logo.png";

import sidebar_items from "../../assets/data/sidebar_routes.json";

const SidebarItem = (props) => {
	const active = props.active ? "active" : "";

	return (
		<div className="sidebar__item">
			<div className={`sidebar__item-inner ${active}`}>
				<span>{props.title}</span>
			</div>
		</div>
	);
};

const Sidebar = (props) => {
	const activeItem = sidebar_items.findIndex(
		(item) => item.route === props.location.pathname
	);
	return (
		<div className="sidebar">
			<div className="sidebar__logo">
				<img src={logo} alt="company logo" />
			</div>
			{sidebar_items.map((item, index) => (
				<Link to={item.route} key={index}>
					<SidebarItem
						title={item.display_name}
						active={index === activeItem}
					/>
				</Link>
			))}
		</div>
	);
};

export default Sidebar;
