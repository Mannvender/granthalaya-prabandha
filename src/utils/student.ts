import { LABELS } from 'components/StudentForm'

export const parseStudents = (list: any[]): any[] => {
  const keys = Object.keys(LABELS)
  // don't want "images"
  keys.shift()
  const students = list.map((array, rowId) => {
    const rowNo = rowId + 2
    const student: any = {}
    keys.forEach((key, index) => {
      let value = array[index]
      if (
        !value &&
        (key === 'admissionNo' ||
          key === 'name' ||
          key === 'mobileNo' ||
          key === 'identificationDocNo' ||
          key === 'dateOfJoining' ||
          key === 'validUpto')
      ) {
        throw Error(key + ' is a required field. Check row: ' + rowNo)
      }
      if (key === 'mobileNo' && value.length < 10) {
        throw Error('MobileNo should be atleast 10 digits. Check row: ' + rowNo)
      }
      if (
        key === 'gender' &&
        value &&
        value !== 'Male' &&
        value !== 'Female' &&
        value !== 'Other'
      ) {
        throw Error(
          'Gender should be either Male, Female or Other. Check row: ' + rowNo,
        )
      }
      if (
        key === 'identificationDoc' &&
        value &&
        value !== 'Aadhar' &&
        value !== 'Driving License' &&
        value !== 'Passport' &&
        value !== 'Other'
      ) {
        throw Error(
          'identificationDoc should be either Aadhar, Driving License, Passport or Other. Check row: ' +
            rowNo,
        )
      }
      if (
        key === 'territory' &&
        value &&
        value !== 'Rural' &&
        value !== 'Urban'
      ) {
        throw Error(
          'territory should be either Rural or Urban. Check row: ' + rowNo,
        )
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
