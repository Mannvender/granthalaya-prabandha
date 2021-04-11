export interface Student {
  id: string | number
  faceId?: string
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
