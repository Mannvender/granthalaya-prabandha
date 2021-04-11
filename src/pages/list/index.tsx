import React, { useState, useEffect, useMemo } from 'react'
import { useIndexedDB } from 'react-indexed-db'
import { useLoading } from '@agney/react-loading'
import { useEffectOnce } from 'react-use'
import { useTable, Column, CellProps } from 'react-table'
import { RiEditBoxFill, RiDeleteBin7Fill, RiAddBoxFill } from 'react-icons/ri'
import { useHistory } from 'react-router-dom'
import { Modal } from 'react-responsive-modal'
import 'react-responsive-modal/styles.css'

import Box from 'components/Box'
import Heading from 'components/Heading'
import { Student } from 'types/student'
import styled from 'styled-components'
import Button from 'components/Button'
import useDeleteFaces from 'hooks/useDeleteFaces'
import LoaderContainer from 'components/LoadingContainer'

const StyledImage = styled.img`
  height: ${({ theme }) => theme.size.large};
  border-radius: 4px;
`
const StyledTable = styled.table`
  border: solid 1px ${({ theme }) => theme.color['accent-1']};
  border-radius: 4px;
`
const StyledEditIcon = styled(RiEditBoxFill)`
  height: 24px;
  width: 24px;
  color: ${({ theme }) => theme.color['accent-3']};
  cursor: pointer;
`
const StyledDeleteIcon = styled(RiDeleteBin7Fill)`
  height: 24px;
  width: 24px;
  color: ${({ theme }) => theme.color['accent-3']};
  cursor: pointer;
`
const StyledAddIcon = styled(RiAddBoxFill)`
  height: 24px;
  width: 24px;
`

const ImageCell = ({ value: base64URL }: CellProps<any>) => (
  <StyledImage src={base64URL} />
)

const List = () => {
  const history = useHistory()
  const { getAll, deleteRecord } = useIndexedDB('students')
  const [students, setStudents] = useState<Student[]>([])
  const [admissionNo, setAdmissionNo] = useState('')
  const [deleteConfirm, setDeleteConfirm] = useState(false)

  const selectedStudent = useMemo(() => {
    return students.find((student) => student.admissionNo === admissionNo)
  }, [admissionNo, students])
  const { isFetching, isSuccess, error } = useDeleteFaces({
    faceIds: [(deleteConfirm && selectedStudent?.faceId) || ''],
  })
  // eslint-disable-next-line no-console
  console.log(
    isFetching,
    isSuccess,
    error,
    '-----isFetching, isSuccess, error----',
  )
  const fetchStudents = () => {
    getAll().then((studentsFromDB) => {
      setStudents(studentsFromDB)
    })
  }
  useEffect(() => {
    if (isSuccess) {
      const databaseId = students.find(
        (student) => student.admissionNo === admissionNo,
      )?.id
      if (databaseId) {
        deleteRecord(databaseId).catch(console.error)
        setAdmissionNo('')
        setDeleteConfirm(false)
        fetchStudents()
      }
    }
    // eslint-disable-next-line
  }, [isSuccess])

  useEffectOnce(fetchStudents)

  const { containerProps, indicatorEl } = useLoading({
    loading: isFetching && !isSuccess,
  })

  const handleEdit = (admissionNo: string) => {
    // eslint-disable-next-line no-console
    console.log(admissionNo)
    history.push('/edit/' + admissionNo)
  }
  const handleDelete = (admissionNo: string) => {
    // eslint-disable-next-line no-console
    console.log(admissionNo, 'this admission no need to be deleted-------')
    setAdmissionNo(admissionNo)
  }
  const ActionsCell = ({ value }: CellProps<any>) => (
    <Box $direction="row" $justifyContent="space-around">
      <StyledEditIcon
        role="link"
        data-href="/edit"
        onClick={() => handleEdit(value)}
      />
      <StyledDeleteIcon onClick={() => handleDelete(value)} />
    </Box>
  )
  const columns: Column<Student>[] = React.useMemo(
    () => [
      {
        Header: 'Image',
        accessor: 'image', // accessor is the "key" in the data
        Cell: ImageCell,
      },
      {
        Header: 'Name',
        accessor: 'name',
      },
      {
        Header: 'Mobile No',
        accessor: 'mobileNo',
      },
      {
        Header: 'Router',
        accessor: 'router',
      },
      {
        Header: 'Locker',
        accessor: 'lockerNo',
      },
      {
        Header: 'Seat',
        accessor: 'reservedSeat',
      },
      {
        Header: 'Fee Paid',
        accessor: 'feePaid',
      },
      {
        Header: 'Action',
        accessor: 'admissionNo',
        Cell: ActionsCell,
      },
    ],
    // eslint-disable-next-line
    [],
  )
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data: students })

  const onCloseModal = () => setAdmissionNo('')
  const handleAddButtonClick = () => history.push('/register')

  return (
    <Box $padding="medium">
      {indicatorEl && (
        <LoaderContainer {...containerProps}>{indicatorEl}</LoaderContainer>
      )}
      <Box $direction="row" $justifyContent="space-between">
        <Heading>List</Heading>
        <div>
          <Button
            hasShadow={false}
            backgroundColor="#fff"
            color="accent-3"
            style={{ display: 'block' }}
            onClick={handleAddButtonClick}
            role="link"
            data-href="/register"
          >
            <Box $direction="row">
              <StyledAddIcon />
              <span>Add student</span>
            </Box>
          </Button>
        </div>
      </Box>
      <StyledTable {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            // eslint-disable-next-line react/jsx-key
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                // eslint-disable-next-line react/jsx-key
                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row)
            return (
              // eslint-disable-next-line react/jsx-key
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  // eslint-disable-next-line react/jsx-key
                  return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                })}
              </tr>
            )
          })}
        </tbody>
        <Modal
          open={Boolean(admissionNo)}
          onClose={onCloseModal}
          center
          aria-labelledby="modal-title"
          styles={{
            root: { color: 'gray' },
            modal: { borderRadius: '4px' },
          }}
          showCloseIcon={false}
        >
          <Heading id="modal-title">Are you sure ?</Heading>
          <Box $direction="row" $justifyContent="space-around">
            <Button hasShadow={false} onClick={() => setDeleteConfirm(true)}>
              Yes
            </Button>
            <Button hasShadow={false} onClick={onCloseModal}>
              No
            </Button>
          </Box>
        </Modal>
      </StyledTable>
    </Box>
  )
}

export default List
