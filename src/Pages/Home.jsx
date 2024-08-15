
import { useEffect, useState } from "react";
import BannerSection from "../Components/BannerSection";
import FAQ from "../Components/FAQ";
import AssignmentCard from "./AssignmentCard";
import axios from "axios";
import { Link } from "react-router-dom";


const Home = () => {
    const [assignments, setAssignments] = useState([])
    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_URL}/assignments`, { withCredentials: true })
            .then(res => {
                setAssignments(res.data);
            })
    }, [])
    return (
        <div className=" py-24 ">
            <div >
                <BannerSection></BannerSection>
            </div>
            <div>
                <div className="pt-24">
                    <div className="pb-10">
                        <h1 className="text-2xl font-semibold text-center text-cyan-400 capitalize lg:text-3xl">
                            Featured Assignments
                        </h1>

                        <div className="flex justify-center mx-auto mt-6">
                            <span className="inline-block w-40 h-1 bg-primary rounded-full"></span>
                            <span className="inline-block w-3 h-1 mx-1 bg-primary rounded-full"></span>
                            <span className="inline-block w-1 h-1 bg-primary rounded-full"></span>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {
                            assignments.map(assignment => <AssignmentCard key={assignment._id} assignment={assignment}></AssignmentCard>)
                        }
                    </div>
                    
                </div>
            </div>
            <div>
                <FAQ></FAQ>
            </div>
        </div>
    );
};

export default Home;