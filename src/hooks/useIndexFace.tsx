import { useState, useEffect } from 'react'
import { rekog } from 'App'

import convertDataURIToBinary from 'utils/base64-to-uint8array'
const { REACT_APP_AWS_REKOGNITION_COLLECTION_ID: CollectionId } = process.env

interface Props {
  base64Image: string
  userId: string
}
const useIndexFace = ({ base64Image, userId }: Props) => {
  const [status, setStatus] = useState<{
    isSuccess: boolean
    isFetching: boolean
    error: string
  }>({ isSuccess: false, isFetching: false, error: '' })
  useEffect(() => {
    if (base64Image) {
      setStatus({ ...status, isFetching: true })
      const payload = {
        CollectionId,
        ExternalImageId: userId,
        Image: { Bytes: convertDataURIToBinary(base64Image) },
        MaxFaces: 1,
      }
      rekog
        .indexFaces(payload)
        .then((res) => {
          // eslint-disable-next-line no-console
          console.log(res)
          setStatus({ ...status, isSuccess: true })
        })
        .catch((err) => {
          console.error(err)
          // If collection does not exists then create new
          if (err?.Code) setStatus({ ...status, error: err.Code })
        })
    }
  }, [base64Image])
  return status
}

export default useIndexFace
