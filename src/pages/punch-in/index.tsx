import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react'
import styled, { css } from 'styled-components'
import { useLoading } from '@agney/react-loading'
import { useIndexedDB } from 'react-indexed-db'
import { toast } from 'react-toastify'
import { RiCheckDoubleFill, RiCloseFill } from 'react-icons/ri'
import { Modal } from 'react-responsive-modal'
import 'react-responsive-modal/styles.css'

import Box from 'components/Box'
import Webcam from 'components/Webcam'
import Heading from 'components/Heading'
import P from 'components/Paragraph'
import LoaderContainer from 'components/LoadingContainer'
import useSearchFaces from 'hooks/useSearchFaces'
import { Student } from 'types/student'

const StyledImg = styled.img.attrs(() => ({
  alt: 'student',
}))`
  height: 72px;
  width: 72px;
  border-radius: 50%;
`
const StyledName = styled.div`
  font-size: 28px;
`
const SmallIconCss = css`
  height: 24px;
  width: 24px;
  cursor: pointer;
  margin-left: 4px;
`
const StyledCheckIcon = styled(RiCheckDoubleFill)`
  ${SmallIconCss}
  color: ${({ theme }) => theme.color.success};
`
const StyledCrossIcon = styled(RiCloseFill)`
  ${SmallIconCss}
  color: ${({ theme }) => theme.color.error};
`

const PunchIn = () => {
  const toastId = useRef<string | number>()
  const [base64Image, setImage] = useState('')
  const [studentInfo, setStudentInfo] = useState<Student>()
  const {
    faceMatches,
    isFetching,
    isSuccess,
    error,
    resetStatus,
  } = useSearchFaces({
    base64Image,
  })
  const _resetStatus = useCallback(resetStatus, [])
  const { containerProps, indicatorEl } = useLoading({
    loading: isFetching && !isSuccess && !error,
  })
  const { getByID } = useIndexedDB('students')
  // eslint-disable-next-line no-console
  console.log(
    faceMatches,
    isFetching,
    isSuccess,
    error,
    '------isFetching, isSuccess, error-----',
  )

  useEffect(() => {
    // auto closing modal
    let timer: NodeJS.Timeout
    if (studentInfo) {
      timer = setTimeout(() => {
        _resetStatus()
        setStudentInfo(undefined)
      }, 10000)
    }
    return () => {
      if (timer) window.clearTimeout(timer)
    }
  }, [studentInfo, _resetStatus])

  useEffect(() => {
    const faceMatch = faceMatches[0]
    if (faceMatch) {
      if (faceMatch.Similarity && faceMatch.Similarity > 80) {
        const indexedDbId = faceMatch.Face?.ExternalImageId
        if (indexedDbId) {
          getByID(indexedDbId)
            .then((studentFromDB) => {
              delete studentFromDB.image
              studentFromDB.feePaid = studentFromDB?.feePaid === 'true'
              setStudentInfo(studentFromDB)
              toastId.current = toast.info('Modal will autoclose...', {
                autoClose: 10000,
                pauseOnHover: false,
                pauseOnFocusLoss: false,
                closeOnClick: false,
                closeButton: false,
              })
            })
            .catch((err) => {
              toast.error(
                err?.name || 'No student record found for given face data!',
              )
              // @todo: delete face data from aws
              // toast.info(
              //   'Deleting face data since do student data was found associated',
              // )
              console.error(err)
            })
        }
      }
    }
    // eslint-disable-next-line
  }, [faceMatches])

  const isOnTime = useMemo(() => {
    if (!studentInfo?.timeSlotIn || !studentInfo?.timeSlotOut) return false

    const punchInHoursMinutes = studentInfo.timeSlotIn.split(':')
    const punchOutHoursMinutes = studentInfo.timeSlotOut.split(':')
    if (punchInHoursMinutes.length < 2 || punchOutHoursMinutes.length < 2)
      return false

    const now = new Date()
    const punchIn = new Date()
    punchIn.setHours(parseInt(punchInHoursMinutes[0]))
    punchIn.setMinutes(parseInt(punchInHoursMinutes[1]))
    const punchOut = new Date()
    punchOut.setHours(parseInt(punchOutHoursMinutes[0]))
    punchOut.setMinutes(parseInt(punchOutHoursMinutes[1]))

    return (
      now.getTime() >= punchIn.getTime() && now.getTime() <= punchOut.getTime()
    )
  }, [studentInfo])

  const handleCapture = (base64: string) => setImage(base64)
  const onCloseModal = () => {
    _resetStatus()
    setStudentInfo(undefined)
    if (toastId.current) toast.dismiss(toastId.current)
  }

  return (
    <>
      <Box $padding="medium">
        {indicatorEl && (
          <LoaderContainer {...containerProps}>{indicatorEl}</LoaderContainer>
        )}
        <Heading>Punch In</Heading>
        <Webcam onCapture={handleCapture} />
      </Box>
      <Modal
        open={Boolean(studentInfo)}
        onClose={onCloseModal}
        center
        aria-labelledby="modal-title"
        styles={{
          root: { color: 'gray' },
          modal: { borderRadius: '4px' },
        }}
      >
        <Heading id="modal-title">Snapshot</Heading>
        <Box $direction="row">
          <StyledImg
            src={
              studentInfo?.image ||
              'https://i.ibb.co/RctXVMy/user-placeholder.png'
            }
          />
          <Box $margin={{ left: 'medium' }} $justifyContent="center">
            <StyledName>{studentInfo?.name}</StyledName>
            {studentInfo?.timeSlotIn && studentInfo.timeSlotOut ? (
              <div>
                {studentInfo?.timeSlotIn}-{studentInfo?.timeSlotOut}
              </div>
            ) : (
              <P $color="error">Time slots not updated in database</P>
            )}
          </Box>
        </Box>
        <Box $direction="row" $margin={{ top: 'medium' }}>
          Fee paid:
          {studentInfo?.feePaid ? <StyledCheckIcon /> : <StyledCrossIcon />}
        </Box>
        <Box $direction="row" $margin={{ top: 'small' }}>
          On time:
          {isOnTime ? <StyledCheckIcon /> : <StyledCrossIcon />}
        </Box>
      </Modal>
    </>
  )
}

export default PunchIn
