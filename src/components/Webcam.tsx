import React, { useRef, useCallback } from 'react'
import RCWebcam from 'react-webcam'

import Button from 'components/Button'
import Box from 'components/Box'

interface Props {
  onCapture?: (file: string) => void
}
const Webcam = ({ onCapture }: Props) => {
  const webcamRef = useRef<RCWebcam>(null!)

  const handleCaptureClick = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot()
    if (onCapture) onCapture(imageSrc || '')
  }, [webcamRef, onCapture])

  const handleMediaStreamError = (e: string | DOMException) => console.error(e)

  return (
    <Box $alignItems="center">
      <RCWebcam
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
      <Button
        onClick={handleCaptureClick}
        backgroundColor="#fff"
        color="accent-3"
        $margin={{ top: 'medium' }}
      >
        Capture
      </Button>
    </Box>
  )
}

export default Webcam
