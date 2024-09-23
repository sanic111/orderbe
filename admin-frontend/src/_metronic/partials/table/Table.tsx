import {useMemo} from 'react'
import {useTable, ColumnInstance, Row, Column} from 'react-table'
import {useQueryResponseData, useQueryResponseLoading} from "../../layout/core/QueryResponseProvider"
import { KTCardBody } from '../../helpers';

const Table = ({columns}: { columns: ReadonlyArray<Column<Staff>> }) => {
    const staffs = useQueryResponseData<Staff[]>(); // Fetch data specific to `Staff` type
    const isLoading = useQueryResponseLoading()
    const data = useMemo(() => staffs, [staffs])

    const {getTableProps, getTableBodyProps, headers, rows, prepareRow} = useTable({
        columns,
        data,
    })

    return (
        <KTCardBody className='py-4'>
            <div className='table-responsive'>
                <table
                    id='kt_table_staffs'
                    className='table align-middle table-row-dashed fs-6 gy-5 dataTable no-footer'
                    {...getTableProps()}
                >
                    <thead>
                    <tr className='text-start text-muted fw-bolder fs-7 text-uppercase gs-0'>
                        {headers.map((column: ColumnInstance<Staff>) => (
                            <th key={column.id}>
                                {column.render('Header')}
                            </th>
                        ))}
                    </tr>
                    </thead>
                    <tbody className='text-gray-600 fw-bold' {...getTableBodyProps()}>
                    {rows.length > 0 ? (
                        rows.map((row: Row<Staff>, i) => {
                            prepareRow(row)
                            return (
                                <tr key={`row-${i}-${row.id}`} {...row.getRowProps()}>
                                    {row.cells.map(cell => (
                                        <td key={cell.column.id} {...cell.getCellProps()}>
                                            {cell.render('Cell')}
                                        </td>
                                    ))}
                                </tr>
                            )
                        })
                    ) : (
                        <tr>
                            <td colSpan={7}>
                                <div className='d-flex text-center w-100 align-content-center justify-content-center'>
                                    No matching records found
                                </div>
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
            <UsersListPagination />
            {isLoading && <UsersListLoading />}
        </KTCardBody>
    )
}

export {Table}
