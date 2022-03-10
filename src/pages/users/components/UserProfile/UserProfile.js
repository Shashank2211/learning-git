import React, { useEffect, useState } from 'react'
import './UserProfile.css'
import { MdOutlineModeEdit, MdEmail, MdPhone, MdFace, MdCake } from 'react-icons/md'
import { IoMdGlobe, IoMdPlay } from 'react-icons/io'
import { TiHome } from 'react-icons/ti'
import { ImFire } from 'react-icons/im'
import { useLocation } from 'react-router-dom'
import { queries } from '../Queries'
import moment, { Moment } from 'moment'
import DateTimePicker from 'react-datetime-picker'
import DatePicker from 'react-date-picker'
import Activity from '../Activity/Activity'
import { handleClickOfActivityEditButton } from '../Activity/Activity'

function UserProfile(props) {

    const location = useLocation();
    // console.log(location.state);
    const currentUser = location.state.myuser;
    // console.log(currentUser);

    const [email, setEmail] = useState(currentUser.email);
    const [phoneNumber, setPhoneNumber] = useState(currentUser.phoneNumber);
    const [country, setCountry] = useState(currentUser.country);
    const [address, setAddress] = useState(currentUser.address);
    const [gender, setGender] = useState(currentUser.gender);
    const [dob, setDob] = useState(currentUser.dob);
    var birthday_date = new Date(dob);
    const birthday = moment(dob).format("DD MMM YYYY");
    const [firstName, setFirstName] = useState(currentUser.first_name);
    const [lastName, setLastName] = useState(currentUser.last_name);
    const [username, setUsername] = useState(currentUser.username);
    const [createdAt, setCreatedAt] = useState(currentUser.created_at);
    var joined_date = new Date(createdAt);
    const joined = moment(createdAt).format("MMM YYYY");
    const [fullname, setFullname] = useState(firstName + " " + lastName);

    const [userActivityData, setUserActivityData] = useState([]);

    const [userActivityDates, setUserActivityDates] = useState([]);

    const [isDisabled, setIsDisabled] = useState(true);
    const [isDisabledActivity, setIsDisabledActivity] = useState(true);

    const anotherEditHandler = (e) => {
        setIsDisabledActivity(!isDisabledActivity);
    }

    const clickHandlerOfEdit = (e) => {
        setIsDisabled(!isDisabled);
        if (!isDisabled) {
            // firstname
            fetchGraphQL(queries[1], "UpdateFirstname", variables[0]).then(res => {
                setFirstName(res.data.update_user.returning[0].first_name);
            });
            // lastname
            fetchGraphQL(queries[2], "UpdateLastname", variables[1]).then(res => {
                setLastName(res.data.update_user.returning[0].last_name);
            });
            // username
            fetchGraphQL(queries[3], "UpdateUsername", variables[2]).then(res => {
                setUsername(res.data.update_user.returning[0].username);
            });
            // joined date (created at)
            fetchGraphQL(queries[12], "UpdateCreatedAt", variables[10]).then(res => {
                setCreatedAt(res.data.update_user.returning[0].created_at);
            })
            // email
            fetchGraphQL(queries[4], "UpdateEmail", variables[3]).then(res => {
                setEmail(res.data.update_user.returning[0].email);
            });
            // phone number
            fetchGraphQL(queries[5], "UpdatePhoneNumber", variables[4]).then(res => {
                setPhoneNumber(res.data.update_user.returning[0].phoneNumber);
            });
            // country
            fetchGraphQL(queries[6], "UpdateCountry", variables[5]).then(res => {
                setCountry(res.data.update_user.returning[0].country);
            });
            // address
            fetchGraphQL(queries[7], "UpdateAddress", variables[6]).then(res => {
                setAddress(res.data.update_user.returning[0].address);
            });
            // gender
            fetchGraphQL(queries[8], "UpdateGender", variables[7]).then(res => {
                setGender(res.data.update_user.returning[0].gender);
            });
            // date of birth
            fetchGraphQL(queries[9], "UpdateDob", variables[8]).then(res => {
                console.log(res.data.update_user.returning[0].dob);
            });
        }
    }

    const variables = [
        {
            "first_name": firstName,
            "_eq": currentUser.id
        },
        {
            "last_name": lastName,
            "_eq": currentUser.id
        },
        {
            "username": username,
            "_eq": currentUser.id
        },
        {
            "email": email,
            "_eq": currentUser.id
        },
        {
            "phoneNumber": phoneNumber,
            "_eq": currentUser.id
        },
        {
            "country": country,
            "_eq": currentUser.id
        },
        {
            "address": address,
            "_eq": currentUser.id
        },
        {
            "gender": gender,
            "_eq": currentUser.id
        },
        {
            "dob": dob,
            "_eq": currentUser.id
        },
        {
            "_eq": currentUser.id
        },
        {
            "_eq": currentUser.id,
            "created_at": createdAt
        },
        {
            "_eq" : currentUser.id
        }
    ]

    useEffect(() => {
        fetchGraphQL(queries[11], "GetActivityData", variables[9]).then(res => {
            setUserActivityData(res.data.useractivitydata);
        });
        fetchGraphQL(queries[13], "GetActivityDates", variables[11]).then(res => {
            setUserActivityDates(res.data.useractivitydata);
        });
        // console.log(userActivityDates);
    }, [])

    // console.log(userActivityDates);
    // console.log(getStreak(userActivityDates));

    return (
        <div className='user-profile' >
            <div className='personal-info' >
                <div className='user-image-div' >
                    <div className='user-image-div-image' >
                        <img className='profile-image-in-user-profile' src={currentUser.image_id} alt="profile photo" />
                    </div>
                    <div className='uidi-div' >
                        {(isDisabled)?
                            (
                                <input className={(isDisabled)?'display-username':'editable-input-field'} disabled={isDisabled} type="text" value={(fullname == null) ? "-" : fullname} />
                            ):
                            (
                                <div className='fullname-alternative' >
                                    <input className='editable-input-field display-firstname' disabled={isDisabled} type="text" value={(firstName == null) ? "-" : firstName} onChange={e => setFirstName(e.target.value)} />
                                    <input className='editable-input-field display-lastname' disabled={isDisabled} type="text" value={(lastName == null) ? "-" : lastName} onChange={e => setLastName(e.target.value)} />
                                </div>
                            )
                        }
                    </div>
                    <div className='uidi-div' >
                        <input className={(isDisabled)?'display-username':'editable-input-field edit-username'} disabled={isDisabled} type="text" value={(username == null) ? "-" : username} onChange={e => setUsername(e.target.value)} />
                    </div>
                    <div className='uidi-div' >
                        {(isDisabled)?
                        (
                            <input className={(isDisabled)?'display-member-since':'editable-input-field'} disabled={isDisabled} type="text" value={(joined == null) ? "-" : joined} />
                        ):
                        (
                            <div className='customDatePickerWidth' >
                                <DatePicker className='date-picker' onChange={e => setCreatedAt(e)} value={joined_date} />
                            </div>
                        )}
                    </div>
                </div>
                <div className='user-personal-info-div' >
                    <div className='upid-head' >
                        <h3 className='head-header' >Personal Info</h3>
                        <button className='edit-button' onClick={clickHandlerOfEdit} >{(isDisabled) ? "Edit" : "Save"}<MdOutlineModeEdit className='edit-icon' /></button>
                    </div>
                    <div className='upid-body' >
                        <div className='upid-body-div' >
                            <div className='upid-body-div-subdiv' >
                                <MdEmail className='div-icon' />
                                <div className='editable-field-div' >
                                    <input className={(isDisabled)?'display-field':'editable-input-field edit-email'} disabled={isDisabled} type="email" required value={(email == null) ? "-" : email} onChange={e => setEmail(e.target.value)} ></input>
                                </div>
                            </div>
                            <div className='upid-body-div-subdiv' >
                                <MdPhone className='div-icon' />
                                <div className='editable-field-div' >
                                    <input className={(isDisabled)?'display-field':'editable-input-field'} type="text" disabled={isDisabled} value={(phoneNumber == null) ? "-" : phoneNumber} onChange={e => setPhoneNumber(e.target.value)} />
                                </div>
                            </div>
                            <div className='upid-body-div-subdiv' >
                                <IoMdGlobe className='div-icon' />
                                <div className='editable-field-div' >
                                    <input className={(isDisabled)?'display-field':'editable-input-field'} type="text" disabled={isDisabled} value={(country == null) ? "-" : country} onChange={e => setCountry(e.target.value)} />
                                </div>
                            </div>
                            <div className='upid-body-div-subdiv address-outer-div' >
                                <TiHome className='div-icon' />
                                <div className='editable-field-div' >
                                    <textarea className={(isDisabled)?'display-field address':'editable-input-field'} name='body' value={address} onChange={e => setAddress(e.target.value)} disabled={isDisabled} ></textarea>
                                    {/* <input className={(isDisabled)?'display-field':'editable-input-field'} type="text" disabled={isDisabled} value={(address == null) ? "-" : address} onChange={e => setAddress(e.target.value)} /> */}
                                </div>
                            </div>
                        </div>
                        <div className='upid-body-div' >
                            <div className='upid-body-div-subdiv' >
                                <MdFace className='div-icon' />
                                <div className='editable-field-div' >
                                    {(isDisabled)?
                                    (
                                        <input className={(isDisabled)?'display-field gender':'editable-input-field'} type="text" disabled={isDisabled} value={(gender == null) ? "-" : gender} onChange={e => setGender(e.target.value)} />
                                    ):
                                    (
                                        <div>
                                            <label htmlFor="gender">Gender: </label>
                                            <select name="gender" id="gender" onChange={e => setGender(e.target.value)} >
                                                <option value="Select Gender">Select Gender</option>
                                                <option value="Male">Male</option>
                                                <option value="Female">Female</option>
                                                <option value="Rather Not Say">Rather Not Say</option>
                                            </select>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className='upid-body-div-subdiv' >
                                <MdCake className='div-icon' />
                                <div className='editable-field-div' >
                                    {(isDisabled)?
                                    (
                                        <input className={(isDisabled)?'display-member-since dob-picker':'editable-input-field'} disabled={isDisabled} type="text" value={(birthday === null) ? "-" : birthday} />
                                    ):
                                    (
                                        <div className='customDatePickerWidth' >
                                            <DatePicker className='date-picker' onChange={e => setDob(e)} value={birthday_date} />
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <hr /> */}
            <div className='LAD-and-streak' >
                <div className='last-added-distance' >
                    <div className='LAD-head' >
                        <h3 className='head-header' >Last Added Distance</h3>
                        <button className='LAD-head-view-all' >View All</button>
                        <button className='edit-button' onClick={handleClickOfActivityEditButton && anotherEditHandler} >{(isDisabledActivity)?"Edit":"Save"} <MdOutlineModeEdit className='edit-icon' /></button>
                    </div>
                    <div className='LAD-body' >
                        {
                            (userActivityData.length === 0)?"No Activities Created!":
                            userActivityData.map((object, index) => (
                                // console.log(object);
                                <Activity key={index} singleActivity={object} isDisabledButton={isDisabledActivity} />
                            ))
                        }
                    </div>
                </div>
                <div className='streak' >
                    <div className='streak-head' >
                        <h3 className='head-header' >Streak</h3>
                        <button className='edit-button' >Edit <MdOutlineModeEdit className='edit-icon' /></button>
                    </div>
                    <div className='streak-body' >
                        <div className='streaks-div' >
                            <div className='streaks-divs-left' >
                                <h3 className='head-header-2' >Active Streak</h3>
                                <p className='duration' >Duration</p>
                            </div>
                            <div className='streaks-divs-right' >
                                {/* <ImFire className='fire-symbol' /> */}
                                <p className='duration' >{getStreak(userActivityDates)}</p>
                            </div>
                        </div>
                        <div className='streaks-div' >
                            <div className='streaks-divs-left' >
                                <h3 className='head-header-2' >Longest Streak</h3>
                                <p className='duration' >Duration</p>
                            </div>
                            <div className='streaks-divs-right' >
                                <p className='duration' >Streak Count</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <hr /> */}
            <div className='advanced-options' >
                <div className='ao-head' >
                    <h3 className='head-header' >Advanced Options</h3>
                </div>
                <button className='ao-button' >Enter Advanced Options <IoMdPlay className='play-icon' /></button>
            </div>
        </div>
    )
}

async function fetchGraphQL(operationsDoc, operationName, variables) {
    const result = await fetch(
        "https://hasura-pre-prod.100ascent.com/v1/graphql",
        {
            method: "POST",
            headers: {
                "content-type": `application/json`,
                "x-hasura-admin-secret": `admin123`
            },
            body: JSON.stringify({
                query: operationsDoc,
                variables: variables,
                operationName: operationName
            })
        }
    );

    return await result.json();
}

function getStreak(allDatesArray) {
    let strCal = [];
    let streak = 1;
    if (allDatesArray.length === 0) return 0;
    if (allDatesArray.length === 1) { streak = 1; return streak; }
    for (let i = 0; i < allDatesArray.length; i++) {
        let ud = new Date(allDatesArray[i].updated_date);
        let d = new Date(allDatesArray[i].date);
        if (ud.getTime()-d.getTime()>172800000)
        {
            continue;
        } else {
            strCal.push(d);
        }
    }
    // let currdate = new Date(allDatesArray[0].date);

    // let tempstr=streak;
    for (let i = 0; i < strCal.length-1; i++)
    {
        if (strCal[i+1].getTime()-strCal[i].getTime()>86400000)
        {
            streak=1;
        } else {
            streak+=1;
        }
    }
    return streak;
}

export default UserProfile