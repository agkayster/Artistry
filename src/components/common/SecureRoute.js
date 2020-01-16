import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { toast } from 'react-toastify'

import Auth from '../../lib/Auth'

const SecureRoute = (props) => {
  // if logged in, return a Route with the same props as SecureRoute
  if(Auth.isAuthenticated()) return <Route {...props} />
  // otherwise redirect to login
  toast.error('Remember to log in first')
  return <Redirect to="/login" />
}

export default SecureRoute
