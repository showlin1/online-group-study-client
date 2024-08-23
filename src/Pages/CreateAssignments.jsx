import { useContext, useState } from "react";
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css'
import { AuthContext } from "../Provider/AuthProvider";
import toast from "react-hot-toast";
import axios from "axios";
import Swal from "sweetalert2";

const CreateAssignments = () => {
    const [startDate, setStartDate] = useState(new Date())
    const { user } = useContext(AuthContext);
    // const navigate = useNavigate()

    const handleCreateAssignment = async e => {
        e.preventDefault();
        const form = e.target;
        const imageUrl = form.imageUrl.value;
        const title = form.title.value;
        const description = form.description.value;
        const marks = form.marks.value;
        const dueDate = startDate;
        const email = form.email.value;
        const difficulty = form.difficulty.value;
        const assignmentData = { imageUrl, title, description, marks, difficulty, dueDate, othersUser: { email } }
        // console.log(assignmentData)
        try {
            const { data } = await axios.post(
                `${import.meta.env.VITE_API_URL}/assignment`,
                assignmentData
            )
            console.log(data)
            if (data.insertedId) {
                Swal.fire({
                    title: 'Success',
                    text: 'Assignment created Successfully',
                    icon: 'success',
                    confirmButtonText: 'Ok'
                })
            }
            // navigate('/my-posted-jobs')
        } catch (err) {
            console.log(err)
        }

    }


    return (
        <div className="py-24 ">
            <div className="bg-[#ecc3cb] mt-10 p-24">
                <h2 className="text-4xl text-center font-bold mb-4 text-cyan-600">Create an Assignment</h2>
                <form onSubmit={handleCreateAssignment}>
                    <div className="md:flex mb-8">
                        <div className="form-control md:w-1/2">
                            <label className="label">
                                <span className="label-text text-cyan-600 text-xl">Image</span>
                            </label>
                            <label className="input-group">
                                <input type="text" name="imageUrl" className="input input-bordered w-full"
                                    placeholder="thumbnail Image URL" />
                            </label>

                        </div>
                        <div className="form-control md:w-1/2 ml-4">
                            <label className="label">
                                <span className="label-text text-cyan-600 text-xl">Assignment Title</span>
                            </label>
                            <label className="input-group">
                                <input type="text" name="title" className=" input input-bordered w-full"
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
                                <input type="text" name="description" className="input input-bordered w-full"
                                    placeholder="Description" />
                            </label>

                        </div>
                        <div className="form-control md:w-1/2 ml-4">
                            <label className="label">
                                <span className="label-text text-cyan-600 text-xl">Marks</span>
                            </label>
                            <label className="input-group">
                                <input type="text" name="marks" className="input input-bordered w-full"
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
                            <select name='difficulty'
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
                    <input type="submit" value="CREATE ASSIGNMENT" className="btn btn-block bg-cyan-400 text-white" />
                </form>
            </div>

        </div>
    );
};

export default CreateAssignments;