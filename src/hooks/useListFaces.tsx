import { useState } from 'react'
import { useEffectOnce } from 'react-use'
import { rekog } from 'App'
import { Face } from '@aws-sdk/client-rekognition'

const { REACT_APP_AWS_REKOGNITION_COLLECTION_ID: CollectionId } = process.env

const useListFaces = () => {
  const [faces, setFaces] = useState<Face[]>([])
  useEffectOnce(() => {
    const payload = {
      CollectionId,
      MaxResults: 1000,
    }
    rekog
      .listFaces(payload)
      .then((res) => {
        setFaces(res?.Faces!)
      })
      .catch((err) => {
        console.error(err)
        // If collection does not exists then create new
        if (err?.Code === 'ResourceNotFoundException') {
          const payload = {
            CollectionId,
          }
          rekog.createCollection(payload)
        }
      })
  })
  return faces
}

export default useListFaces
