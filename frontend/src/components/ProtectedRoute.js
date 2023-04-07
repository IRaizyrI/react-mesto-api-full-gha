import React from 'react'
import { Route, Redirect } from 'react-router-dom'

 const ProtectedRoute = ({ component: Component, ...props }) => {
  return (
    <Route exact path={props.path}>
    {props.loggedIn ? <Component {...props}></Component>:<Redirect to={'/sign-in'}></Redirect>}
  </Route>
  )
}
export default ProtectedRoute
