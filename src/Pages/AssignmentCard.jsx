import { useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";


const AssignmentCard = ({ assignment }) => {
    const { _id, dueDate, title, imageUrl, marks, description, difficulty } = assignment;
    const [control, setControl] = useState(false);
    const handleDelete = _id => {
        console.log(_id);
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {

                fetch(`${import.meta.env.VITE_API_URL}/assignments/${_id}`, {
                    method: "DELETE"
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data);
                        if (data.deletedCount > 0) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your Assignment has been deleted.",
                                icon: "success"
                            });
                            setControl(!control);
                        }
                    })

            }
        });
    }

    return (
        <div className="card bg-slate-50 text-slate-900 w-full border  shadow-xl">
            <figure className="px-10 pt-10">
                <img
                    src={imageUrl}
                    className="rounded-xl h-[300px]" />
            </figure>
            <div className="card-body ">
                <h2 className="card-title">{title}</h2>
                <p>{description.substring(0, 100)}.....</p>
                <p>Difficulty Level: {difficulty}</p>
                <div className="flex  gap-28">
                    <p>Marks: {marks}</p>
                    <p>Due Date: {new Date(dueDate).toLocaleDateString()}</p>
                </div>
                <div className=" flex w-full gap-2 justify-between">
                    <button onClick={() => handleDelete(_id)} className="btn hover:bg-teal-600 bg-cyan-400 text-white w-1/2">Delete</button>
                    <Link to={`/assignments/${_id}`} className="btn hover:bg-teal-600 w-1/2 bg-cyan-400 text-white">Update</Link>
                </div>
                <Link to={`/assignment/${_id}`} className=" w-full">
                    <button className="btn w-full hover:bg-teal-600 bg-cyan-400 text-white">Assignment Details</button>
                </Link>
            </div>
        </div>
    );
};

export default AssignmentCard;