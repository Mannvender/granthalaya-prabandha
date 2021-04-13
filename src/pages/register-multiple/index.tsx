import React from 'react'
import { useLoading } from '@agney/react-loading'
import { toast } from 'react-toastify'
import { useIndexedDB } from 'react-indexed-db'
import { useHistory } from 'react-router-dom'

import Heading from 'components/Heading'
import Box from 'components/Box'
import LoaderContainer from 'components/LoadingContainer'
import P from 'components/Paragraph'
import { jsonToCSV, CSVReader } from 'react-papaparse'
import Button from 'components/Button'

import downloadFile from 'utils/download-file'
import { parseStudents } from 'utils/student'
import { LABELS } from 'components/StudentForm'

const fields = Object.keys(LABELS)
// removing "image" field
fields.shift()
const csv = jsonToCSV({ fields })

const RegisterMultiple = () => {
  const history = useHistory()
  const { add } = useIndexedDB('students')
  const { containerProps, indicatorEl } = useLoading({
    loading: false,
  })
  const handleDownload = () => {
    downloadFile(csv, 'template.csv')
  }
  const handleOnDrop = (data: any) => {
    if (!data || !data.length || data.length < 2) return
    data.shift()
    const studentsData = data
      .map((d: { data: string[] }) => d.data)
      .filter((d: string[]) => d.length > 1)
    try {
      const students = parseStudents(studentsData)
      const promises = students.map((student) => add({ ...student }))
      Promise.allSettled(promises).then((results: any[]) => {
        results.forEach((result) => {
          if (result.status === 'rejected') {
            toast.error(
              'Could not register one of the student. ' +
                result?.reason?.target?.error?.message,
            )
          }
        })
        history.push('/list')
      })
    } catch (error) {
      toast.error(error?.message || 'Something went wrong!')
    }
  }

  return (
    <Box $padding="medium">
      {indicatorEl && (
        <LoaderContainer {...containerProps}>{indicatorEl}</LoaderContainer>
      )}
      <Heading>Register multiple</Heading>
      <P>
        Please don&apos;t change column <em>names</em> and <em>order</em> in
        provided template
      </P>
      <Box $margin={{ bottom: 'large' }} $direction="row">
        <Button
          onClick={handleDownload}
          hasShadow={false}
          color="accent-3"
          backgroundColor="#fff"
        >
          Download template
        </Button>
      </Box>
      <CSVReader
        onFileLoad={handleOnDrop}
        onError={console.error}
        addRemoveButton
      >
        <span>Drop CSV file here or click to upload.</span>
      </CSVReader>
    </Box>
  )
}

export default RegisterMultiple
