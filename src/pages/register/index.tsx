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

const Register = () => {
  const history = useHistory()
  const { add } = useIndexedDB('students')
  const [userId, setUserId] = useState<string>('')
  const [base64Image, setImage] = useState<string>('')
  const { isFetching, isSuccess, error } = useIndexFace({
    base64Image: base64Image,
    userId,
  })
  const { containerProps, indicatorEl } = useLoading({
    loading: isFetching && !isSuccess,
  })
  useEffect(() => {
    if (isSuccess) history.push('/list')
  }, [isSuccess])
  const onSubmit = async (data: Student, base64Image: string) => {
    try {
      if (base64Image) {
        const payload = { ...data, image: base64Image }
        const dbRes = await add(payload)
        // eslint-disable-next-line no-console
        console.log(dbRes)
        setUserId(dbRes.toString())
        setImage(base64Image)
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
