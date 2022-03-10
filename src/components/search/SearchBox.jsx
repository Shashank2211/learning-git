import React from "react";
import "./SearchBox.css";

const SearchBox = ({ placeholder, handleChange }) => {
	const placeholder_mod = placeholder;
	return (
		<input
			className="search"
			type="search"
			placeholder={placeholder_mod}
			onChange={handleChange}
		/>
	);
};

export default SearchBox;
