import { useEffect, useState, useContext } from "react";
import { getCourses, createCourse } from "../api";
import { AuthProvider } from "../context/AuthContext";

const AdminDashboard = () => {
  const { user } = useContext(AuthProvider);
  const [courses, setCourses] = useState([]);
  const [newCourse, setNewCourse] = useState({
    title: "",
    description: "",
    price: "",
    image: null,
  });

  useEffect(() => {
    getCourses()
      .then((res) => setCourses(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleFileChange = (e) => {
    setNewCourse({ ...newCourse, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user || user.role !== "admin") {
      alert("Unauthorized");
      return;
    }

    const formData = new FormData();
    formData.append("title", newCourse.title);
    formData.append("description", newCourse.description);
    formData.append("price", newCourse.price);
    formData.append("image", newCourse.image);

    try {
      await createCourse(formData, user.token);
      alert("Course added successfully!");
      window.location.reload(); // Refresh to update course list
    } catch (err) {
      alert("Error adding course");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold">Admin Dashboard</h2>

      {/* Create Course Form */}
      <div className="bg-white shadow-md p-4 rounded-lg mt-4">
        <h3 className="text-xl font-bold">Add New Course</h3>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            placeholder="Title"
            className="w-full p-2 border rounded"
            onChange={(e) => setNewCourse({ ...newCourse, title: e.target.value })}
            required
          />
          <textarea
            placeholder="Description"
            className="w-full p-2 border rounded"
            onChange={(e) => setNewCourse({ ...newCourse, description: e.target.value })}
            required
          ></textarea>
          <input
            type="number"
            placeholder="Price"
            className="w-full p-2 border rounded"
            onChange={(e) => setNewCourse({ ...newCourse, price: e.target.value })}
            required
          />
          <input
            type="file"
            className="w-full p-2 border rounded"
            onChange={handleFileChange}
            required
          />
          <button className="bg-blue-500 w-full p-2 text-white rounded">
            Add Course
          </button> 
        </form>
      </div>

      {/* Course List */}
      <h3 className="text-xl font-bold mt-6">Existing Courses</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4   mt-4">
        {courses.map((course) => (
          <div key={course._id} className="bg-white shadow-md p-4 rounded-lg">
            <img src={`http://localhost:4000${course.image}`} alt={course.title} className="w-full h-fit object-cover rounded-md" />
            <h3 className="text-lg font-bold mt-2">{course.title}</h3>
            <p className="text-gray-600">{course.description}</p>
            <p className="text-blue-500 font-bold mt-2">₹{course.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
