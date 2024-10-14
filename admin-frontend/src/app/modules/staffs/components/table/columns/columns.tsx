import { Column } from 'react-table';
import { CopyTextCell } from '../../../../../../_metronic/partials/table/cell/CopyTextCell';
import { DateFromTimestampCell } from '../../../../../../_metronic/partials/table/cell/DateFromTimestampCell';
import { TableHeader } from '../../../../../../_metronic/partials/table/header/TableHeader';
import { Staff } from "../../../core/models";
import { StaffActionsCell } from "../cell/StaffActionsCell";
import { SelectionHeader } from "../../../../../../_metronic/partials/table/header/SelectionHeader";
import { SelectionCell } from "../../../../../../_metronic/partials/table/cell/SelectionCell";
import { Link } from "react-router-dom";
import React from "react";

const staffsColumns: ReadonlyArray<Column<Staff>> = [
    {
        Header: (props) => <SelectionHeader tableProps={props} />,
        id: 'selection',
        Cell: ({ ...props }) => {
            const staff = props.data[props.row.index] as Staff; // Ép kiểu Staff cho dữ liệu
            return <SelectionCell id={staff.id} />;
        },
    },
    {
        Header: (props) => <TableHeader tableProps={props} title='Name' />,
        id: 'id',
        Cell: ({ ...props }) => {
            const staff = props.data[props.row.index] as Staff; // Ép kiểu Staff cho dữ liệu
            return (
                <>
                    <div className='d-flex align-items-center'>
                        {/* begin:: Avatar */}
                        <div className='symbol symbol-circle symbol-50px overflow-hidden me-3'>
                            <Link className='d-flex flex-column' to={`/staffs/edit/${staff.id}`}>
                                <div className='symbol-label'>
                                    <img src={staff.avatar_url} alt={staff.fullname} className='w-100' />
                                </div>
                            </Link>

                        </div>
                        <div className='d-flex flex-column'>
                            <div className='d-flex flex-column'>
                                <CopyTextCell className='text-dark' value={`${staff.email}`} />
                            </div>
                            <CopyTextCell className='text-dark' value={`${staff.fullname}`} />
                        </div>
                    </div>
                </>
            )
        },
    },
    // {
    //     Header: (props) => <TableHeader tableProps={props} title='Full Name'/>,
    //     id: 'fullname',
    //     Cell: ({...props}) => {
    //         const staff = props.data[props.row.index] as Staff;
    //         return <CopyTextCell className='text-dark' value={`${staff.fullname}`}/>;
    //     },
    // },
    // {
    //     Header: (props) => <TableHeader tableProps={props} title='Email'/>,
    //     id: 'email',
    //     Cell: ({...props}) => {
    //         const staff = props.data[props.row.index] as Staff;
    //         return <CopyTextCell className='text-dark' value={`${staff.email}`}/>;
    //     },
    // },
    {
        Header: (props) => <TableHeader tableProps={props} title='Phone' />,
        id: 'phone_number',
        Cell: ({ ...props }) => {
            const staff = props.data[props.row.index] as Staff;
            return <CopyTextCell className='text-dark' value={`${staff.phone_number}`} />;
        },
    },
    {
        Header: (props) => <TableHeader tableProps={props} title='Address' />,
        id: 'address',
        Cell: ({ ...props }) => {
            const staff = props.data[props.row.index] as Staff;
            return <CopyTextCell className='text-dark' value={`${staff.address}`} />;
        },
    },
    {
        Header: (props) => <TableHeader tableProps={props} title='Role' />,
        id: 'role_id',
        Cell: ({ ...props }) => {
            const staff = props.data[props.row.index] as Staff;
            return (
                <div className='text-primary font-weight-bold mt-1'>
                    {staff.role?.name ?? 'N/A'}
                </div>
            );
        },
    },
    {
        Header: (props) => <TableHeader tableProps={props} title='Showroom' />,
        id: 'showroom_id',
        Cell: ({ ...props }) => {
            const staff = props.data[props.row.index] as Staff;
            return (
                <div className='text-success font-weight-bold mt-1'>
                    {staff.showroom?.name ?? 'N/A'}
                </div>
            );
        },
    },
    {
        Header: (props) => <TableHeader tableProps={props} title='Created At' />,
        id: 'created_at',
        Cell: ({ ...props }) => {
            const staff = props.data[props.row.index] as Staff;
            return <DateFromTimestampCell value={staff.created_at} />;
        },
    },
    {
        Header: (props) => <TableHeader tableProps={props} title='Actions' />,
        id: 'actions',
        Cell: ({ ...props }) => {
            const staff = props.data[props.row.index] as Staff;
            return <StaffActionsCell id={staff.id} />;
        },
    },
];

export { staffsColumns };
