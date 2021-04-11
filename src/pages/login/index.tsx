import React, { useState, useEffect } from 'react'
import { useLoading } from '@agney/react-loading'
import { useIndexedDB } from 'react-indexed-db'

import Box from 'components/Box'
import Webcam from 'components/Webcam'
import Heading from 'components/Heading'
import LoaderContainer from 'components/LoaderContainer'
import useSearchFaces from 'hooks/useSearchFaces'

const Login = () => {
  const [base64Image, setImage] = useState('')
  const [studentInfo, setStudentInfo] = useState({})
  const { faceMatches, isFetching, isSuccess, error } = useSearchFaces({
    base64Image,
  })
  const { containerProps, indicatorEl } = useLoading({
    loading: isFetching && !isSuccess,
  })
  const { getByID } = useIndexedDB('students')
  // eslint-disable-next-line no-console
  console.log(
    faceMatches,
    isFetching,
    isSuccess,
    error,
    '------isFetching, isSuccess, error-----',
  )

  useEffect(() => {
    const faceMatch = faceMatches[0]
    if (faceMatch) {
      if (faceMatch.Similarity && faceMatch.Similarity > 80) {
        const indexedDbId = faceMatch.Face?.ExternalImageId
        if (indexedDbId)
          getByID(indexedDbId)
            .then((studentFromDB) => {
              delete studentFromDB.image
              setStudentInfo(studentFromDB)
            })
            .catch(console.error)
      }
    }
    // eslint-disable-next-line
  }, [faceMatches])

  const handleCapture = (base64: string) => setImage(base64)

  return (
    <Box $padding="medium">
      {indicatorEl && (
        <LoaderContainer {...containerProps}>{indicatorEl}</LoaderContainer>
      )}
      <Heading>Login</Heading>
      <Webcam onCapture={handleCapture} />
      <Box $margin={{ top: 'large' }}>
        {JSON.stringify(studentInfo, null, 2)}
      </Box>
    </Box>
  )
}

export default Login
