import React from 'react'
import { useState } from 'react';
import { act } from 'react-dom/test-utils';
import { activityQueries } from '../Queries';
import './Activity.css'

export function handleClickOfActivityEditButton(){};

const Activity = ({singleActivity, isDisabledButton}) => {

    // console.log(props);
    const [isDisabledActivity, setIsDisabledActivity] = useState(true);
    // isDisabledOuter = isDisabled;

    const [klicks, setKlicks] = useState(singleActivity.klicks);
    const [calories, setCalories] = useState(singleActivity.calories);
    const [steps, setSteps] = useState(singleActivity.steps);
    const [stream, setStream] = useState(singleActivity.stream);
    const [comment, setComment] = useState(singleActivity.comment);
    const [mins, setMins] = useState(singleActivity.min);
    const [rawData, setRawData] = useState(singleActivity.raw_data);


    const clickHandlerOfEditActivity = (e) => {
        setIsDisabledActivity(!isDisabledActivity);
        if (!isDisabledActivity)
        {
            // klicks
            fetchGraphQLActivity(activityQueries[0], "UpdateKlicks", variables[0]).then(res => {
                setKlicks(res.data.update_useractivitydata.returning[0].klicks);
            });
            // calories
            fetchGraphQLActivity(activityQueries[1], "UpdateCalories", variables[1]).then(res => {
                setCalories(res.data.update_useractivitydata.returning[0].calories);
            });
            // steps
            fetchGraphQLActivity(activityQueries[2], "UpdateSteps", variables[2]).then(res => {
                setSteps(res.data.update_useractivitydata.returning[0].steps);
            });
            // stream
            fetchGraphQLActivity(activityQueries[3], "UpdateStream", variables[3]).then(res => {
                setStream(res.data.update_useractivitydata.returning[0].stream);
            });
            // comment
            fetchGraphQLActivity(activityQueries[4], "UpdateComment", variables[4]).then(res => {
                setComment(res.data.update_useractivitydata.returning[0].comment);
            });
            // mins
            fetchGraphQLActivity(activityQueries[5], "UpdateMins", variables[5]).then(res => {
                setMins(res.data.update_useractivitydata.returning[0].min);
            });
            // raw data
            fetchGraphQLActivity(activityQueries[6], "UpdateRawData", variables[6]).then(res => {
                // console.log(res);
                setRawData(res.data.update_useractivitydata.returning[0].raw_data);
            }).catch(res => {
                console.log(res);
            })
        }
    }

    // console.log(rawData);

    const variables = [
        {
            "klicks" : klicks,
            "_eq" : singleActivity.id
        },
        {
            "calories" : calories,
            "_eq" : singleActivity.id
        },
        {
            "steps" : steps,
            "_eq" : singleActivity.id
        },
        {
            "stream" : stream,
            "_eq" : singleActivity.id
        },
        {
            "comment" : comment,
            "_eq" : singleActivity.id
        },
        {
            "min" : mins,
            "_eq" : singleActivity.id
        },
        {
            "raw_data" : rawData,
            "_eq" : singleActivity.id
        }
    ]

  return (
    <div className='activity' >
        <div className='activity-head' >
            {
                (isDisabledActivity)?
                (
                    <input className='activity-inputs klicks' disabled={isDisabledActivity} type="text" value={((klicks==null)?(0):klicks)+" Klicks"} />
                ):
                (
                    <>Klicks: <input className='' type="text" value={klicks} onChange={e => setKlicks(e.target.value)} /></>
                )
            }
        </div>
        <hr />
        <div className='activity-body' >
            <div style={{maxWidth:"100%", paddingRight:"5px", borderRight:"0.5px solid #abb2b9"}} >
            {
                (isDisabledActivity)?
                (
                    <>
                    <div style={{display:"flex", alignItems:"center", justifyContent:"start"}} >
                        <input className='activity-inputs other-inputs' type="number" disabled={isDisabledActivity} value={((calories=="")?("0"):calories)} /><p style={{color:"black", fontSize:"14px", fontStyle:"italic"}} >{" KCal"}</p>
                    </div>
                    <hr />
                    <div style={{display:"flex", alignItems:"center", justifyContent:"start"}} >
                        <input className='activity-inputs other-inputs' type="number" disabled={isDisabledActivity} value={((steps=="")?("0"):steps)} /><p style={{color:"black", fontSize:"14px", fontStyle:"italic"}} >{" Steps"}</p>
                    </div>
                    <hr />
                    </>
                ):
                (
                    <>
                        Calories: <input className='other-inputs activity-editable-fields' type="number" value={((calories=="")?("0"):calories)} onChange={e => setCalories(e.target.value)} />
                        Steps: <input className='other-inputs activity-editable-fields' type="number" value={((steps=="")?("0"):steps)} onChange={e => setSteps(e.target.value)} />
                    </>
                )
            }
                {(isDisabledActivity)?
                (<><div>{"via "}<input className='activity-inputs other-inputs' type="text" disabled={isDisabledActivity} value={((stream=="")?("0"):stream)} /></div><hr /></>):
                (
                    <div>
                        <label htmlFor="Stream">Stream:</label>
                        <select name="stream" id="stream" onChange={e => setStream(e.target.value)} >
                            <option value="Select Stream">Select Stream</option>
                            <option value="MANUAL">MANUAL</option>
                            <option value="GOOGLE_FIT">GOOGLE_FIT</option>
                        </select>
                    </div>
                )}
                {
                (isDisabledActivity)?
                (
                    <div className='other-inputs-1' >
                        <p style={{color:"rgb(100, 100, 100)"}} >Comment:</p> {((comment=="")?("-"):comment)}
                    </div>
                    // <textarea className='activity-inputs other-inputs' name='body' disabled={isDisabledActivity} value={"Comment: "+((comment=="")?("-"):comment)} ></textarea>
                ):
                (
                    <>
                        Comment: <textarea className='' name='body' value={((comment=="")?("0"):comment)} onChange={e => setComment(e.target.value)} ></textarea>
                    </>
                )
            }
            </div>
            <div style={{maxWidth:"100%", paddingLeft:"5px", borderLeft:"0.5px solid #abb2b9"}} >
            {
                (isDisabledActivity)?
                (
                    <>
                        <input className='activity-inputs other-inputs' type="text" disabled={isDisabledActivity} value={((mins=="")?("0"):mins)+" Mins"} /><hr />
                        <input className='activity-inputs other-inputs' type="text" disabled={isDisabledActivity} value={((rawData==0)?(0):rawData)+((singleActivity.is_distance)?' Km':' Mins')} /><hr />
                    </>
                ):
                (
                    <>
                        Mins: <input className='other-inputs' type="text" value={((mins=="")?("0"):mins)} onChange={e => setMins(e.target.value)} />
                        {(singleActivity.is_distance)?"Km: ":"Mins: "}<input className='other-inputs' type="text" value={((rawData==0)?(0):rawData)} onChange={e => setRawData(e.target.value)} />
                    </>
                )
            }
            </div>
        </div>
        <button className={(isDisabledButton)?'block activity-edit-button-disabled':((isDisabledActivity)?'activity-edit-button':'activity-save-button')} disabled={isDisabledButton} onClick={clickHandlerOfEditActivity} >Edit Activity</button>
    </div>
  )
}

async function fetchGraphQLActivity(operationsDoc, operationName, variables) {
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

export default Activity;