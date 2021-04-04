import React, { useRef, useCallback, useState, useEffect } from 'react'
import Webcam from 'react-webcam'

import Box from 'components/Box'
import convertDataURIToBinary from 'utils/base64-to-uint8array'
import { rekog } from 'App'
// import useListFaces from 'hooks/useListFaces'
const { REACT_APP_AWS_REKOGNITION_COLLECTION_ID: CollectionId } = process.env

const Home = () => {
  const webcamRef = useRef<Webcam>(null!)
  const [file, setFile] = useState<any>(null)
  // const faces = useListFaces()
  useEffect(() => {
    if (file) {
      const payload = {
        CollectionId,
        ExternalImageId: 'user-1',
        Image: { Bytes: convertDataURIToBinary(file) },
        MaxFaces: 1,
      }
      // eslint-disable-next-line no-console
      rekog.indexFaces(payload).then(console.log).catch(console.error)
    }
  }, [file])

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
