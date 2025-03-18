import { useContext, useState } from "react";
import { purchaseCourse } from "../api"; 
import { AuthContext } from "../context/AuthContext";
import { motion } from "motion/react"

const CourseCard = ({ course }) => {
  const { user } = useContext(AuthContext);  
  const [isPurchased, setIsPurchased] = useState(
    user?.purchasedCourses?.includes(course._id) || false
  );

  const handlePurchase = async () => {
    if (!user) {
      alert("❌ Please log in to purchase a course.");
      return;
    }

    try {
      await purchaseCourse(course._id);
      setIsPurchased(true);  
      alert("✅ Course purchased successfully!");
    } catch (error) {
      alert(error.response?.data?.message || "❌ Purchase failed.");
    }
  };


  
  return (

<motion.div 
whileHover={{ scale: 1.2 }}
whileTap={{ scale: 0.8 }}
className="p-4 border rounded-lg bg-[#37538d] text-white shadow-md">
      <h2 className="text-xl font-bold">{course.title}</h2>
      <p>{course.description}</p>
      <p className="text-green-600 bg-white rounded w-fit p-2 m-2 font-semibold">₹{course.price}</p>

      <img 
  src={course.image.startsWith("http") ? course.image : `${import.meta.env.VITE_BACKEND_URL}${course.image}`} 
  alt={course.title} 
  className="w-full h-fit object-cover rounded-md" 
/>

      <button
        className={`rounded-lg w-full mt-5 font-bold p-2 ${
          isPurchased ? "bg-gray-400 cursor-not-allowed" : "bg-[#101828] text-white"
        }`}
        onClick={handlePurchase}
        disabled={isPurchased}
      >
        {isPurchased ? "✔ Purchased" : "Buy"}
      </button>
    </motion.div>
  );
};

export default CourseCard;
