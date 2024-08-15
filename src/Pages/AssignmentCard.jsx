

const AssignmentCard = ({ assignment }) => {
    const { dueDate, title, imageUrl, marks, description, difficulty } = assignment;
    return (
        <div className="card bg-slate-50 text-slate-900 w-full border  shadow-xl">
            <figure className="px-10 pt-10">
                <img
                    src={imageUrl}
                    className="rounded-xl h-[300px]" />
            </figure>
            <div className="card-body ">
                <h2 className="card-title">{title}</h2>
                <p>{description}</p>
                <p>Difficulty Level: {difficulty}</p>
                <div className="flex  gap-28">
                    <p>Marks: {marks}</p>
                    <p>Due Date: {new Date(dueDate).toLocaleDateString()}</p>
                </div>
                <div className=" flex w-full gap-2 justify-between">
                    <button className="btn hover:bg-teal-600 bg-cyan-400 text-white w-1/2">Delete</button>
                    <button className="btn hover:bg-teal-600 w-1/2 bg-cyan-400 text-white">Update</button>
                </div>
                <div className=" w-full">
                    <button className="btn w-full hover:bg-teal-600 bg-cyan-400 text-white">View Details</button>
                </div>
            </div>
        </div>
    );
};

export default AssignmentCard;