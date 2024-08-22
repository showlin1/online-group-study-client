import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { RxCross2 } from "react-icons/rx";
import axios from "axios";
import Swal from "sweetalert2";


const GiveMark = ({ assignment, giveMarkModal }) => {

    const { pdfLink, noteText } = assignment;
    const { user } = useContext(AuthContext);

    const handleGiveMark = e => {
        e.preventDefault()
        const giveMarkUser = user?.displayName
        const userEmail = user?.email
        const pdf_Link = pdfLink
        const notes = noteText
        const obtainedMark = e.target.obtainedMark.value
        const feedback = e.target.feedback.value
        const userGiveMark = {
            giveMarkUser,
            userEmail,
            pdf_Link,
            notes,
            obtainedMark,
            feedback
        }

        axios.post(`${import.meta.env.VITE_API_URL}/giveMarks`, userGiveMark, { withCredentials: true })
            .then(res => {
                console.log(res.data);
                if (res.data.insertedId) {
                    Swal.fire({
                        title: 'Success!',
                        text: 'Review Added Successfully',
                        icon: 'success',
                        confirmButtonText: 'Ok'
                    })
                    giveMarkModal(false)
                }
            })

    }

    return (
        <div>
            <div className="fixed inset-0 pt-10 md:pt-16 px-3 z-10 w-full bg-gray-500 bg-opacity-45">
                <form onSubmit={handleGiveMark} className="max-w-xl mx-auto shadow-2xl border rounded-lg bg-gray-50 dark:bg-gray-800 p-3 md:p-8 relative space-y-1 md:space-y-5 text-lg">
                    <div>
                        <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">Pdf or Doc Link</label>
                        <input type="text" defaultValue={pdfLink} readOnly className="block w-full px-5 py-2.5 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                    </div>
                    <div className="-mx-2 md:items-center md:flex">
                        <div className="flex-1 px-2">
                            <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">Your Name</label>
                            <input type="text" defaultValue={user?.displayName} readOnly className="block w-full px-5 py-2.5 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                        </div>
                        <div className="flex-1 px-2">
                            <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">Email address</label>
                            <input type="email" defaultValue={user?.email} readOnly className="block w-full px-5 py-2.5 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                        </div>
                    </div>
                    <div className="-mx-2 md:items-center md:flex">
                        <div className="flex-1 px-2">
                            <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">Obtained Marks</label>
                            <input type="text" name="obtainedMark" className="block w-full px-5 py-2.5 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"

                            />
                        </div>

                        <div className="flex-1 px-2">
                            <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">Notes</label>
                            <input type="text" defaultValue={noteText} readOnly className="block w-full px-5 py-2.5 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                        </div>
                    </div>
                    <div className="flex-1 px-2">
                        <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">Feedback</label>
                        <input type="text" name="feedback" placeholder="Feedback" className="block w-full px-5 py-2.5 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"

                        />
                    </div>

                    <button className="w-full px-6 py-3 mt-4 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-cyan-400 rounded-lg hover:bg-cyan-600 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                        Give Mark
                    </button>

                    <div onClick={giveMarkModal} className="cursor-pointer absolute top-0 right-0 text-3xl pr-2">
                        <RxCross2 />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default GiveMark;