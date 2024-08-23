import { useContext, useState } from "react";
import DatePicker from "react-datepicker";
import { RxCross2 } from "react-icons/rx";
import { AuthContext } from "../Provider/AuthProvider";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import toast from "react-hot-toast";


const TakeAssignmentModal = ({ handleTakeAssignment, assignment }) => {
    const { user } = useContext(AuthContext);
    const [startDate, setStartDate] = useState(new Date());
    const navigate = useNavigate()
    const { _id, title, difficulty, marks, dueDate, email, othersUser } = assignment;

    const handleTakingAssignment = async e => {
        e.preventDefault()
        // if (user?.email === othersUser?.email)
        //     return alert('Action not permitted!')
        const form = e.target;
        const email = user?.email;
        const assignmentId=_id;
        const dueDate = startDate;
        const pdfLink = form.pdfLink.value;
        const status = 'Pending';
        const noteText = form.noteText.value;

        const myAssignmentData = {
            assignmentId,
            title,
            email,
            dueDate,
            pdfLink,
            marks,
            difficulty,
            status,
            noteText,
            othersUser_Email: othersUser?.email,
            othersUser,
        }

        try {
            const { data } = await axios.post(
                `${import.meta.env.VITE_API_URL}/myAssignments`,
                myAssignmentData
            )
            console.log(data)
            if (data.insertedId) {
                Swal.fire({
                    title: 'Success',
                    text: 'My Assignment Post Successfully',
                    icon: 'success',
                    confirmButtonText: 'Ok'
                })
            }
            navigate('/mySubmitAssignments')
        } catch (err) {
            // console.log(err)
            toast.success(err.response.data);
            e.target.reset()
        }
    }

    return (
            <div className="fixed inset-0 pt-12 md:pt-20 px-3 z-10 w-full bg-gray-500 bg-opacity-45">
                <form onSubmit={handleTakingAssignment} className="max-w-xl mx-auto shadow-2xl border rounded-lg bg-gray-50 dark:bg-gray-800 p-3 md:p-8 relative space-y-1 md:space-y-5">
                    <div>
                        <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">PDF/doc link</label>
                        <input type="text" name="pdfLink" placeholder="PDF/doc link" className="block w-full px-5 py-2.5 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                    </div>
                    <div>
                        <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">Quick note text</label>
                        <textarea name="noteText" required className="block w-full px-5 py-2.5 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" ></textarea>
                    </div>

                    <div className="-mx-2 md:items-center md:flex">
                        <div className="flex-1 px-2">
                            <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">Email address</label>
                            <input type="email" defaultValue={user?.email} readOnly className="block w-full px-5 py-2.5 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                        </div>

                        <div className="flex-1 px-2">
                            <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">Post assignment Date</label>
                            <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} name="date" className="block w-full px-5 py-2.5 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                        </div>
                    </div>
                    <div>
                        <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">Status</label>
                        <input type="text" name="status" placeholder="Pending" className="block w-full px-5 py-2.5 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                    </div>

                    <input type="submit" value="Submitted Assignment" className="w-full px-6 py-3 mt-4 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-cyan-400 rounded-lg hover:bg-cyan-600 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50" />

                    <div onClick={handleTakeAssignment} className="cursor-pointer absolute top-0 right-0 text-3xl pr-2">
                        <RxCross2 />
                    </div>
                </form>
            </div>
        );
    };

    export default TakeAssignmentModal;