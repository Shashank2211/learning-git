// import React from "react";
// import "./Card.css";
// import moment from "moment";
// import { IoCalendarOutline, IoTime } from "react-icons/io5";
// import { MdEdit } from "react-icons/md";

// const Card = (props) => {
// 	const date = moment(props.speaker.date).format("DD MMM, YYYY");
// 	const time = moment(props.speaker.date).format("h:mm a");

// 	return (
// 		<div className="card-container">
// 			<button className="card-edit btn">
// 				Edit <MdEdit />
// 			</button>
// 			<div className="card-title">{props.speaker.title}</div>
// 			<img
// 				className="card-img"
// 				alt={props.speaker.title}
// 				src={props.speaker.image_link}
// 			/>
// 			<div className="card-title">{props.speaker.session_title}</div>
// 			<div className="card-name">Speaker: {props.speaker.speaker_name}</div>

// 			<div className="card-date-time">
// 				<div className="card-date">
// 					<IoCalendarOutline className="card-icons" />
// 					<b>{date}</b>
// 				</div>
// 				<div className="card-date">
// 					<IoTime className="card-icons" />
// 					<b>{time}</b>
// 				</div>
// 			</div>
// 			<button
// 				type="button"
// 				className="card-btn btn"
// 				onClick={(e) => {
// 					e.preventDefault();
// 					window.location.href = props.speaker.on_click_link;
// 				}}
// 			>
// 				<p>{props.speaker.button_text}</p>
// 			</button>
// 		</div>
// 	);
// };

// export default Card;
import React, { useState } from "react";

import DateTimePicker from "react-datetime-picker";
import moment from "moment";
import "./Card.css";
import { IoCalendarOutline, IoTime, IoSave } from "react-icons/io5";
import { MdEdit } from "react-icons/md";

const Queries = [
	`mutation updateTitle($title: String = "", $_eq: uuid = "") {
    update_ascenttalks(_set: {title: $title}, where: {id: {_eq: $_eq}}) {
      affected_rows
      returning {
        title
      }
    }
  }`,
	`mutation updateImage_Link($image_link: String = "", $_eq: uuid = "") {
    update_ascenttalks(_set: {image_link: $image_link}, where: {id: {_eq: $_eq}}) {
      affected_rows
      returning {
        title
        image_link
      }
    }
  }`,
	`mutation updateSession_Title($session_title: String = "", $_eq: uuid = "") {
  update_ascenttalks(where: {id: {_eq: $_eq}}, _set: {session_title: $session_title}) {
		affected_rows
		returning {
		session_title
		}
	}
  }`,
	`mutation updateSpeaker_Name($_eq: uuid = "", $speaker_name: String = "") {
	update_ascenttalks(where: {id: {_eq: $_eq}}, _set: {speaker_name: $speaker_name}) {
		affected_rows
		returning {
		speaker_name
		}
	}
  }`,
	`mutation updateDate($date: timestamp = "", $_eq: uuid = "") {
		update_ascenttalks(_set: {date: $date}, where: {id: {_eq: $_eq}}) {
			affected_rows
			returning {
			date
			}
		}
	}
	`,
	`mutation updateButton_Text($button_text: String = "", $_eq: uuid = "") {
  update_ascenttalks(_set: {button_text: $button_text}, where: {id: {_eq: $_eq}}) {
		affected_rows
		returning {
		button_text
		}
	}
  }`,
];

const Card = (props) => {
	//data declaration
	const [title, setTitle] = useState(props.speaker.title);
	const [image, setImage] = useState(props.speaker.image_link);
	const [sessionTitle, setSessionTitle] = useState(props.speaker.session_title);
	const [speakerName, setSpeakerName] = useState(props.speaker.speaker_name);
	var date = new Date(props.speaker.date);
	const [dateTime, setDateTime] = useState(date);
	const [disabled, setDisabled] = useState(true);
	const [btnText, setBtnText] = useState(props.speaker.button_text);
	const [dateDisplay, setDateDisplay] = useState(
		moment(props.speaker.date).format("DD MMM, YYYY")
	);
	const variables = [
		{
			title: title,
			_eq: props.speaker.id,
		},
		{
			image_link: image,
			_eq: props.speaker.id,
		},
		{
			session_title: sessionTitle,
			_eq: props.speaker.id,
		},
		{
			speaker_name: speakerName,
			_eq: props.speaker.id,
		},
		{
			date: dateTime,
			_eq: props.speaker.id,
		},
		{
			button_text: btnText,
			_eq: props.speaker.id,
		},
	];

	const timeDisplay = moment(props.speaker.date).format("h:mm a");

	//handler function
	const handleClick = () => {
		setDisabled(!disabled);
		if (!disabled) {
			fetchGraphQL(Queries[0], "updateTitle", variables[0]).then((res) => {
				setTitle(res.data.update_ascenttalks.returning[0].title);
			});
			fetchGraphQL(Queries[1], "updateImage_Link", variables[1]).then((res) => {
				setImage(res.data.update_ascenttalks.returning[0].image_link);
			});
			fetchGraphQL(Queries[2], "updateSession_Title", variables[2]).then(
				(res) => {
					setSessionTitle(
						res.data.update_ascenttalks.returning[0].session_title
					);
				}
			);
			fetchGraphQL(Queries[3], "updateSpeaker_Name", variables[3]).then(
				(res) => {
					console.log(res);
					setSpeakerName(res.data.update_ascenttalks.returning[0].speake_name);
				}
			);
			fetchGraphQL(Queries[4], "updateDate", variables[4]).then((res) => {
				// setDateTime(res.data.update_ascenttalks.returning[0].date);
			});
			fetchGraphQL(Queries[5], "updateButton_Text", variables[5]).then(
				(res) => {
					setBtnText(res.data.update_ascenttalks.returning[0].button_text);
				}
			);
		}
	};
	const handleTitle = (e) => {
		setTitle(e.target.value);
	};

	const handleImage = (e) => {
		setImage(e.target.value);
	};
	const handleSessionTitle = (e) => {
		setSessionTitle(e.target.value);
	};
	const handleSpeakerName = (e) => {
		setSpeakerName(e.target.value);
	};
	const handleDateTime = (e) => {
		console.log("input date");
		console.log(e + 330);
		setDateTime(e);
		setDateDisplay(moment(e).format("DD MMM, YYYY"));
	};
	const handleBtnText = (e) => {
		setBtnText(e.target.value);
	};

	return (
		<div className="card-container">
			{/* button */}
			{disabled ? (
				<button className="card-edit btn" onClick={handleClick}>
					Edit <MdEdit />
				</button>
			) : (
				<button className="card-save btn" onClick={handleClick}>
					Save <IoSave className="icons" />
				</button>
			)}
			{/* Title */}
			<input
				value={title}
				disabled={disabled}
				className={disabled ? "card-title" : "card-title disable-false"}
				onChange={handleTitle}
			/>
			{/* Image */}
			{disabled ? (
				<img className="card-img" alt={props.speaker.title} src={image} />
			) : (
				<div>
					<img className="card-img" alt={props.speaker.title} src={image} />
					<input
						value={image}
						onChange={handleImage}
						className={
							disabled ? "card-img-input" : "card-img-input disable-false"
						}
					/>
				</div>
			)}
			{/* Session Title */}
			<input
				value={sessionTitle}
				disabled={disabled}
				onChange={handleSessionTitle}
				className={disabled ? "card-name" : "disable-false card-name"}
			/>
			{/* Speaker Name */}
			<div className="card-name">
				Speaker:
				<input
					value={speakerName}
					disabled={disabled}
					className={disabled ? "card-name" : "card-name disable-false"}
					onChange={handleSpeakerName}
				/>
			</div>

			{/* Date&Time */}
			<div className="card-date-time">
				<div className="card-date">
					<IoCalendarOutline className="card-icons" />
					{/* <b>{date}</b> */}
					{disabled ? (
						<b>{dateDisplay}</b>
					) : (
						<div className="date-picker-width">
							<DateTimePicker
								disabled={disabled}
								onChange={handleDateTime}
								value={dateTime}
								className={"date-time-input"}
								calendarClassName={"calendar"}
							/>
						</div>
					)}
				</div>
				<div className="card-date">
					{disabled ? (
						<div className="card-date">
							<IoTime className="card-icons" />
							<b>{timeDisplay}</b>
						</div>
					) : (
						<div className="time-input"></div>
					)}
				</div>
			</div>

			{/* Button Text */}
			{disabled ? (
				<button
					type="button"
					className="card-btn btn"
					onClick={(e) => {
						e.preventDefault();
						window.location.href = props.speaker.on_click_link;
					}}
				>
					<p>{btnText}</p>
				</button>
			) : (
				<input
					className="input-btn-text"
					value={btnText}
					onChange={handleBtnText}
				/>
			)}
		</div>
	);
};
async function fetchGraphQL(operationsDoc, operationName, variables) {
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
				variables: variables,
				operationName: operationName,
			}),
		}
	);

	return await result.json();
}
export default Card;
