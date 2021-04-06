import React from 'react'
import { useForm } from 'react-hook-form'
import styled from 'styled-components'

import Heading from 'components/Heading'
import Box from 'components/Box'
import Button from 'components/Button'
import useImagePreviewUrl from 'hooks/useImagePreviewUrl'

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
type FormData = {
  image: any
  admissionNo: string
  name: string
  fatherName: string
  mobileNo: number
  gender: 'Male' | 'Female' | 'Other'
  identificationDoc: 'Aadhar' | 'Driving Licence' | 'Passport' | 'Other'
  identificationDocNo: string
  address: string
  territory: 'Urban' | 'Rural'
  router: string
  lockerNo?: string
  reservedSeat?: string
  dateOfJoining: Date
  validUpto: Date
  timeSlotIn: Date
  timeSlotOut: Date
  feePaid: boolean
}

const StyledForm = styled.form`
  font-weight: 600;
  margin: ${({ theme }) => theme.edgeSize.medium};
  label,
  input {
    width: 100%;
    margin-bottom: ${({ theme }) => theme.edgeSize.medium};
    line-height: 1.5;
    border-radius: ${({ theme }) => theme.edgeSize.xsmall};
  }
  label {
    font-size: 18px;
  }
  input {
    font-size: 24px;
    font-weight: 300;
  }
`
const StyledPreview = styled.img`
  height: ${({ theme }) => theme.size.xlarge};
`

const Register = () => {
  const {
    register,
    // setValue,
    handleSubmit,
    watch,
    // formState: {
    // errors
    // },
  } = useForm<FormData>()
  const imageFile = watch('image')
  const imagePreviewUrl = useImagePreviewUrl({
    blob: imageFile && imageFile[0],
  })

  // eslint-disable-next-line no-console
  const onSubmit = handleSubmit((data) => console.log(data))

  return (
    <Box>
      <Heading>Register</Heading>
      <StyledForm onSubmit={onSubmit}>
        <label htmlFor="image">{LABELS.image}</label>
        <Box direction="row" height="xlarge" padding={{ bottom: 'medium' }}>
          <input type="file" id="image" {...register('image')} />
          <StyledPreview src={imagePreviewUrl} alt="image preview" />
        </Box>
        <label htmlFor="admissionNo">{LABELS.admissionNo}</label>
        <input type="text" id="admissionNo" {...register('admissionNo')} />
        <label htmlFor="name">{LABELS.name}</label>
        <input type="text" id="name" {...register('name')} />
        <label htmlFor="fatherName">{LABELS.fatherName}</label>
        <input type="text" id="fatherName" {...register('fatherName')} />
        <label htmlFor="mobileNo">{LABELS.mobileNo}</label>
        <input type="number" id="mobileNo" {...register('mobileNo')} />
        <label htmlFor="">{LABELS.gender}</label>
        <Box direction="row" textAlign="center">
          <label htmlFor="gender_male">Male</label>
          <input
            type="radio"
            id="gender_male"
            {...register('gender')}
            value="Male"
          />
        </Box>
        <Box direction="row" textAlign="center">
          <label htmlFor="gender_female">Female</label>
          <input
            type="radio"
            id="gender_female"
            {...register('gender')}
            value="Female"
          />
        </Box>
        <Box direction="row" textAlign="center">
          <label htmlFor="gender_other">Other</label>
          <input
            type="radio"
            id="gender_other"
            {...register('gender')}
            value="Other"
          />
        </Box>
        <hr />
        <label htmlFor="">{LABELS.identificationDoc}</label>
        <Box direction="row" textAlign="center">
          <label htmlFor="id_doc_aadhar">Aadhar Card</label>
          <input
            type="radio"
            id="id_doc_aadhar"
            {...register('identificationDoc')}
            value="Aadhar"
          />
        </Box>
        <Box direction="row" textAlign="center">
          <label htmlFor="id_doc_dl">Driving License</label>
          <input
            type="radio"
            id="id_doc_dl"
            {...register('identificationDoc')}
            value="Driving License"
          />
        </Box>
        <Box direction="row" textAlign="center">
          <label htmlFor="id_doc_passport">Passport</label>
          <input
            type="radio"
            id="id_doc_passport"
            {...register('identificationDoc')}
            value="Passport"
          />
        </Box>
        <Box direction="row" textAlign="center">
          <label htmlFor="id_doc_other">Other</label>
          <input
            type="radio"
            id="id_doc_other"
            {...register('identificationDoc')}
            value="Other"
          />
        </Box>
        <label htmlFor="identificationDocNo">
          {LABELS.identificationDocNo}
        </label>
        <input
          type="text"
          id="identificationDocNo"
          {...register('identificationDocNo')}
        />
        <label htmlFor="address">{LABELS.address}</label>
        <input type="text" id="address" {...register('address')} />
        <label htmlFor="">{LABELS.territory}</label>
        <Box direction="row" textAlign="center">
          <label htmlFor="territory_urban">Urban</label>
          <input
            type="radio"
            id="territory_urban"
            {...register('territory')}
            value="Urban"
          />
        </Box>
        <Box direction="row" textAlign="center">
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
        <label htmlFor="validUpto">{LABELS.validUpto}</label>
        <input
          type="datetime-local"
          id="validUpto"
          {...register('validUpto')}
        />
        <label htmlFor="timeSlotIn">{LABELS.timeSlotIn}</label>
        <input
          type="datetime-local"
          id="timeSlotIn"
          {...register('timeSlotIn')}
        />
        <label htmlFor="timeSlotOut">{LABELS.timeSlotOut}</label>
        <input
          type="datetime-local"
          id="timeSlotOut"
          {...register('timeSlotOut')}
        />
        <label htmlFor="">{LABELS.feePaid}</label>
        <Box direction="row" textAlign="center">
          <label htmlFor="fee_paid_yes">Yes</label>
          <input
            type="radio"
            id="fee_paid_yes"
            {...register('feePaid')}
            value="true"
          />
        </Box>
        <Box direction="row" textAlign="center">
          <label htmlFor="fee_paid_no">No</label>
          <input
            type="radio"
            id="fee_paid_no"
            {...register('feePaid')}
            value="false"
          />
        </Box>
        <Box
          direction="row"
          justifyContent="center"
          padding={{ bottom: 'large' }}
        >
          <Button type="submit" size="large">
            Submit
          </Button>
        </Box>
      </StyledForm>
    </Box>
  )
}

export default Register
