import * as React from 'react'
import { useRef, useCallback, useState, useEffect } from 'react'
import Webcam from 'react-webcam'
import Box from 'components/Box'
import { Rekognition } from '@aws-sdk/client-rekognition'
import { CognitoIdentityClient } from '@aws-sdk/client-cognito-identity'
import { fromCognitoIdentityPool } from '@aws-sdk/credential-provider-cognito-identity'
const { REACT_APP_AWS_REGION, REACT_APP_AWS_IDENTITY_POOL_ID } = process.env
const BASE64_MARKER = ';base64,'

function convertDataURIToBinary(dataURI: string) {
  const base64Index = dataURI.indexOf(BASE64_MARKER) + BASE64_MARKER.length
  const base64 = dataURI.substring(base64Index)
  const raw = window.atob(base64)
  const rawLength = raw.length
  const array = new Uint8Array(new ArrayBuffer(rawLength))

  for (let i = 0; i < rawLength; i++) {
    array[i] = raw.charCodeAt(i)
  }
  return array
}

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
