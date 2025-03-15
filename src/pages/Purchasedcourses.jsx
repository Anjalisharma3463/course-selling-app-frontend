import { useEffect, useState, useContext } from "react";
import { getPurchasedCourses } from "../api";
import { AuthContext } from "../context/AuthContext";

const PurchasedCourses = () => {
  const { user } = useContext(AuthContext);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPurchasedCourses = async () => {
      try {
        const response = await getPurchasedCourses();
        if (response) {
          setCourses(response.data.purchasedCourses || []);
          console.log("response of getpurchase ",response);
          
        }
      } catch (error) {
        console.error("Error fetching purchased courses:", error);
      } finally {
        setLoading(false);
      }
    };

    if (user) fetchPurchasedCourses();
  }, [user]);

  if (loading) return <p className="text-center">Loading...</p>;
  if (courses.length === 0) return <p className="text-center">No purchased courses found.</p>;

  return (
    <div className="grid grid-cols-3 gap-4 p-6">
      {courses.map((course) => (
        <div key={course._id} className="p-4 border rounded-lg bg-[#37538d] text-white shadow-md">
          <h2 className="text-xl font-bold">{course.title}</h2>
          <p>{course.description}</p>
 
          {/* 🟢 Image Fix */}
          <img
            src={`http://localhost:4000${course.image}`}
            alt={course.title}
            className="w-full h-48 object-cover mt-2"
          />
          <button  className="rounded-lg w-full bg-[#101828] mt-5 text-white font-bold p-2" >Watch</button>
        </div>
      ))}
    </div>
  );
};

export default PurchasedCourses;
