import React, { useEffect, useState } from 'react'
import './User.css'
import { Link, Route } from 'react-router-dom'
import UserProfile from '../UserProfile/UserProfile'
import Routes from '../Routes/Routes'
import { queries } from '../Queries'

function User({ user, index }) {

  const [globalPoints, setGlobalPoints] = useState();

  const variables = [
    {
      "_eq": user.id
    }
  ]

  // console.log(user.id);

  useEffect(() => {
    fetchGraphQL(queries[10], "GetGlobalPoints", variables[0]).then(res => {
      setGlobalPoints(res.data.leaderboardconnection[0].global_points);
    });
  }, [])

  return (
    <>
      <div>
        <div className='user' >
          <div className='serial-number' >
            {index+1}{")"}
          </div>
          <img className='user-image' src={user.image_id} alt="profile photo" />
          <div className='user-name' >
            {user.username}
            <div>
              {user.first_name}
              {" "}
              {user.last_name}
            </div>
          </div>
          <div className='user-xp-and-area' >
            {(globalPoints==null)?0:globalPoints} XP
          </div>
        </div>
        <hr />
      </div>
    </>

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
        operationName: operationName,
        variables: variables
      })
    }
  )
  return await result.json();
};

export default User
