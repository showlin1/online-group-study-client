import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import axios from "axios";
import Swal from "sweetalert2";
import GiveMark from "./GiveMark";


const MySubmitAssignments = () => {
    const { user } = useContext(AuthContext)
    const [assignments, setAssignments] = useState([])

    const [giveMarks, setGiveMarks] = useState([])
    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_URL}/giveMarks`)
            .then(res => {
                setGiveMarks(res.data);
            })
    }, [])
    console.log(giveMarks);


    useEffect(() => {
        getData()
    }, [user])

    const getData = async () => {
        const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/myAssignments/${user?.email}`,{
            withCredentials:true
        })
        setAssignments(data)
    }
    // handle status
    const handleStatus = async (id, status) => {
        const { data } = await axios.patch(`${import.meta.env.VITE_API_URL}/myAssignment/${id}`,
            {withCredentials:true, status }
        )
        console.log(data);
        getData()
    }


    const handleDelete = async id => {
        try {
            const { data } = await axios.delete(`${import.meta.env.VITE_API_URL}/myAssignment/${id}`)
            console.log(data)
            if (data.deletedCount > 0) {
                Swal.fire({
                    title: "Deleted!",
                    text: "Your Assignment has been deleted.",
                    icon: "success"
                });
            }
            //refresh ui
            getData()
        }
        catch (err) {
            console.log(err.message)
        }
    }
    return (
        <div className="py-24">
            <section className='container px-4 mx-auto pt-12'>
                <div className='flex items-center gap-x-3'>
                    <h2 className='text-lg font-medium text-cyan-400 '>My Submitted Assignments</h2>

                    <span className='px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full '>
                        {assignments.length} Assignment
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
                                                    <span>Assignment Title</span>
                                                </div>
                                            </th>

                                            <th
                                                scope='col'
                                                className='px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500'
                                            >
                                                <span>Email</span>
                                            </th>
                                            <th
                                                scope='col'
                                                className='px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500'
                                            >
                                                <span>Assignment Status</span>
                                            </th>

                                            <th
                                                scope='col'
                                                className='px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500'
                                            >
                                                <button className='flex items-center gap-x-2'>
                                                    <span>Assignment Marks</span>
                                                </button>
                                            </th>
                                            <th
                                                scope='col'
                                                className='px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500'
                                            >
                                                noteText
                                            </th>
                                            <th
                                                scope='col'
                                                className='px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500'
                                            >
                                                Obtained Marks
                                            </th>

                                            <th className='px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500'>
                                                Delete
                                            </th>
                                            <th className='px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500'>
                                                Action
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
                                                        <div
                                                            className={`inline-flex items-center px-3 py-1 rounded-full gap-x-2 ${assignment.status === 'Pending' &&
                                                                'bg-yellow-100/60 text-yellow-500'
                                                                } ${assignment.status === 'In Progress' &&
                                                                'bg-blue-100/60 text-blue-500'
                                                                } ${assignment.status === 'Complete' &&
                                                                'bg-emerald-100/60 text-emerald-500'
                                                                } ${assignment.status === 'Rejected' &&
                                                                'bg-red-100/60 text-red-500'
                                                                }`}
                                                        >
                                                            <span
                                                                className={`h-1.5 w-1.5 rounded-full ${assignment.status === 'Pending' && 'bg-yellow-500'
                                                                    } ${assignment.status === 'In Progress' && 'bg-blue-500'
                                                                    } ${assignment.status === 'Complete' && 'bg-green-500'} 
                                                                     ${assignment.status === 'Rejected' && 'bg-red-500'} `}
                                                            ></span>
                                                            <h2 className='text-sm font-normal '>{assignment.status}</h2>
                                                        </div>
                                                    </td>

                                                    <td className='px-4 py-4 text-center text-sm text-gray-500  whitespace-nowrap'>
                                                        {assignment.marks}
                                                    </td>

                                                    <td
                                                        title=''
                                                        className='px-4 py-4 text-sm text-gray-500  whitespace-nowrap'
                                                    >
                                                        {assignment.noteText}
                                                    </td>

                                                    <td>
                                                    {
                                                        giveMarks.map(giveMark => <div className="flex items-center gap-x-6" key={giveMark._id}>
                                                            <td className='px-4  py-4 text-center text-sm text-gray-500  whitespace-nowrap'>
                                                                {giveMark.obtainedMark}
                                                            </td>

                                                        </div>)

                                                    }
                                                    </td>
                                                    <td className='px-4 py-4 text-sm whitespace-nowrap'>
                                                        <div className='flex items-center gap-x-6'>
                                                            <button onClick={() => handleDelete(assignment._id)}
                                                                className='text-gray-500 transition-colors duration-200   hover:text-red-500 focus:outline-none'>
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
                                                                        d='M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0'
                                                                    />
                                                                </svg>
                                                            </button>
                                                        </div>
                                                    </td>
                                                    <td className='px-4 py-4 text-sm whitespace-nowrap'>
                                                        {/* Complete Button */}
                                                        <button
                                                            disabled={assignment.status !== 'In Progress'}
                                                            onClick={() => handleStatus(assignment._id, 'Complete')}
                                                            title='Mark Complete'
                                                            className='text-gray-500 transition-colors duration-200   hover:text-red-500 focus:outline-none disabled:cursor-not-allowed'
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
                                                                    d='M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0 1 18 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3 1.5 1.5 3-3.75'
                                                                />
                                                            </svg>
                                                        </button>
                                                    </td>

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

export default MySubmitAssignments;