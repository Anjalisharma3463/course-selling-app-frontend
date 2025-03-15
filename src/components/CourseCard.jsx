    import { useEffect ,useState } from "react";
    import axios from "axios";
         
    const Courses = () => {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:4000/api/admin/courses")
        .then((response) => {
            console.log("Fetched Courses:", response.data); // Debugging
            setCourses(response.data);
        })
        .catch((error) => console.error("Error fetching courses:", error));
    }, []);

    return (
        <div className="grid grid-cols-1 gap-4">
        {courses.map((course) => (
            <div key={course._id} className="p-4 border rounded-lg bg-[#37538d] text-white shadow-md">
            <h2 className="text-xl font-bold">{course.title}</h2>
            <p>{course.description}</p>
            <p className="text-green-600 bg-white rounded w-fit p-2 m-2 font-semibold">₹{course.price}</p>

            {/* 🟢 Image Fix */}
            <img
                src={`http://localhost:4000${course.image}`}
                alt={course.title}
                className="w-full h-48 object-cover mt-2"
            />
            <button  className="rounded-lg w-full bg-[#101828] mt-5 text-white font-bold p-2" >Buy</button>
            </div>
        ))}
        </div>
    );
    };

    export default Courses;
