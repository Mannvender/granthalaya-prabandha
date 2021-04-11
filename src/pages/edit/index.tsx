import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useIndexedDB } from 'react-indexed-db'
import { useEffectOnce } from 'react-use'
import { useHistory } from 'react-router-dom'
import { useLoading } from '@agney/react-loading'

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
  const { isSuccess, faceId } = useIndexFace({
    base64Image: (isFaceDataCleared && updatedStudent?.image) || '',
    userId: updatedStudent?.id?.toString(),
  })
  useEffect(() => {
    if (isSuccess) {
      update({
        ...updatedStudent,
        id: updatedStudent?.id,
        faceId,
      }).catch(console.error)
      history.push('/list')
    }
  }, [isSuccess, history, faceId, update, updatedStudent])
  useEffectOnce(() => {
    getByIndex('admissionNo', admissionNo).then(setStudent).catch(console.error)
  })
  const { containerProps, indicatorEl } = useLoading({
    loading: isFetching && !isSuccess,
  })
  const onSubmit = (data: Student) => {
    // eslint-disable-next-line no-console
    console.log(data)
    update(data)
      .then(() => {
        // if image has been changed by user, update aws face data
        if (data.image !== student?.image) setUpdatedStudent(data)
      })
      .catch(console.error)
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
