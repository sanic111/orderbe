import React, { ChangeEvent, FC, useState } from "react";
import { createStaff, getRoles, getShowroom } from "../core/requests";
import { ShowroomModel, Staff } from "../core/models";
import { toast } from "react-toastify";
import { RoleModel } from "../../auth";
import { useNavigate } from "react-router-dom";

type Props = {};
export const StaffCreate: FC<Props> = () => {
    const navigate = useNavigate();

    const [staff, setStaff] = useState<Partial<Staff>>({
        fullname: "",
        phone_number: "",
        email: "",
        password: "",
        role_id: 0,
        showroom_id: 0
    });

    const [roles, setRoles] = useState<RoleModel[]>([]);
    const [showroom, setShowroom] = useState<ShowroomModel[]>([]);

    // Fetch roles and showroom when component mounts
    React.useEffect(() => {
        // Fetch roles
        getRoles().then((response) => setRoles(response.data || []));

        // Fetch showroom
        getShowroom().then((response) => setShowroom(response.data || []));
    }, []);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setStaff({
            ...staff,
            [e.target.name]: e.target.value
        });
    };

    const handleRoleChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const selectedRoleId = Number(e.target.value);
        //const selectedRole = roles.find((role) => role.id === selectedRoleId);
        setStaff({
            ...staff,
            role_id: selectedRoleId || 0
        });
    };

    const handleShowroomChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const selectedShowroomId = Number(e.target.value);
        //const selectedShowroom = showroom.find((showroom) => showroom.id === selectedShowroomId);
        setStaff({
            ...staff,
            showroom_id: selectedShowroomId || 0
        });
    };

    const handleCreate = () => {
        createStaff(staff)
            .then(() => {
                toast.success("Tạo nhân viên thành công!", {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined
                });
                navigate('/staffs', { state: { reload: true } });
            })
            .catch((error) => {
                const errorMessage = error && error.response && error.response.data && error.response.data.error
                    ? error.response.data.error
                    : "Tạo nhân viên thất bại, vui lòng thử lại!";
                toast.error(errorMessage, {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined
                });
            });
    };

    return (
        <>
            <div className='card mb-5 mb-xl-10' id='kt_profile_details_view'>
                <div className='card-header cursor-pointer'>
                    <div className='card-title m-0'>
                        <h3 className='fw-bolder m-0'>Staff create</h3>
                    </div>
                </div>

                <div className='card-body p-9'>
                    {/* Full Name */}
                    <div className='row mb-7'>
                        <label className='col-lg-4 fw-bold text-muted'>Full Name</label>
                        <div className='col-lg-8'>
                            <input
                                type="text"
                                name="fullname"
                                className='form-control'
                                value={staff.fullname || ''}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>
                    <div className='row mb-7'>
                        <label className='col-lg-4 fw-bold text-muted'>Phone number</label>
                        <div className='col-lg-8'>
                            <input
                                type="text"
                                name="phone_number"
                                className='form-control'
                                value={staff.phone_number || ''}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>
                    {/* Email */}
                    <div className='row mb-7'>
                        <label className='col-lg-4 fw-bold text-muted'>Email</label>
                        <div className='col-lg-8'>
                            <input
                                type="email"
                                name="email"
                                className='form-control'
                                value={staff.email || ''}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>

                    {/* Password */}
                    <div className='row mb-7'>
                        <label className='col-lg-4 fw-bold text-muted'>Password</label>
                        <div className='col-lg-8'>
                            <input
                                type="password"
                                name="password"
                                className='form-control'
                                value={staff.password || ''}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>

                    {/* Role */}
                    <div className='row mb-7'>
                        <label className='col-lg-4 fw-bold text-muted'>Role</label>
                        <div className='col-lg-8'>
                            <select
                                className='form-control'
                                value={staff.role_id || ''}
                                onChange={handleRoleChange}
                            >
                                <option value=''>Chọn vai trò</option>
                                {roles.map((role) => (
                                    <option key={role.id} value={role.id}>
                                        {role.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Showroom */}
                    <div className='row mb-7'>
                        <label className='col-lg-4 fw-bold text-muted'>Showroom</label>
                        <div className='col-lg-8'>
                            <select
                                className='form-control'
                                value={staff.showroom_id || ''}
                                onChange={handleShowroomChange}
                            >
                                <option value=''>Chọn showroom</option>
                                {showroom.map((showroom) => (
                                    <option key={showroom.id} value={showroom.id}>
                                        {showroom.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className='d-flex my-4'>
                        <button className='btn btn-primary' onClick={handleCreate}>Create</button>
                    </div>
                </div>
            </div>
        </>
    );
};