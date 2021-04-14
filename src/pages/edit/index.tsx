import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useIndexedDB } from 'react-indexed-db'
import { useEffectOnce } from 'react-use'
import { useHistory } from 'react-router-dom'
import { useLoading } from '@agney/react-loading'
import { toast } from 'react-toastify'

import { Student } from 'types/student'
import Form from 'components/StudentForm'
import Box from 'components/Box'
import useDeleteFaces from 'hooks/useDeleteFaces'
import useIndexFace from 'hooks/useIndexFace'
import LoaderContainer from 'components/LoadingContainer'

const Edit = () => {
  const history = useHistory()
  const { admissionNo } = useParams<{ admissionNo: 'string' }>()
  const { getByIndex, update } = useIndexedDB('students')
  const [student, setStudent] = useState<Student>()
  const [updatedStudent, setUpdatedStudent] = useState<Student>()
  const { isFetching, isSuccess: isFaceDataCleared } = useDeleteFaces({
    faceIds: [(updatedStudent && student?.faceId) || ''],
  })
  const { isSuccess, error: indexFaceError, faceId } = useIndexFace({
    base64Image:
      ((isFaceDataCleared || !student?.faceId) && updatedStudent?.image) || '',
    userId: updatedStudent?.id?.toString(),
  })
  useEffect(() => {
    if (isSuccess) {
      update({
        ...updatedStudent,
        id: updatedStudent?.id,
        faceId,
      })
        .then(() => {
          history.push('/list')
        })
        .catch(console.error)
    }
    if (indexFaceError) {
      // if face could not be indexed then remove image from indexed-db
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth',
      })
      update({
        ...updatedStudent,
        id: updatedStudent?.id,
        faceId: '',
        image: '',
      }).catch(console.error)
    }
  }, [isSuccess, indexFaceError, history, faceId, update, updatedStudent])
  useEffectOnce(() => {
    getByIndex('admissionNo', admissionNo).then(setStudent).catch(console.error)
  })
  const { containerProps, indicatorEl } = useLoading({
    loading: isFetching && !isSuccess,
  })
  const onSubmit = (data: Student) => {
    update(data)
      .then(() => {
        // if image has been changed by user, update aws face data
        if (data.image !== student?.image) setUpdatedStudent(data)
        else {
          toast.success('Student updated!')
          history.push('/list')
        }
      })
      .catch((err) => {
        toast.error(err?.message || 'Student could not be updated!')
        console.error(err)
      })
  }

  return (
    <Box>
      {indicatorEl && (
        <LoaderContainer {...containerProps}>{indicatorEl}</LoaderContainer>
      )}
      {student && <Form defaultValues={student} onSubmit={onSubmit} />}
    </Box>
  )
}

export default Edit
