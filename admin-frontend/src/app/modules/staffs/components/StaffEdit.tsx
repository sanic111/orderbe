import { ShowroomModel, Staff } from "../core/models";
import React, { FC, useEffect, useState } from "react";
import { Link, Outlet, useNavigate, useParams } from 'react-router-dom'
import { getRoles, getShowroom, getStaff, updateStaff, updateStaffAvatar } from "../core/requests";
import { QueryResponse } from "../../../utils/model/models";
import { toast } from "react-toastify";
import { KTIcon } from "../../../../_metronic/helpers";
import { RoleModel } from "../../auth";

type Props = {};
export const StaffEdit: FC<Props> = ({ ...props }) => {
    const { id } = useParams(); // Lấy ID từ URL
    const navigate = useNavigate();
    const [staff, setStaff] = useState<Staff | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [roles, setRoles] = useState<RoleModel[]>([]);
    const [showroom, setShowroom] = useState<ShowroomModel[]>([]);
    const getStaffData = () => {
        if (id) {
            getStaff(id)
                .then((response: QueryResponse) => {
                    const staffData = response.data;
                    if (staffData && !Array.isArray(staffData)) {
                        setStaff(staffData); // Đặt dữ liệu nhân viên vào state
                    } else {
                        setError(true);
                        toast.error('Không tìm thấy dữ liệu nhân viên hoặc dữ liệu không hợp lệ', {
                            position: "top-right",
                            autoClose: 3000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        });
                    }
                })
                .catch(() => {
                    setError(true);
                    toast.error('Có lỗi xảy ra khi lấy dữ liệu', {
                        position: "top-right",  // Sử dụng chuỗi trực tiếp
                        autoClose: 3000, // Đóng thông báo sau 3 giây
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                })
                .finally(() => setLoading(false));
        }

    }
    useEffect(() => {
        if (id) {
            getStaffData();
        }
        getRoles()
            .then((response: QueryResponse) => {
                setRoles(response.data || []);
            })
            .catch(() => {
                toast.error('Có lỗi xảy ra khi lấy danh sách vai trò', {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            });
        getShowroom()
            .then((response: QueryResponse) => {
                setShowroom(response.data || []);
            })
            .catch(() => {
                toast.error('Có lỗi xảy ra khi lấy danh sách showroom', {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            });
    }, [id, navigate]);
    const handleRefreshClick = () => {
        if (id) {
            getStaffData();
        }
    }
    const handleUpdate = () => {
        if (staff && id) {
            updateStaff(id, staff)
                .then((response) => {
                    const staffData = response.data;
                    if (staffData && !Array.isArray(staffData)) {
                        setStaff(staffData);
                        setStaff({ ...staff, password: "" })
                        toast.success('Cập nhật thông tin thành công', {
                            position: "top-right",
                            autoClose: 3000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        });
                    } else {
                        setError(true);
                        toast.error('Không tìm thấy dữ liệu nhân viên hoặc dữ liệu không hợp lệ', {
                            position: "top-right",
                            autoClose: 3000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        });
                    }

                })
                .catch((error) => {
                    const errorMessage = error && error.response && error.response.data && error.response.data.error
                        ? error.response.data.error
                        : "Cập nhật thất bại, vui lòng thử lại!";
                    toast.error(errorMessage, {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                });
        }
    };
    const handleImageClick = () => {
        document.getElementById('file-input-avatar')?.click();
    };
    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];  // Use optional chaining to safely access the file
        if (file) {
            uploadAvatar(file);
        }
    };

    const uploadAvatar = (file: File) => {
        const formData = new FormData();
        formData.append('avatar_url', file);
        updateStaffAvatar(id, formData)
            .then((response) => {
                const staffData = response.data;

                if (staffData && !Array.isArray(staffData)) {
                    setStaff((prevStaff) => ({
                        ...prevStaff, // Spread the existing staff properties
                        avatar_url: staffData['avatar_url'] || "" // Only update avatar_url
                    }));
                }


                toast.success('Cập nhật hình ảnh thành công', {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            })
            .catch((error) => {
                const errorMessage = error && error.response && error.response.data && error.response.data.error
                    ? error.response.data.error
                    : "Cập nhật hình ảnh thất bại, vui lòng thử lại!";
                toast.error(errorMessage, {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            });

    };
    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return (
            <>

            </>
        );
    }

    return (
        <>
            <div className='card mb-5 mb-xl-10'>
                <div className='card-body pt-9 pb-0'>
                    <div className='d-flex flex-wrap flex-sm-nowrap mb-3'>
                        <div className='me-7 mb-4'>
                            <div className='symbol symbol-100px symbol-lg-150px symbol-fixed position-relative'>
                                <img src={staff?.avatar_url || '/media/avatars/default-avatar.jpg'} alt='Avatar'
                                    onClick={handleImageClick} />
                                <input
                                    type="file"
                                    id="file-input-avatar"
                                    style={{ display: 'none' }}
                                    accept="image/*"
                                    onChange={handleImageChange}
                                />
                                <div
                                    className='position-absolute translate-middle bottom-0 start-100 mb-6 bg-success rounded-circle border border-4 border-white h-20px w-20px'></div>
                            </div>
                        </div>


                        <div className='flex-grow-1'>
                            <div className='d-flex justify-content-between align-items-start flex-wrap mb-2'>
                                <div className='d-flex flex-column'>
                                    <div className='d-flex align-items-center mb-2'>
                                        <a href='#' className='text-gray-800 text-hover-primary fs-2 fw-bolder me-1'>
                                            {staff?.fullname}
                                        </a>
                                        <a href='#'>
                                            <KTIcon iconName='verify' className='fs-1 text-primary' />
                                        </a>

                                    </div>

                                    <div className='d-flex flex-wrap fw-bold fs-6 mb-4 pe-2'>
                                        <a
                                            href='#'
                                            className='d-flex align-items-center text-gray-400 text-hover-primary me-5 mb-2'
                                        >
                                            <KTIcon iconName='profile-circle' className='fs-4 me-1' />
                                            {staff?.role?.name}
                                        </a>
                                        <a
                                            href='#'
                                            className='d-flex align-items-center text-gray-400 text-hover-primary me-5 mb-2'
                                        >
                                            <KTIcon iconName='geolocation' className='fs-4 me-1' />
                                            {staff?.showroom?.name}
                                        </a>
                                        <a
                                            href='#'
                                            className='d-flex align-items-center text-gray-400 text-hover-primary mb-2'
                                        >
                                            <KTIcon iconName='sms' className='fs-4 me-1' />
                                            {staff?.email}
                                        </a>
                                    </div>
                                </div>

                                <div className='d-flex my-4'>

                                    <button
                                        className='btn btn-sm btn-primary me-3'
                                        data-bs-toggle='modal'
                                        data-bs-target='#kt_modal_offer_a_deal'
                                        onClick={handleRefreshClick}
                                    >
                                        Refresh
                                    </button>

                                </div>
                            </div>

                            <div className='d-flex flex-wrap flex-stack'>
                                <div className='d-flex flex-column flex-grow-1 pe-8'>
                                    <div className='d-flex flex-wrap'>

                                    </div>
                                </div>
                                <div className='d-flex align-items-center w-200px w-sm-300px flex-column mt-3'>

                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='d-flex overflow-auto h-55px'>
                        <ul className='nav nav-stretch nav-line-tabs nav-line-tabs-2x border-transparent fs-5 fw-bolder flex-nowrap'>
                            <li className='nav-item'>
                                <Link
                                    className={
                                        `nav-link text-active-primary me-6 active`
                                    }
                                    to='#'
                                >
                                    Overview
                                </Link>
                            </li>

                        </ul>
                    </div>
                </div>
            </div>
            <Outlet />
            <div className='card mb-5 mb-xl-10' id='kt_profile_details_view'>
                <div className='card-header cursor-pointer'>
                    <div className='card-title m-0'>
                        <h3 className='fw-bolder m-0'>Profile Details</h3>
                    </div>
                </div>

                <div className='card-body p-9'>
                    <div className='row mb-7'>
                        <label className='col-lg-4 fw-bold text-muted'>Full Name</label>

                        <div className='col-lg-8'>
                            <input
                                type="text"
                                className='form-control'
                                value={staff?.fullname || ''}
                                onChange={(e) => setStaff({ ...staff, fullname: e.target.value })}
                            />
                        </div>
                    </div>
                    <div className='row mb-7'>
                        <label className='col-lg-4 fw-bold text-muted'>Phone Number</label>

                        <div className='col-lg-8'>
                            <input
                                type="text"
                                className='form-control'
                                value={staff?.phone_number || ''}
                                onChange={(e) => setStaff({ ...staff, phone_number: e.target.value })}
                            />
                        </div>
                    </div>
                    <div className='row mb-7'>
                        <label className='col-lg-4 fw-bold text-muted'>
                            Email
                        </label>

                        <div className='col-lg-8 d-flex align-items-center'>
                            <input
                                type='email'
                                className='form-control'
                                value={staff?.email || ''}
                                onChange={(e) => setStaff({ ...staff, email: e.target.value })}
                            />
                        </div>

                    </div>
                    <div className='row mb-7'>
                        <label className='col-lg-4 fw-bold text-muted'>Role</label>
                        <div className='col-lg-8'>
                            <select
                                className='form-control'
                                value={staff?.role_id || ''}
                                onChange={(e) => {
                                    const selectedRoleId = Number(e.target.value);
                                    setStaff({ ...staff, role_id: selectedRoleId });
                                }}
                            >
                                <option value=''>Select role</option>
                                {roles.map((role) => (
                                    <option key={role.id} value={role.id}>
                                        {role.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className='row mb-7'>
                        <label className='col-lg-4 fw-bold text-muted'>Showroom</label>

                        <div className='col-lg-8 fv-row'>
                            <select
                                className='form-control'
                                value={staff?.showroom_id || ''}
                                onChange={(e) => {
                                    const selectedShowroomId = Number(e.target.value);
                                    setStaff({ ...staff, showroom_id: selectedShowroomId });
                                }}
                            >
                                <option value=''>Select Showroom</option>
                                {showroom.map((showroom) => (
                                    <option key={showroom.id} value={showroom.id}>
                                        {showroom.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>


                    <div className='row mb-7'>
                        <label className='col-lg-4 fw-bold text-muted'>
                            Password
                            <i
                                className='fas fa-exclamation-circle ms-1 fs-7'
                                data-bs-toggle='tooltip'
                                title='Leave empty to not change password'
                            ></i>
                        </label>

                        <div className='col-lg-8 d-flex align-items-center'>
                            <input
                                type='password'
                                className='form-control'
                                placeholder="Nhập mật khẩu mới"
                                value={staff?.password || ''}
                                onChange={(e) => setStaff({ ...staff, password: e.target.value })}
                            />
                        </div>

                    </div>

                    <div className='d-flex my-4'>
                        <button className='btn btn-primary' onClick={handleUpdate}>Update</button>
                    </div>
                </div>
            </div>
            {/* Use for statistic */}
            {/*<div className='row gy-10 gx-xl-10'>*/}
            {/*    <div className='col-xl-6'>*/}
            {/*        <ChartsWidget1 className='card-xxl-stretch mb-5 mb-xl-10'/>*/}
            {/*    </div>*/}

            {/*    <div className='col-xl-6'>*/}
            {/*        <TablesWidget1 className='card-xxl-stretch mb-5 mb-xl-10'/>*/}
            {/*    </div>*/}
            {/*</div>*/}

            {/*<div className='row gy-10 gx-xl-10'>*/}
            {/*    <div className='col-xl-6'>*/}
            {/*        <ListsWidget5 className='card-xxl-stretch mb-5 mb-xl-10'/>*/}
            {/*    </div>*/}

            {/*    <div className='col-xl-6'>*/}
            {/*        <TablesWidget5 className='card-xxl-stretch mb-5 mb-xl-10'/>*/}
            {/*    </div>*/}
            {/*</div>*/}
        </>
    )
}