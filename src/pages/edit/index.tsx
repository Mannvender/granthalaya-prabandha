import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useIndexedDB } from 'react-indexed-db'
import { useEffectOnce } from 'react-use'

import { Student } from 'types/student'
import Form from 'components/StudentForm'
import Box from 'components/Box'

const Edit = () => {
  const { admissionNo } = useParams<{ admissionNo: 'string' }>()
  const { getByIndex } = useIndexedDB('students')
  const [student, setStudent] = useState<Student>()
  useEffectOnce(() => {
    getByIndex('admissionNo', admissionNo).then(setStudent).catch(console.error)
  })
  const onSubmit = (data: Student, base64Image: string) => {
    // eslint-disable-next-line no-console
    console.log(data, base64Image)
  }

  return (
    <Box>{student && <Form defaultValues={student} onSubmit={onSubmit} />}</Box>
  )
}

export default Edit
