import React from "react";
import CardList from "../../components/session-card/card-list/CardList";
import SearchBox from "../../components/search/SearchBox";
import "./AscentTalks.css";

const MyQuery = `
query MyQuery {
  ascenttalks {
    speaker_name
    button_text
    date
    end_time
    id
    image_link
    on_click_link
    session_title
    title
  }
}
`;

class AscentTalks extends React.Component {
	constructor() {
		super();
		this.state = {
			talks: [],
			searchField: "",
		};
	}

	componentDidMount() {
		fetch("https://hasura-pre-prod.100ascent.com/v1/graphql", {
			method: "POST",
			headers: {
				"content-type": `application/json`,
				"x-hasura-admin-secret": `admin123`,
			},
			body: JSON.stringify({ query: MyQuery }),
		})
			.then((response) => response.json())
			.then((data) => this.setState({ talks: data.data.ascenttalks }));
	}

	handleChange = (e) => {
		this.setState({ searchField: e.target.value });
	};

	render() {
		const { talks, searchField } = this.state;
		const filteredTalks = talks.filter((monster) =>
			monster.session_title.toLowerCase().includes(searchField.toLowerCase())
		);
		return (
			<div className="ascent-talks">
				<SearchBox
					placeholder="Search AscentTalks"
					handleChange={this.handleChange}
				/>
				<CardList talks={filteredTalks} />
			</div>
		);
	}
}
export default AscentTalks;
