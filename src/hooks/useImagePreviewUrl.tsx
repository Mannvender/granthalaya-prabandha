import { useState, useEffect } from 'react'

interface Props {
  blob?: Blob
}
const useImagePreviewUrl = ({ blob }: Props) => {
  const [imagePreviewUrl, setPreview] = useState<any>('')
  useEffect(() => {
    if (blob) {
      const reader = new FileReader()
      reader.onloadend = () => {
        const previewUrl = reader.result || ''
        setPreview(previewUrl)
      }
      reader.readAsDataURL(blob)
    }
  }, [blob])

  return imagePreviewUrl
}

export default useImagePreviewUrl
