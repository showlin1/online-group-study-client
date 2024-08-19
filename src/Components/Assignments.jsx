
import axios from "axios";
import AssignmentCard from "../Pages/AssignmentCard";
import { useEffect, useState } from "react";


const Assignments = () => {
    const [assignments, setAssignments] = useState([])
    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_URL}/assignments`)
            .then(res => {
                setAssignments(res.data);
            })
    }, [])
    return (
        <div className="py-24">
            <div className="py-10">
                <h1 className="text-2xl font-semibold text-center text-cyan-400 capitalize lg:text-3xl ">
                    Our Assignments
                </h1>

                <div className="flex justify-center mx-auto mt-6">
                    <span className="inline-block w-40 h-1 bg-primary rounded-full"></span>
                    <span className="inline-block w-3 h-1 mx-1 bg-primary rounded-full"></span>
                    <span className="inline-block w-1 h-1 bg-primary rounded-full"></span>
                </div>
            </div>
            <div>
                <h2 className="text-2xl text-center mb-2">Assignment Difficulty Level</h2>
                <select name='difficulty'
                    id='difficulty' className="p-3 mb-8 w-full border bg-cyan-400 rounded-xl">
                    <option className="text-white" value="Easy">Easy</option>
                    <option className="text-white" value="Medium">Medium</option>
                    <option className="text-white" value="Hard">Hard</option>
                </select>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {
                        assignments
                            .filter(j => j.difficulty === 'Easy')
                            .map(assignment => <AssignmentCard key={assignment._id} assignment={assignment}></AssignmentCard>)
                    }
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {
                        assignments
                            .filter(j => j.difficulty === 'Medium')
                            .map(assignment => <AssignmentCard key={assignment._id} assignment={assignment}></AssignmentCard>)
                    }
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {
                        assignments
                            .filter(j => j.difficulty === 'Hard')
                            .map(assignment => <AssignmentCard key={assignment._id} assignment={assignment}></AssignmentCard>)
                    }
                </div>
            </div>

        </div>
    );
};

export default Assignments;