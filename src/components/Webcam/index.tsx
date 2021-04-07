import React, { useRef, useCallback, useState, useEffect } from 'react'
import RCWebcam from 'react-webcam'

interface Props {
  onCapture?: (file: string) => void
}
const Webcam = ({ onCapture }: Props) => {
  const webcamRef = useRef<RCWebcam>(null!)
  const [file, setFile] = useState<any>(null)
  useEffect(() => {
    if (file && onCapture) onCapture(file)
  }, [file, onCapture])

  const handleCaptureClick = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot()
    setFile(imageSrc)
  }, [webcamRef])

  const handleMediaStreamError = (e: string | DOMException) => console.error(e)

  return (
    <>
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
      <button onClick={handleCaptureClick}>Capture</button>
    </>
  )
}

export default Webcam
