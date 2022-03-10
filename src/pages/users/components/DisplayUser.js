import React from 'react'

function DisplayUser({user}) {
  console.log("displaying user");
  console.log(user);
  return (
    <div>
        {
            user.map((i) => <div key={i.id}>{i.first_name}</div>)
        }
    </div>
  )
}

export default DisplayUser