import { useContext, useState } from "react";
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css'
import { useLoaderData } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";

const CreateAssignments = () => {
    const [startDate, setStartDate] = useState(new Date())
    const {user}=useContext(AuthContext);
    const handleCreateAssignment = e => {
        e.preventDefault();
        const form = e.target;
        const imageUrl = form.imageUrl.value;
        const title = form.title.value;
        const description = form.description.value;
        const marks = form.marks.value;
        const difficultyLevel = form.difficultLevel.value;
        const dueDate = startDate;
        const email = form.email.value;
    }

    return (
        <div className="py-24 ">
            <div className="bg-[#ecc3cb] mt-10 p-24">
                <h2 className="text-3xl text-center font-extrabold mb-4">Create an Assignment</h2>
                <form onSubmit={handleCreateAssignment}>
                    <div className="md:flex mb-8">
                        <div className="form-control md:w-1/2">
                            <label className="label">
                                <span className="label-text">Image</span>
                            </label>
                            <label className="input-group">
                                <input type="text" name="imageUrl" className="input input-bordered w-full"
                                    placeholder="thumbnail Image URL" />
                            </label>

                        </div>
                        <div className="form-control md:w-1/2 ml-4">
                            <label className="label">
                                <span className="label-text">Assignment Title</span>
                            </label>
                            <label className="input-group">
                                <input type="text" name="title" className="input input-bordered w-full"
                                    placeholder="Assignment Title" />
                            </label>

                        </div>
                    </div>
                    {/* form  description and marks row */}
                    <div className="md:flex mb-8">
                        <div className="form-control md:w-1/2">
                            <label className="label">
                                <span className="label-text">Description</span>
                            </label>
                            <label className="input-group">
                                <input type="text" name="description" className="input input-bordered w-full"
                                    placeholder="Description" />
                            </label>

                        </div>
                        <div className="form-control md:w-1/2 ml-4">
                            <label className="label">
                                <span className="label-text">Marks</span>
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
                                <span className="label-text">Assignment Difficulty Level</span>
                            </label>
                            <select className="p-3 rounded-xl">
                                <option value="easy">Easy</option>
                                <option value="medium">Medium</option>
                                <option value="hard">Hard</option>
                            </select>

                        </div>
                        <div className="form-control md:w-1/2 ml-4">
                            <label className="label">
                                <span className="label-text">Due Date</span>
                            </label>
                            <DatePicker className="p-3 rounded-xl w-full" selected={startDate} onChange={(date) => setStartDate(date)} />
                        </div>
                    </div>
                    <div className="form-control w-full mb-8">
                        <label htmlFor='emailAddress'>User Email</label>
                        <input className=" p-3 rounded-xl" type="email" name="email" id=""defaultValue={user?.email} 
                             />
                    </div>
                    <input type="submit" value="CREATE ASSIGNMENT" className="btn btn-block bg-cyan-400 text-white" />
                </form>
            </div>

        </div>
    );
};

export default CreateAssignments;