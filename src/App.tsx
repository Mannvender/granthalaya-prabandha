// library imports
import React from 'react'
import { HashRouter as Router, Switch } from 'react-router-dom'
import styled, { ThemeProvider } from 'styled-components'
import { initDB } from 'react-indexed-db'
import { LoaderProvider, Puff } from '@agney/react-loading'
import { Rekognition } from '@aws-sdk/client-rekognition'
import { CognitoIdentityClient } from '@aws-sdk/client-cognito-identity'
import { fromCognitoIdentityPool } from '@aws-sdk/credential-provider-cognito-identity'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import theme from 'theme'
import routes from 'routes'
import { dbConfig } from 'dbConfig'
import PublicRoute from 'routes/Public'
import PublicOnlyRoute from 'routes/PublicOnly'
import PrivateRoute from 'routes/Private'

import ErrorBoundry from 'components/ErrorBoundry'
const { REACT_APP_AWS_REGION, REACT_APP_AWS_IDENTITY_POOL_ID } = process.env

initDB(dbConfig)

const cognitoIdentityClient = new CognitoIdentityClient({
  region: REACT_APP_AWS_REGION,
})
export const rekog = new Rekognition({
  region: REACT_APP_AWS_REGION,
  credentials: fromCognitoIdentityPool({
    client: cognitoIdentityClient,
    identityPoolId: REACT_APP_AWS_IDENTITY_POOL_ID!,
  }),
})

const StyledPuff = styled(Puff as any)`
  height: 20%;
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`

function App() {
  return (
    <ThemeProvider
      theme={{
        color: theme.color.dark,
        size: theme.size.medium,
        edgeSize: theme.edgeSize.medium,
      }}
    >
      <Router>
        <ErrorBoundry>
          <LoaderProvider indicator={<StyledPuff />}>
            <ToastContainer
              position="top-right"
              autoClose={5000}
              closeOnClick
              pauseOnFocusLoss
              pauseOnHover
            />
            <Switch>
              {routes.map((route) => {
                if (route.private) {
                  return <PrivateRoute key={route.path} {...route} />
                } else if (route.publicOnly) {
                  return <PublicOnlyRoute key={route.path} {...route} />
                } else {
                  return <PublicRoute key={route.path} {...route} />
                }
              })}
            </Switch>
          </LoaderProvider>
        </ErrorBoundry>
      </Router>
    </ThemeProvider>
  )
}

export default App
