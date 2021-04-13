import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { rekog } from 'App'

const { REACT_APP_AWS_REKOGNITION_COLLECTION_ID: CollectionId } = process.env

interface Props {
  faceIds: string[]
}
const useDeleteFaces = ({ faceIds }: Props) => {
  const [status, setStatus] = useState<{
    isSuccess: boolean
    isFetching: boolean
    error: string
  }>({ isSuccess: false, isFetching: false, error: '' })
  useEffect(() => {
    if (faceIds[0] && !status.isFetching && !status.isSuccess) {
      setStatus((prevState) => ({ ...prevState, isFetching: true }))
      const payload = {
        CollectionId,
        FaceIds: faceIds,
      }
      rekog
        .deleteFaces(payload)
        .then(() => {
          setStatus((prevState) => ({ ...prevState, isSuccess: true }))
        })
        .catch((err) => {
          toast.error(err?.message || 'Face data could not be deleted!')
          console.error(err)
          // If collection does not exists then create new
          if (err?.Code)
            setStatus((prevState) => ({ ...prevState, error: err.Code }))
        })
    }
    // eslint-disable-next-line
  }, [faceIds])
  return status
}

export default useDeleteFaces
