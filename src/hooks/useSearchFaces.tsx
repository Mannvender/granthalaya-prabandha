import { useState, useEffect } from 'react'
import { rekog } from 'App'
import { toast } from 'react-toastify'

import convertDataURIToBinary from 'utils/base64-to-uint8array'
import { FaceMatch } from '@aws-sdk/client-rekognition'
const { REACT_APP_AWS_REKOGNITION_COLLECTION_ID: CollectionId } = process.env

interface Props {
  base64Image: string
}
const useSearchFaces = ({ base64Image }: Props) => {
  const [status, setStatus] = useState<{
    faceMatches: FaceMatch[]
    isSuccess: boolean
    isFetching: boolean
    error: string
  }>({ isSuccess: false, isFetching: false, error: '', faceMatches: [] })
  const resetStatus = () =>
    setStatus({
      faceMatches: [],
      isFetching: false,
      isSuccess: false,
      error: '',
    })
  useEffect(() => {
    if (base64Image && !status.isFetching && !status.isSuccess) {
      setStatus((prevState) => ({ ...prevState, isFetching: true }))
      const payload = {
        CollectionId,
        Image: {
          Bytes: convertDataURIToBinary(base64Image),
        },
        MaxFaces: 1,
      }
      rekog
        .searchFacesByImage(payload)
        .then((res) => {
          setStatus((prevState) => ({
            ...prevState,
            faceMatches: res?.FaceMatches || [],
            isSuccess: true,
          }))
        })
        .catch((err) => {
          toast.error(
            err?.message || 'No face data found, please try again or register!',
            { onClose: resetStatus },
          )
          console.error(err)
          // If collection does not exists then create new
          if (err?.Code)
            setStatus((prevState) => ({ ...prevState, error: err.Code }))
        })
    }
    // eslint-disable-next-line
  }, [base64Image])
  return { ...status, resetStatus }
}

export default useSearchFaces
