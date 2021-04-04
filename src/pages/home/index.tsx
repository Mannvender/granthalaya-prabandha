import * as React from 'react'
import { useRef, useCallback, useState, useEffect } from 'react'
import { Rekognition } from '@aws-sdk/client-rekognition'
import { CognitoIdentityClient } from '@aws-sdk/client-cognito-identity'
import { fromCognitoIdentityPool } from '@aws-sdk/credential-provider-cognito-identity'
import Webcam from 'react-webcam'

import Box from 'components/Box'
import convertDataURIToBinary from 'utils/base64-to-uint8array'
const { REACT_APP_AWS_REGION, REACT_APP_AWS_IDENTITY_POOL_ID } = process.env

const Home = () => {
  const webcamRef = useRef<Webcam>(null!)
  const [file, setFile] = useState<any>(null)
  useEffect(() => {
    try {
      if (file) {
        const cognitoIdentityClient = new CognitoIdentityClient({
          region: REACT_APP_AWS_REGION,
        })
        const rekog = new Rekognition({
          region: REACT_APP_AWS_REGION,
          credentials: fromCognitoIdentityPool({
            client: cognitoIdentityClient,
            identityPoolId: REACT_APP_AWS_IDENTITY_POOL_ID!,
          }),
        })
        const payload = {
          CollectionId: 'test-users',
          ExternalImageId: 'user-1',
          Image: { Bytes: convertDataURIToBinary(file) },
          MaxFaces: 1,
        }
        rekog.indexFaces(payload)
      }
    } catch (error) {
      console.error(error)
    }
  }, [])

  const handleCaptureClick = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot()
    setFile(imageSrc)
  }, [webcamRef])

  const handleMediaStreamError = (e: string | DOMException) => console.error(e)

  return (
    <Box alignItems="center">
      <Webcam
        audio={false}
        ref={webcamRef}
        height={240}
        width={360}
        screenshotFormat="image/jpeg"
        minScreenshotHeight={720}
        minScreenshotWidth={1280}
        videoConstraints={{ facingMode: 'user' }}
        onUserMediaError={handleMediaStreamError}
      />
      <button onClick={handleCaptureClick}>Capture</button>
    </Box>
  )
}

export default Home
