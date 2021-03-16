import * as React from "react"
import { useRef, useCallback, useState } from "react"
import Webcam from "react-webcam"
import Box from "components/Box"

const Home = () => {
  const webcamRef = useRef<Webcam>(null!)
  const [file, setFile] = useState<any>(null)

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
        videoConstraints={{ facingMode: "user" }}
        onUserMediaError={handleMediaStreamError}
      />
      <button onClick={handleCaptureClick}>Capture</button>
    </Box>
  )
}

export default Home
