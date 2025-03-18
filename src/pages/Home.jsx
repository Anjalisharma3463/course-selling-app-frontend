import { useEffect, useState } from "react";
import { getCourses } from "../api";
import CourseCard from "../components/CourseCard";
 const Home = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses 
    = async () => {
      try {
        const res = await getCourses(); 
         setCourses(res.data || []);  
      } catch (err) {
        console.error("Error fetching courses:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (loading) return <p>Loading courses...</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Available Courses</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {courses.length > 0 ? (
          courses.map((course) => <CourseCard key={course._id} course={course} />)
        ) : (
          <p>No courses available.</p>
        )}
      </div>
    </div>
  );
};

export default Home;
