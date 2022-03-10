import React from 'react'
import { Route } from 'react-router-dom'
import UserProfile from '../UserProfile/UserProfile'

function Routes() {
    
  return (
      <>
        <Route exact path="/user" component={UserProfile} />
      </>
  )
}

export default Routes;