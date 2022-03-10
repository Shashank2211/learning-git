import React, { useEffect, useState } from "react";
// import DisplayUser from "../DisplayUser";
import { queries } from "../Queries";
import UserList from "../UserList/UserList";
// import UserProfile from "../UserProfile/UserProfile";
import "./SearchUser.css";

function SearchUser() {
	const [userList, setUserList] = useState([]);
	const [filteredUserList, setFilteredUserList] = useState([]);

	useEffect(() => {
		fetchGraphQL(queries[0], "FetchAll").then((res) => {
			setUserList(res.data.user);

			setFilteredUserList(res.data.user);
		});
	}, []);

	return (
		<div className="search-user">
			<div className="header-and-searchbar">
				<p className="header">Edit Individual User Stats</p>
				<div>
					<input
						className="search-bar"
						type="search"
						placeholder="Search"
						onChange={(e) => {
							setFilteredUserList(
								userList.filter((i) =>
									i.first_name
										.toLowerCase()
										.includes(e.target.value.toLowerCase())
								)
							);
						}}
					/>
				</div>
			</div>
			<div className="no-of-users">
				Number of users: {filteredUserList.length}
			</div>
			<UserList userList={filteredUserList} />

			{/* <UserProfile filteredUserList={filteredUserList} /> */}
		</div>
	);
}

async function fetchGraphQL(operationsDoc, operationName) {
	const result = await fetch(
		"https://hasura-pre-prod.100ascent.com/v1/graphql",
		{
			method: "POST",
			headers: {
				"content-type": `application/json`,
				"x-hasura-admin-secret": `admin123`,
			},
			body: JSON.stringify({
				query: operationsDoc,
				operationName: operationName,
			}),
		}
	);

	return await result.json();
}

// function fetchMyQuery() {
//   return fetchGraphQL(
//     queries[0],
//     "MyQuery",
//   );
// }

// async function startFetchMyQuery() {
//   const { errors, data } = await fetchMyQuery();

//   if (errors) {
//     // handle those errors like a pro
//     console.error(errors);
//     return;
//   }

//   // do something great with this precious data
//   // console.log("data and data.user");
//   // console.log(data);
//   // console.log(data.user);

//   // myfunc(data.user);
//   return data;
// }

export default SearchUser;
