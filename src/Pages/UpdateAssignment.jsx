import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css'
import { useLoaderData, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import toast from "react-hot-toast";
import axios from "axios";
import Swal from "sweetalert2";

const UpdateAssignment = () => {
    const assignment = useLoaderData()
    const { _id, imageUrl, title, description, marks, difficulty, dueDate, email } = assignment

    const navigate = useNavigate();

    const { user } = useContext(AuthContext)
    const [startDate, setStartDate] = useState(new Date(dueDate) || new Date())

    const handleUpdateAssignment = async e => {
        e.preventDefault()
        const form = e.target
        const imageUrl = form.imageUrl.value
        const title = form.title.value
        const description = form.description.value
        const email = form.email.value
        const dueDate = startDate
        const difficulty = form.difficulty.value
        const marks = form.marks.value

        const updateAssignment = { imageUrl, title, description, marks, difficulty, dueDate, email }
        console.log(updateAssignment)

        // send data to the server

        try {
            const { data } = await axios.put(
                `${import.meta.env.VITE_API_URL}/assignments/${_id}`,
                updateAssignment
            )
            console.log(data)
            // toast.success('Job Data Updated Successfully!')
            if (data.modifiedCount > 0) {
                Swal.fire({
                    title: 'Success',
                    text: 'Assignment Updated Successfully',
                    icon: 'success',
                    confirmButtonText: 'Ok'
                })
            }
            navigate('/assignments')
        } catch (err) {
            console.log(err)
            toast.error(err.message)
        }

    }


    return (
        <div>
            <div className="py-24">
                <div className="bg-[#ecc3cb] mt-10 p-24">
                    <h2 className="text-4xl text-center font-bold mb-4 text-cyan-600">Update an Assignment</h2>
                    <form onSubmit={handleUpdateAssignment}>
                        <div className="md:flex mb-8">
                            <div className="form-control md:w-1/2">
                                <label className="label">
                                    <span className="label-text text-cyan-600 text-xl">Image</span>
                                </label>
                                <label className="input-group">
                                    <input type="text" name="imageUrl" defaultValue={imageUrl} className="input input-bordered w-full"
                                        placeholder="thumbnail Image URL" />
                                </label>

                            </div>
                            <div className="form-control md:w-1/2 ml-4">
                                <label className="label">
                                    <span className="label-text text-cyan-600 text-xl">Assignment Title</span>
                                </label>
                                <label className="input-group">
                                    <input type="text" name="title" defaultValue={title} className="  input input-bordered w-full"
                                        placeholder="Assignment Title" />
                                </label>

                            </div>
                        </div>
                        {/* form  description and marks row */}
                        <div className="md:flex mb-8">
                            <div className="form-control md:w-1/2">
                                <label className="label">
                                    <span className="label-text text-cyan-600 text-xl">Description</span>
                                </label>
                                <label className="input-group">
                                    <input type="text" name="description" defaultValue={description} className="input input-bordered w-full"
                                        placeholder="Description" />
                                </label>

                            </div>
                            <div className="form-control md:w-1/2 ml-4">
                                <label className="label">
                                    <span className="label-text text-cyan-600 text-xl">Marks</span>
                                </label>
                                <label className="input-group">
                                    <input type="text" name="marks" defaultValue={marks} className="input input-bordered w-full"
                                        placeholder="Marks" />
                                </label>

                            </div>
                        </div>
                        {/* form assignment difficulty level & date row */}
                        <div className="md:flex mb-8">
                            <div className="form-control md:w-1/2">
                                <label className="label">
                                    <span className="label-text text-cyan-600 text-xl">Assignment Difficulty Level</span>
                                </label>
                                <select name='difficulty' defaultValue={difficulty}
                                    id='difficulty' className="p-3 rounded-xl">
                                    <option value="Easy">Easy</option>
                                    <option value="Medium">Medium</option>
                                    <option value="Hard">Hard</option>
                                </select>

                            </div>
                            <div className="form-control md:w-1/2 ml-4">
                                <label className="label">
                                    <span className="label-text text-cyan-600 text-xl">Due Date</span>
                                </label>
                                <DatePicker className="p-3 rounded-xl w-full" selected={startDate} onChange={(date) => setStartDate(date)} />
                            </div>
                        </div>
                        <div className="form-control w-full mb-8">
                            <label className="text-cyan-600 text-xl" htmlFor='emailAddress'>User Email</label>
                            <input className=" p-3 rounded-xl" type="email" name="email" id="" defaultValue={user?.email}
                            />
                        </div>
                        <input type="submit" value="UPDATE ASSIGNMENT" className="btn btn-block bg-cyan-400 text-white" />
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UpdateAssignment;