import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css'
import Footer from "./Footer";
import Navbar from "../Components/Navbar";
import { useLoaderData, useNavigate, useParams } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import toast from "react-hot-toast";
import axios from "axios";
import Swal from "sweetalert2";

const UpdateAssignment = () => {
    const assignment = useLoaderData()
    const { imageUrl, title, description, marks, difficulty, dueDate, email } = assignment 
    // const navigate = useNavigate()
    const { _id } = useParams();
    console.log(_id);

    
    const { user } = useContext(AuthContext)
    const [startDate, setStartDate] = useState(new Date(deadline) || new Date())

    const handleUpdateAssignment = e => {
        e.preventDefault()
        const form = e.target
        const imageUrl = form.imageUrl.value
        const title = form.title.value
        const description = form.description.value
        const email = form.email.value
        const dueDate = startDate
        const difficulty = form.difficulty.value
        const marks = form.marks.value

        const updateAssignment = {imageUrl, title, description, marks, difficulty, dueDate, email}
        console.log(updateAssignment)

        // send data to the server
        fetch(`${import.meta.env.VITE_API_URL}/updateAssignment/${_id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(updateAssignment)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.modifiedCount > 0) {
                    Swal.fire({
                        title: 'Success',
                        text: 'Assignment Updated Successfully',
                        icon: 'success',
                        confirmButtonText: 'Ok'
                    })
                }
            })
    }


    return (
        <div>
            <div>
                <Navbar></Navbar>
            </div>
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
                                    <input type="text" name="title" defaultValue={title} className=" text-white input input-bordered w-full"
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
                                    <option className="text-white" value="Easy">Easy</option>
                                    <option className="text-white" value="Medium">Medium</option>
                                    <option className="text-white" value="Hard">Hard</option>
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
                            <input className=" p-3 rounded-xl text-white" type="email" name="email" id="" defaultValue={user?.email}
                            />
                        </div>
                        <input type="submit" value="UPDATE ASSIGNMENT" className="btn btn-block bg-cyan-400 text-white" />
                    </form>
                </div>
            </div>
            <div>
                <Footer></Footer>
            </div>
        </div>
    );
};

export default UpdateAssignment;