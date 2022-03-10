import React from "react";

import Card from "../card/Card";

import "./CardList.css";

export default function CardList(props) {
	return (
		<div>
			<div className="card-list">
				{props.talks.map((speaker) => (
					<Card key={speaker.id} speaker={speaker} />
				))}
			</div>
		</div>
	);
}
