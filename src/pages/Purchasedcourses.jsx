import { useEffect, useState, useContext } from "react";
import { getPurchasedCourses, getAdminCreatedCourse } from "../api";
import { AuthContext } from "../context/AuthContext";
import { motion } from "motion/react";

const PurchasedCourses = () => {
  const { user } = useContext(AuthContext);
  const [courses, setCourses] = useState([]);  // ✅ Initialize as empty array
  const [loading, setLoading] = useState(true);

 
  useEffect(() => {
    const fetchCourses = async () => {
      if (!user) return;

      setLoading(true);
      try {
        let response = null;
        const token = localStorage.getItem("token"); // Get token

        if (user.role === "student") {
          response = await getPurchasedCourses();
        } else if (user.role === "admin" ) {
          response = await getAdminCreatedCourse(token);
        }

        if (response?.data) {
          setCourses(user.role === "admin" ? response.data.adminCourses || [] : response.data.purchasedCourses || []);
         }
      } catch (error) {
        console.error("Error fetching courses:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [user]);

  if (loading) return <p className="text-center">Loading...</p>;

  if (!courses || courses.length === 0)
    return (
      <p className="text-center">
        {user.role === "admin" ? "No created courses found." : "No purchased courses found."}
      </p>
    );

  return (
    <>
      <p className="font-bold">Hello, {user.username}</p>
      <p className="font-bold">Here are your {user.role === "admin" ? "Created" : "Purchased"} Courses...</p>

      <div className="grid grid-cols-3 gap-4 p-6">
        {courses.map((course) => (
          <motion.div
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.8 }}
            key={course._id}
            className="p-4 border rounded-lg bg-[#37538d] text-white shadow-md"
          >
            <h2 className="text-xl font-bold">{course.title}</h2>
            <p>{course.description}</p>

            <img
              src={course.image.startsWith("http") ? course.image : `${import.meta.env.VITE_BACKEND_URL}${course.image}`}
              alt={course.title}
              className="w-full h-fit object-cover rounded-md"
            />
            <button className="rounded-lg w-full bg-[#101828] mt-5 text-white font-bold p-2">Watch</button>
          </motion.div>
        ))}
      </div>
    </>
  );
};

export default PurchasedCourses;
