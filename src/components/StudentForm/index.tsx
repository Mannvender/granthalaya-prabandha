import React, { useState } from 'react'
import styled from 'styled-components'
import { useForm } from 'react-hook-form'

import Button from 'components/Button'
import Webcam from 'components/Webcam'
import Box from 'components/Box'
import { Student } from 'types/student'
import useImagePreviewUrl from 'hooks/useImagePreviewUrl'

const StyledForm = styled.form`
  font-weight: 600;
  margin: ${({ theme }) => theme.edgeSize.medium};
  label,
  input {
    line-height: 1.5;
    border-radius: ${({ theme }) => theme.edgeSize.xsmall};
  }
  label {
    font-size: 18px;
    margin-bottom: ${({ theme }) => theme.edgeSize.small};
    min-width: 220px;
  }
  input {
    width: 100%;
    font-size: 24px;
    font-weight: 300;
    margin-bottom: ${({ theme }) => theme.edgeSize.medium};
  }
`
const StyledPreview = styled.img`
  height: ${({ theme }) => theme.size.xlarge};
  border-radius: ${({ theme }) => theme.edgeSize.xsmall};
`
const StyledError = styled.div.attrs(() => ({
  role: 'alert',
  'aria-relevant': 'all',
}))`
  font-size: 18px;
  line-height: 1.5;
  margin-top: 0;
  color: ${({ theme }) => theme.color.error};
`
const LABELS = {
  image: 'Photo',
  admissionNo: 'Admission No.',
  name: 'Name',
  fatherName: "Father's Name",
  mobileNo: 'Mobile Number',
  gender: 'Gender',
  identificationDoc: 'Identification Submitted',
  identificationDocNo: 'Idenfication Id',
  address: 'Address',
  territory: 'Territory',
  router: 'Router',
  lockerNo: 'Locker Number',
  reservedSeat: 'Reserved Seat',
  dateOfJoining: 'Date of joining',
  validUpto: 'Valid Upto',
  timeSlotIn: 'Time Slot In',
  timeSlotOut: 'Time Slot Out',
  feePaid: 'Fee Paid',
}
interface Props {
  onSubmit: (data: Student, base64Image: string) => void
  defaultValues?: Student | {}
}
const StudentForm = ({ onSubmit, defaultValues = {} }: Props) => {
  const [showWebcam, setWebcamVisible] = useState(true)
  const [base64Image, setImage] = useState('')
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Student>({ mode: 'onTouched', defaultValues })

  const imageFile = watch('image')
  const imagePreviewUrl = useImagePreviewUrl({
    blob: imageFile && typeof imageFile[0] !== 'string' && imageFile[0],
  })

  const handleCapture = (base64Image: string) => setImage(base64Image)

  return (
    <StyledForm
      onSubmit={handleSubmit((data) =>
        onSubmit(data, base64Image || imagePreviewUrl),
      )}
    >
      <Box $direction="row" $justifyContent="space-between">
        <label htmlFor="image">{LABELS.image}*</label>
        {errors.image && <StyledError>{LABELS.image} is required</StyledError>}
      </Box>
      <Box $margin={{ bottom: 'large' }} $direction="row">
        <Button
          color="gray"
          backgroundColor="#fff"
          shadowColor="gray"
          onClick={() => setWebcamVisible((p) => !p)}
        >
          {showWebcam ? 'Use file picker' : 'Use webcam'}
        </Button>
      </Box>
      <hr />
      <Box
        $direction="row"
        $height="xxlarge"
        $justifyContent="center"
        $margin={{ bottom: 'medium' }}
      >
        {showWebcam ? (
          <Webcam onCapture={handleCapture} />
        ) : (
          <>
            <input
              type="file"
              accept="image/*"
              id="image"
              {...register('image', { required: true })}
            />
            <StyledPreview
              src={imagePreviewUrl || 'https://i.ibb.co/SyLM04b/skeleton.png'}
              alt="preview"
            />
          </>
        )}
      </Box>
      <Box $direction="row" $justifyContent="space-between">
        <label htmlFor="admissionNo">{LABELS.admissionNo}*</label>
        {errors.admissionNo && (
          <StyledError role="alert" aria-relevant="all">
            {LABELS.admissionNo} is required
          </StyledError>
        )}
      </Box>
      <input
        type="text"
        id="admissionNo"
        aria-required
        {...register('admissionNo', { required: 'true' })}
      />
      <Box $direction="row" $justifyContent="space-between">
        <label htmlFor="name">{LABELS.name}*</label>
        {errors.name && (
          <StyledError role="alert" aria-relevant="all">
            {LABELS.name} is required
          </StyledError>
        )}
      </Box>
      <input
        type="text"
        id="name"
        aria-required
        {...register('name', { required: true })}
      />
      <Box>
        <label htmlFor="fatherName">{LABELS.fatherName}</label>
      </Box>
      <input type="text" id="fatherName" {...register('fatherName')} />
      <Box $direction="row" $justifyContent="space-between">
        <label htmlFor="mobileNo">{LABELS.mobileNo}*</label>
        {errors.mobileNo && (
          <StyledError role="alert" aria-relevant="all">
            {LABELS.mobileNo} is invalid
          </StyledError>
        )}
      </Box>
      <input
        type="number"
        id="mobileNo"
        {...register('mobileNo', { required: true, minLength: 10 })}
      />
      <Box $direction="row" $justifyContent="space-between">
        <label htmlFor="">{LABELS.gender}*</label>
        {errors.gender && (
          <StyledError role="alert" aria-relevant="all">
            {LABELS.gender} is required
          </StyledError>
        )}
      </Box>
      <Box $direction="row" $textAlign="right">
        <label htmlFor="gender_male">Male</label>
        <input
          type="radio"
          id="gender_male"
          {...register('gender', { required: true })}
          value="Male"
        />
      </Box>
      <Box $direction="row" $textAlign="right">
        <label htmlFor="gender_female">Female</label>
        <input
          type="radio"
          id="gender_female"
          {...register('gender', { required: true })}
          value="Female"
        />
      </Box>
      <Box $direction="row" $textAlign="right">
        <label htmlFor="gender_other">Other</label>
        <input
          type="radio"
          id="gender_other"
          {...register('gender', { required: true })}
          value="Other"
        />
      </Box>
      <hr />
      <Box $direction="row" $justifyContent="space-between">
        <label htmlFor="">{LABELS.identificationDoc}*</label>
        {errors.identificationDoc && (
          <StyledError role="alert" aria-relevant="all">
            {LABELS.identificationDoc} is required
          </StyledError>
        )}
      </Box>
      <Box $direction="row" $textAlign="right">
        <label htmlFor="id_doc_aadhar">Aadhar Card</label>
        <input
          type="radio"
          id="id_doc_aadhar"
          {...register('identificationDoc', { required: true })}
          value="Aadhar"
        />
      </Box>
      <Box $direction="row" $textAlign="right">
        <label htmlFor="id_doc_dl">Driving License</label>
        <input
          type="radio"
          id="id_doc_dl"
          {...register('identificationDoc', { required: true })}
          value="Driving License"
        />
      </Box>
      <Box $direction="row" $textAlign="right">
        <label htmlFor="id_doc_passport">Passport</label>
        <input
          type="radio"
          id="id_doc_passport"
          {...register('identificationDoc', { required: true })}
          value="Passport"
        />
      </Box>
      <Box $direction="row" $textAlign="right">
        <label htmlFor="id_doc_other">Other</label>
        <input
          type="radio"
          id="id_doc_other"
          {...register('identificationDoc', { required: true })}
          value="Other"
        />
      </Box>
      <Box $direction="row" $justifyContent="space-between">
        <label htmlFor="identificationDocNo">
          {LABELS.identificationDocNo}*
        </label>
        {errors.identificationDocNo && (
          <StyledError role="alert" aria-relevant="all">
            {LABELS.identificationDocNo} is required
          </StyledError>
        )}
      </Box>
      <input
        type="text"
        id="identificationDocNo"
        {...register('identificationDocNo', { required: true })}
      />
      <label htmlFor="address">{LABELS.address}</label>
      <input type="text" id="address" {...register('address')} />
      <label htmlFor="">{LABELS.territory}</label>
      <Box $direction="row" $textAlign="right">
        <label htmlFor="territory_urban">Urban</label>
        <input
          type="radio"
          id="territory_urban"
          {...register('territory')}
          value="Urban"
        />
      </Box>
      <Box $direction="row" $textAlign="right">
        <label htmlFor="territory_rural">Rural</label>
        <input
          type="radio"
          id="territory_rural"
          {...register('territory')}
          value="Rural"
        />
      </Box>
      <label htmlFor="router">{LABELS.router}</label>
      <input type="text" id="router" {...register('router')} />
      <label htmlFor="lockerNo">{LABELS.lockerNo}</label>
      <input type="text" id="lockerNo" {...register('lockerNo')} />
      <label htmlFor="reservedSeat">{LABELS.reservedSeat}</label>
      <input type="text" id="reservedSeat" {...register('reservedSeat')} />
      <Box $direction="row" $justifyContent="space-between">
        <label htmlFor="dateOfJoining">{LABELS.dateOfJoining}*</label>
        {errors.dateOfJoining && (
          <StyledError role="alert" aria-relevant="all">
            {LABELS.dateOfJoining} is required
          </StyledError>
        )}
      </Box>
      <input
        type="date"
        id="dateOfJoining"
        {...register('dateOfJoining', { required: true })}
      />
      <Box $direction="row" $justifyContent="space-between">
        <label htmlFor="validUpto">{LABELS.validUpto}*</label>
        {errors.validUpto && (
          <StyledError role="alert" aria-relevant="all">
            {LABELS.validUpto} is required
          </StyledError>
        )}
      </Box>
      <input
        type="date"
        id="validUpto"
        {...register('validUpto', { required: true })}
      />
      <Box $direction="row" $justifyContent="space-between">
        <label htmlFor="timeSlotIn">{LABELS.timeSlotIn}*</label>
        {errors.timeSlotIn && (
          <StyledError role="alert" aria-relevant="all">
            {LABELS.timeSlotIn} is required
          </StyledError>
        )}
      </Box>
      <input
        type="time"
        id="timeSlotIn"
        {...register('timeSlotIn', { required: true })}
      />
      <Box $direction="row" $justifyContent="space-between">
        <label htmlFor="timeSlotOut">{LABELS.timeSlotOut}*</label>
        {errors.timeSlotOut && (
          <StyledError role="alert" aria-relevant="all">
            {LABELS.timeSlotOut} is required
          </StyledError>
        )}
      </Box>
      <input
        type="time"
        id="timeSlotOut"
        {...register('timeSlotOut', { required: true })}
      />
      <Box $direction="row" $justifyContent="space-between">
        <label htmlFor="">{LABELS.feePaid}*</label>
        {errors.feePaid && (
          <StyledError role="alert" aria-relevant="all">
            {LABELS.feePaid} is required
          </StyledError>
        )}
      </Box>
      <Box $direction="row" $textAlign="right">
        <label htmlFor="fee_paid_yes">Yes</label>
        <input
          type="radio"
          id="fee_paid_yes"
          {...register('feePaid', { required: true })}
          value="true"
        />
      </Box>
      <Box $direction="row" $textAlign="right">
        <label htmlFor="fee_paid_no">No</label>
        <input
          type="radio"
          id="fee_paid_no"
          {...register('feePaid', { required: true })}
          value="false"
        />
      </Box>
      <Box
        $direction="row"
        $justifyContent="center"
        $padding={{ bottom: 'large' }}
      >
        <Button type="submit" size="large">
          Submit
        </Button>
      </Box>
    </StyledForm>
  )
}

export default StudentForm
