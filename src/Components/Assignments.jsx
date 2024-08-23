
import axios from "axios";
import AssignmentCard from "../Pages/AssignmentCard";
import { useEffect, useState } from "react";


const Assignments = () => {
    const [itemsPerPage, setItemsPerPage] = useState(3);
    const [currentPage, setCurrentPage] = useState(1)
    const [count, setCount] = useState(0);
    const [filter, setFilter] = useState('');
    const [sort, setSort] = useState('');
    const [search, setSearch] = useState('');

    const [assignments, setAssignments] = useState([])
    useEffect(() => {
        const getData = async () => {
            const { data } = await axios(`
                ${import.meta.env.VITE_API_URL
                }/all-assignments?page=${currentPage}& size=${itemsPerPage}& filter=${filter}& sort=${sort}`)
            setAssignments(data);
        }
        getData()
    }, [currentPage, itemsPerPage, filter, sort])

    useEffect(() => {
        const getCount = async () => {
            const { data } = await axios(`${import.meta.env.VITE_API_URL}/assignment-count?filter=${filter}`)
            setCount(data.count);
        }
        getCount()
    }, [filter])
    console.log(count);

    const numberOfPages = Math.ceil(count / itemsPerPage);

    const pages = [...Array(numberOfPages).keys()].map(element => element + 1)

    // handle Pagination button
    const handlePaginationButton = (value) => {
        console.log(value);
        setCurrentPage(value);
    }
    const handleReset = () => {
        setFilter('');
        setSort('');
    }

    const handleSearch = e => {
        e.preventDefault()
        const text = e.target.search.value
        setSearch(text)
    }
    console.log(search);

    return (
        <div className="py-24">
            <div className="py-10">
                <h2 className="text-2xl font-semibold text-center text-cyan-400 capitalize lg:text-3xl">All Assignments</h2>
                <div className="flex justify-center mx-auto mt-6">
                    <span className="inline-block w-40 h-1 bg-cyan-600 rounded-full"></span>
                    <span className="inline-block w-3 h-1 mx-1 bg-cyan-600 rounded-full"></span>
                    <span className="inline-block w-1 h-1 bg-cyan-600 rounded-full"></span>
                </div>
            </div>
            <div className='container px-6 py-10 mx-auto min-h-[calc(100vh-306px)] flex flex-col justify-between'>
                <div>
                    <div className='flex flex-col md:flex-row justify-center items-center gap-5 '>
                        <div>
                            <select
                                onChange={e => {
                                    setFilter(e.target.value)
                                    setCurrentPage(1)
                                }
                                }
                                value={filter}
                                name='difficulty'
                                id='difficulty'
                                className='border p-4 rounded-lg'
                            >
                                <option value=''>Filter By Assignment Difficulty
                                    Level </option>
                                <option value='Easy'>Easy</option>
                                <option value='Medium'>Medium</option>
                                <option value='Hard'>Hard</option>
                            </select>
                        </div>

                        
                        <div>
                            <select
                                onChange={e => {
                                    setSort(e.target.value)
                                    setCurrentPage(1)
                                }
                                }
                                value={sort}
                                name='sort'
                                id='sort'
                                className='border p-4 rounded-md'
                            >
                                <option value=''>Sort By Deadline</option>
                                <option value='dsc'>Descending Order</option>
                                <option value='asc'>Ascending Order</option>
                            </select>
                        </div>
                        <button onClick={handleReset} className='btn'>Reset</button>
                    </div>
                    <div className='grid grid-cols-1 gap-8 mt-8 xl:mt-16 md:grid-cols-2 lg:grid-cols-3'>
                        {assignments.map(assignment => (
                            <AssignmentCard key={assignment._id} assignment={assignment} />
                        ))}
                    </div>
                </div>

                {/* Pagination Section */}
                <div className='flex justify-center mt-12'>
                    {/* previous Button */}
                    <button
                        disabled={currentPage === 1}
                        onClick={() => handlePaginationButton(currentPage - 1)}
                        className='px-4 py-2 mx-1 text-gray-700 disabled:text-gray-500 capitalize bg-gray-200 rounded-md disabled:cursor-not-allowed disabled:hover:bg-gray-200 disabled:hover:text-gray-500 hover:bg-blue-500  hover:text-white'>
                        <div className='flex items-center -mx-1'>
                            <svg
                                xmlns='http://www.w3.org/2000/svg'
                                className='w-6 h-6 mx-1 rtl:-scale-x-100'
                                fill='none'
                                viewBox='0 0 24 24'
                                stroke='currentColor'
                            >
                                <path
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    strokeWidth='2'
                                    d='M7 16l-4-4m0 0l4-4m-4 4h18'
                                />
                            </svg>

                            <span className='mx-1'>previous</span>
                        </div>
                    </button>
                    {/* Number */}
                    {pages.map(btnNum => (
                        <button
                            onClick={() => handlePaginationButton(btnNum)}
                            key={btnNum}
                            className={`hidden ${currentPage === btnNum ? 'bg-blue-500 text-white' : ''} px-4 py-2 mx-1 transition-colors duration-300 transform  rounded-md sm:inline hover:bg-blue-500  hover:text-white`}
                        >
                            {btnNum}
                        </button>
                    ))}
                    {/* Next Button */}
                    <button
                        disabled={currentPage === numberOfPages}
                        onClick={() => handlePaginationButton(currentPage + 1)}
                        className='px-4 py-2 mx-1 text-gray-700 transition-colors duration-300 transform bg-gray-200 rounded-md hover:bg-blue-500 disabled:hover:bg-gray-200 disabled:hover:text-gray-500 hover:text-white disabled:cursor-not-allowed disabled:text-gray-500'>
                        <div className='flex items-center -mx-1'>
                            <span className='mx-1'>Next</span>

                            <svg
                                xmlns='http://www.w3.org/2000/svg'
                                className='w-6 h-6 mx-1 rtl:-scale-x-100'
                                fill='none'
                                viewBox='0 0 24 24'
                                stroke='currentColor'
                            >
                                <path
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    strokeWidth='2'
                                    d='M17 8l4 4m0 0l-4 4m4-4H3'
                                />
                            </svg>
                        </div>
                    </button>
                </div>
            </div>
        </div >
    );
};

export default Assignments;