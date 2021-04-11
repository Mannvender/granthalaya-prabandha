import { useState, useEffect } from 'react'
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
        .then((res) => {
          // eslint-disable-next-line no-console
          console.log(res)
          setStatus((prevState) => ({ ...prevState, isSuccess: true }))
        })
        .catch((err) => {
          console.error(err)
          // If collection does not exists then create new
          if (err?.Code)
            setStatus((prevState) => ({ ...prevState, error: err.Code }))
        })
    }
  }, [faceIds])
  return status
}

export default useDeleteFaces
