import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'
import { useIndexedDB } from 'react-indexed-db'
import { useLoading } from '@agney/react-loading'

import Heading from 'components/Heading'
import Box from 'components/Box'
import LoaderContainer from 'components/LoaderContainer'
import useIndexFace from 'hooks/useIndexFace'
import { Student } from 'types/student'
import Form from 'components/StudentForm'

const StyledP = styled.p`
  margin-top: 0;
`

// @todo:Test it
const Register = () => {
  const history = useHistory()
  const { add, update } = useIndexedDB('students')
  const [userId, setUserId] = useState<string>('')
  const [student, setStudent] = useState<Student>()
  const { isFetching, isSuccess, error, faceId } = useIndexFace({
    base64Image: student?.image,
    userId,
  })
  const { containerProps, indicatorEl } = useLoading({
    loading: isFetching && !isSuccess,
  })
  useEffect(() => {
    if (isSuccess) {
      update({ ...student, id: parseInt(userId), faceId }).catch(console.error)
      history.push('/list')
    }
  }, [isSuccess, history, faceId, userId, update, student])
  const onSubmit = async (data: Student) => {
    try {
      if (data.image) {
        const dbRes = await add(data)
        // eslint-disable-next-line no-console
        console.log(dbRes)
        setUserId(dbRes.toString())
        setStudent(data)
      } else {
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: 'smooth',
        })
        alert('Image is required for authentication')
      }
    } catch (error) {
      console.error(error)
    }
  }
  // eslint-disable-next-line no-console
  console.log(
    isFetching,
    isSuccess,
    error,
    '----isFetching, isSuccess, error----',
  )

  return (
    <Box $padding="medium">
      {indicatorEl && (
        <LoaderContainer {...containerProps}>{indicatorEl}</LoaderContainer>
      )}
      <Heading>Register</Heading>
      <StyledP>Fields marked with an asterisk (*) are required.</StyledP>
      <Form onSubmit={onSubmit} />
    </Box>
  )
}

export default Register
