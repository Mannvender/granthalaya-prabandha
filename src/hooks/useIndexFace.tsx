import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { rekog } from 'App'

import convertDataURIToBinary from 'utils/base64-to-uint8array'
const { REACT_APP_AWS_REKOGNITION_COLLECTION_ID: CollectionId } = process.env

interface Props {
  base64Image: string
  userId?: string
}
const useIndexFace = ({ base64Image, userId }: Props) => {
  const [status, setStatus] = useState<{
    isSuccess: boolean
    isFetching: boolean
    error: string
    faceId: string
  }>({ isSuccess: false, isFetching: false, error: '', faceId: '' })
  useEffect(() => {
    if (base64Image && userId) {
      setStatus((prevState) => ({ ...prevState, isFetching: true }))
      const payload = {
        CollectionId,
        ExternalImageId: userId,
        Image: { Bytes: convertDataURIToBinary(base64Image) },
        MaxFaces: 1,
      }
      rekog
        .indexFaces(payload)
        .then((res) => {
          let faceId = ''
          if (res.FaceRecords?.length) {
            faceId = res.FaceRecords[0]?.Face?.FaceId || ''
            setStatus((prevState) => ({
              ...prevState,
              isSuccess: true,
              faceId,
            }))
          }
          if (!faceId) {
            const errorMessage = 'No face could be detected in selected image!'
            toast.error(errorMessage)
            setStatus((prevState) => ({ ...prevState, error: errorMessage }))
          }
        })
        .catch((err) => {
          toast.error(err?.message || 'Face data could not be extracted!')
          console.error(err)
          // If collection does not exists then create new
          if (err?.Code)
            setStatus((prevState) => ({ ...prevState, error: err.Code }))
        })
    }
  }, [base64Image, userId])
  return status
}

export default useIndexFace
