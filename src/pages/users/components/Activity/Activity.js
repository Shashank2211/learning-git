import React from 'react'
import { useState } from 'react';
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
        }
    }

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
        }
    ]

  return (
    <div className='activity' >
        <div className='activity-head' >
            {
                (isDisabledActivity)?
                (
                    <input className='activity-inputs klicks' disabled={isDisabledActivity} type="text" value={klicks+" klicks"} />
                ):
                (
                    <input className='' type="text" value={klicks} onChange={e => setKlicks(e.target.value)} />
                )
            }
        </div>
        <div className='activity-body' >
            <div>
            {
                (isDisabledActivity)?
                (
                    <>
                    <div style={{display:"flex", alignItems:"center", justifyContent:"center"}} >
                        <input className='activity-inputs other-inputs' type="number" disabled={isDisabledActivity} value={calories} />{" KCal"}
                    </div>
                    <div style={{display:"flex", alignItems:"center", justifyContent:"center"}} >
                        <input className='activity-inputs other-inputs' type="number" disabled={isDisabledActivity} value={steps} />{" Steps"}
                    </div>
                    </>
                ):
                (
                    <>
                        <input className='' type="number" value={calories} onChange={e => setCalories(e.target.value)} />
                        <input className='' type="number" value={steps} onChange={e => setSteps(e.target.value)} />
                    </>
                )
            }
                {(isDisabledActivity)?
                (<div>{"via "}<input className='activity-inputs other-inputs' type="text" disabled={isDisabledActivity} value={stream} />{" entry"}</div>):
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
                    <input className='activity-inputs other-inputs' type="text" disabled={isDisabledActivity} value={"Comment: "+comment} />
                ):
                (
                    <input className='' type="text" value={comment} onChange={e => setComment(e.target.value)} />
                )
            }
            </div>
            <div>
            {
                (isDisabledActivity)?
                (
                    <>
                        <input className='activity-inputs other-inputs' type="text" disabled={isDisabledActivity} value={mins+" mins"} />
                        <input className='' type="text" disabled={isDisabledActivity} />
                    </>
                ):
                (
                    <>
                        <input className='activity-inputs other-inputs' type="text" value={mins} onChange={e => setMins(e.target.value)} />
                        <input className='' type="text" />
                    </>
                )
            }
            </div>
        </div>
        <button disabled={isDisabledButton} onClick={clickHandlerOfEditActivity} >Edit Activity</button>
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