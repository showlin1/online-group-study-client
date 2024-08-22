import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import axios from "axios";
import Swal from "sweetalert2";
import GiveMark from "./GiveMark";

const PendingAssignments = () => {

    const { user } = useContext(AuthContext)
    const [assignments, setAssignments] = useState([])

    const [giveMark, setGiveMark] = useState(false)

    useEffect(() => {
        getData()
    }, [user])

    const getData = async () => {
        const { data } = await axios(`${import.meta.env.VITE_API_URL}/assignmentRequest/${user?.email}`, {
            withCredentials: true
        })
        setAssignments(data)
    }
    // console.log(assignments)

    const handleStatus = async (id, prevStatus, status) => {
        if (prevStatus === status)
            return console.log('Sorry')
        console.log(id, prevStatus, status)
        const { data } = await axios.patch(`${import.meta.env.VITE_API_URL}/myAssignment/${id}`,
            { status }
        )
        console.log(data);
        getData()
    }

    const giveMarkModal = () => {
        setGiveMark(!giveMark)
    }


    return (
        <div className="py-24">
            <section className='container px-4 mx-auto pt-12'>
                <div className='flex items-center gap-x-3'>
                    <h2 className='text-lg font-medium text-cyan-400 '>Pending Assignments</h2>

                    <span className='px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full '>
                        {assignments.length} Requests
                    </span>
                </div>

                <div className='flex flex-col mt-6'>
                    <div className='-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
                        <div className='inline-block min-w-full py-2 align-middle md:px-6 lg:px-8'>
                            <div className='overflow-hidden border border-gray-200  md:rounded-lg'>
                                <table className='min-w-full divide-y divide-gray-200'>
                                    <thead className='bg-gray-50'>
                                        <tr>
                                            <th
                                                scope='col'
                                                className='py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500'
                                            >
                                                <div className='flex items-center gap-x-3'>
                                                    <span>Title</span>
                                                </div>
                                            </th>
                                            <th
                                                scope='col'
                                                className='py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500'
                                            >
                                                <div className='flex items-center gap-x-3'>
                                                    <span>Examinee Email</span>
                                                </div>
                                            </th>

                                            <th
                                                scope='col'
                                                className='px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500'
                                            >
                                                <span>Assignment Marks</span>
                                            </th>

                                            <th
                                                scope='col'
                                                className='px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500'
                                            >
                                                Status
                                            </th>

                                            <th className='px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500'>
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className='bg-white divide-y divide-gray-200 '>
                                        {
                                            assignments.map(assignment => (
                                                <tr key={assignment._id}>
                                                    <td className='px-4 py-4 text-sm text-gray-500  whitespace-nowrap'>
                                                        {assignment.title}
                                                    </td>
                                                    <td className='px-4 py-4 text-sm text-gray-500  whitespace-nowrap'>
                                                        {assignment.email}
                                                    </td>

                                                    <td className='px-4 py-4 text-sm text-gray-500  whitespace-nowrap'>
                                                        {assignment.marks}
                                                    </td>
                                                    <td className='px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap'>
                                                        <div
                                                            className={`inline-flex items-center px-3 py-1 rounded-full gap-x-2 ${assignment.status === 'Pending' &&
                                                                'bg-yellow-100/60 text-yellow-500'
                                                                } ${assignment.status === 'In Progress' &&
                                                                'bg-blue-100/60 text-blue-500'
                                                                } ${assignment.status === 'Complete' &&
                                                                'bg-emerald-100/60 text-emerald-500'
                                                                } ${assignment.status === 'Rejected' &&
                                                                'bg-red-100/60 text-red-500'
                                                                } `}
                                                        >
                                                            <span
                                                                className={`h-1.5 w-1.5 rounded-full ${assignment.status === 'Pending' && 'bg-yellow-500'
                                                                    } ${assignment.status === 'In Progress' && 'bg-blue-500'
                                                                    } ${assignment.status === 'Complete' && 'bg-green-500'} ${assignment.status === 'Rejected' && 'bg-red-500'
                                                                    }  `}
                                                            ></span>
                                                            <h2 className='text-sm font-normal '>{assignment.status}</h2>
                                                        </div>

                                                    </td>
                                                    <td className='px-4 py-4 text-sm whitespace-nowrap'>
                                                        <div className='flex items-center gap-x-6'>
                                                            {/* Accept Button: In Progress */}
                                                            <button
                                                                onClick={() =>
                                                                    handleStatus(assignment._id, assignment.status, 'In Progress')
                                                                }
                                                                disabled={assignment.status === 'Complete'}
                                                                className='disabled:cursor-not-allowed text-gray-500 transition-colors duration-200   hover:text-red-500 focus:outline-none'
                                                            >
                                                                <svg
                                                                    xmlns='http://www.w3.org/2000/svg'
                                                                    fill='none'
                                                                    viewBox='0 0 24 24'
                                                                    strokeWidth='1.5'
                                                                    stroke='currentColor'
                                                                    className='w-5 h-5'
                                                                >
                                                                    <path
                                                                        strokeLinecap='round'
                                                                        strokeLinejoin='round'
                                                                        d='m4.5 12.75 6 6 9-13.5'
                                                                    />
                                                                </svg>
                                                            </button>
                                                            {/* Reject Button */}
                                                            <button
                                                                onClick={() =>
                                                                    handleStatus(assignment._id, assignment.status, 'Rejected')
                                                                }
                                                                disabled={assignment.status === 'Complete'}
                                                                className='disabled:cursor-not-allowed text-gray-500 transition-colors duration-200   hover:text-yellow-500 focus:outline-none'
                                                            >
                                                                <svg
                                                                    xmlns='http://www.w3.org/2000/svg'
                                                                    fill='none'
                                                                    viewBox='0 0 24 24'
                                                                    strokeWidth='1.5'
                                                                    stroke='currentColor'
                                                                    className='w-5 h-5'
                                                                >
                                                                    <path
                                                                        strokeLinecap='round'
                                                                        strokeLinejoin='round'
                                                                        d='M18.364 18.364A9 9 0 0 0 5.636 5.636m12.728 12.728A9 9 0 0 1 5.636 5.636m12.728 12.728L5.636 5.636'
                                                                    />
                                                                </svg>
                                                            </button>
                                                        </div>
                                                    </td>
                                                    <td className='px-4 py-4 text-sm whitespace-nowrap'>
                                                        <div className='flex items-center gap-x-6'>
                                                            <button onClick={giveMarkModal} className='bg-cyan-400 text-white font-semibold px-4 py-3 rounded hover:bg-cyan-600 duration-300'>
                                                                Give Mark
                                                            </button>
                                                        </div>
                                                    </td>
                                                    {
                                                        giveMark && <GiveMark assignment={assignment} giveMarkModal={giveMarkModal}></GiveMark>
                                                    }
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default PendingAssignments;