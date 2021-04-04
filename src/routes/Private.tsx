import React from 'react'
import { Route, Redirect } from 'react-router-dom'

import { getAuthToken } from 'utils/auth-singleton'
import StackLayout from 'layouts/Stack'

interface Props {
  component?: any
}
const PrivateRoute = ({ component: Component, ...rest }: Props) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        const authToken = getAuthToken()
        if (!authToken) {
          return <Redirect to={{ pathname: '/login' }} />
        }
        return (
          <StackLayout>
            <Component {...props} />
          </StackLayout>
        )
      }}
    />
  )
}

export default PrivateRoute
