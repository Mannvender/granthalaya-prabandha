import { LABELS } from 'components/StudentForm'

export const parseStudents = (list: any[]): any[] => {
  const keys = Object.keys(LABELS)
  keys.shift()
  const students = list.map((array) => {
    // don't want "images"
    const student: any = {}
    keys.forEach((key, index) => {
      let value = array[index]
      if (
        !value &&
        (key === 'admissionNo' ||
          key === 'name' ||
          key === 'mobileNo' ||
          key === 'gender' ||
          key === 'identificationDoc' ||
          key === 'identificationDocNo' ||
          key === 'dateOfJoining' ||
          key === 'validUpto' ||
          key === 'timeSlotIn' ||
          key === 'timeSlotOut' ||
          key === 'feePaid')
      ) {
        throw Error('One of the required field is missing')
      }
      if (
        key === 'gender' &&
        value !== 'Male' &&
        value !== 'Female' &&
        value !== 'Other'
      ) {
        throw Error('Gender should be either Male, Female or Other')
      }
      if (
        key === 'identificationDoc' &&
        value !== 'Aadhar' &&
        value !== 'Driving License' &&
        value !== 'Passport' &&
        value !== 'Other'
      ) {
        throw Error(
          'identificationDoc should be either Aadhar, Driving License, Passport or Other',
        )
      }
      if (
        key === 'territory' &&
        value &&
        value !== 'Rural' &&
        value !== 'Urban'
      ) {
        throw Error('territory should be either Rural or Urban')
      }

      if (key === 'mobile') {
        value = parseInt(value)
      } else if (key === 'dateOfJoining' || key === 'validUpto') {
        value = new Date(value)
      } else if (key === 'feePaid') {
        value = value === 'true'
      } else {
        student[key] = array[index]
      }
    })
    return student
  })
  return students
}
