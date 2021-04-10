import React, { useState } from 'react'
import { useIndexedDB } from 'react-indexed-db'
import { useEffectOnce } from 'react-use'
import { useTable, Column, CellProps } from 'react-table'
import { RiEditBoxFill, RiDeleteBin7Fill } from 'react-icons/ri'

import Box from 'components/Box'
import Heading from 'components/Heading'
import { Student } from 'types/student'
import styled from 'styled-components'

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

const ImageCell = ({ value: base64URL }: CellProps<any>) => (
  <StyledImage src={base64URL} />
)

const List = () => {
  const { getAll } = useIndexedDB('students')
  const [students, setStudents] = useState<Student[]>([])
  useEffectOnce(() => {
    getAll().then((studentsFromDB) => {
      setStudents(studentsFromDB)
    })
  })

  const handleEdit = (admissionNo: string) => {
    // eslint-disable-next-line no-console
    console.log(admissionNo)
  }
  const handleDelete = (admissionNo: string) => {
    // eslint-disable-next-line no-console
    console.log(admissionNo)
  }
  const ActionsCell = ({ value }: CellProps<any>) => (
    <Box $direction="row" $justifyContent="space-around">
      <StyledEditIcon onClick={() => handleEdit(value)} />
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
    [],
  )
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data: students })

  return (
    <Box $padding="medium">
      <Heading>List</Heading>
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
      </StyledTable>
    </Box>
  )
}

export default List
