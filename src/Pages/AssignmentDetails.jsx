import { Link, useLoaderData } from "react-router-dom";
import TakeAssignmentModal from "./TakeAssignmentModal";
import { useState } from "react";


const AssignmentDetails = () => {
    const assignment = useLoaderData()
    const { _id, dueDate, title, imageUrl, marks, description, difficulty,othersUser } = assignment;

    const [modal, setModal] = useState(false)

    const handleTakeAssignment = () => {
        setModal(!modal)
    }
    
    return (
        <div className="py-24">
            <div className="py-10 mx-auto mb-16 text-slate-900 border bg-slate-50 w-full rounded-xl">
                <img className="mb-8 p-8 w-[1400px] h-[600px] items-center text center" src={imageUrl} alt="" />
                <div className="p-8">
                    <div className="flex justify-between mb-6">
                        <p className="text-xl">DueDate: {new Date(dueDate).toLocaleDateString()}</p>
                        <p className="text-xl">Difficulty Level: {difficulty}</p>
                        <p className="text-xl">Marks: {marks}</p>
                    </div>
                    <p className="text-xl mb-6">Email: {othersUser?.email}</p>
                    <h1 className="text-center text-3xl mb-6 font-bold">{title}</h1>
                    <p className="text-xl"><span className="font-bold">Description:</span> {description}</p>
                </div>
                <div className="text-center p-4 mt-8">
                    <button onClick={()=>handleTakeAssignment(_id)} className="btn text-center hover:bg-teal-600 bg-cyan-400 text-white">Take assignment</button>
                </div>
                {
                    modal && <TakeAssignmentModal handleTakeAssignment={handleTakeAssignment} assignment={assignment} ></TakeAssignmentModal>
                }
            </div>
        </div>
    );
};

export default AssignmentDetails;