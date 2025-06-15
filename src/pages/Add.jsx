import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Navigate, useLocation, useNavigate } from "react-router-dom";

export default function AddEditPage({}) {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get("id");
  const [isEditMode, setIsEditMode] = useState(false);
  const [form, setForm] = useState({
    name: "",
    department: "",
    doj: "",
    address: "",
    gender: "Male",
    hobbies: [],
  });
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (!isLoggedIn) {
      navigate("/signin");
      return;
    }
    if (id) {
      setIsEditMode(true);
      const storedData = JSON.parse(localStorage.getItem("employees")) || [];
      const employee = storedData.find((emp) => emp.id == id);

      if (employee) {
        setForm({
          name: employee.name,
          department: employee.department,
          doj: employee.doj,
          address: employee.address,
          hobbies: employee.hobbies || [],
          gender: employee.gender || "Male",
        });
      }
    }
  }, []);
  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    if (name === "hobbies") {
      setForm((prev) => ({
        ...prev,
        hobbies: checked
          ? [...prev.hobbies, value]
          : prev.hobbies.filter((h) => h !== value),
      }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const toastId = toast.loading("Updating Data...");
    const storedData = JSON.parse(localStorage.getItem("employees")) || [];
    try {
      setTimeout(() => {
        if (isEditMode) {
          const updatedEmployee = {
            id: parseInt(id),
            ...form,
          };

          const updatedData = storedData.map((emp) =>
            emp.id === parseInt(id) ? updatedEmployee : emp
          );

          localStorage.setItem("employees", JSON.stringify(updatedData));
        } else {
          const id = storedData.length + 1;
          const newEmployee = {
            id: id,
            ...form,
          };

          const updatedData = [...storedData, newEmployee];
          localStorage.setItem("employees", JSON.stringify(updatedData));
        }
        toast.success("Data updated successfully", {
          id: toastId,
        });
        navigate("/list", { replace: true });
      }, 2000);
    } catch (error) {
      toast.error("Error updating data");
      console.error("Error updating data:", error);
      return;
    }
  };

  return (
    <div className="min-h-screen bg-[#FCE9B3] p-8 font-sans">
      <div className="bg-black text-white px-6 py-3 font-bold text-lg border-b-8 border-black">
        Add-Edit Page
      </div>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-2 gap-6 max-w-5xl mx-auto mt-8"
      >
        {/* Left column */}
        <div className="col-span-1 space-y-4">
          <div className="flex items-center gap-4">
            <label className="font-semibold w-32 text-right">Name:</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              className="flex-1 border border-black px-2 py-1 shadow-inner bg-white"
              required
            />
          </div>

          <div className="flex items-center gap-4">
            <label className="font-semibold w-32 text-right">Department:</label>
            <select
              name="department"
              value={form.department}
              onChange={handleChange}
              className="flex-1 border border-black px-2 py-1 shadow-inner bg-white"
              required
            >
              <option value="">Select Department</option>
              {["HR", "IT", "Finance", "Marketing"].map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-4">
            <label className="font-semibold w-32 text-right">
              Date of Joining:
            </label>
            <input
              type="date"
              name="doj"
              value={form.doj}
              onChange={handleChange}
              className="flex-1 border border-black px-2 py-1 shadow-inner bg-white"
              required
            />
          </div>

          <div className="flex items-start gap-4">
            <label className="font-semibold w-32 text-right mt-1">
              Hobbies:
            </label>
            <div>
              <div className="text-sm font-semibold mb-1">Selected Hobbies</div>
              {["Reading", "Swimming", "Playing", "Singing"].map((hobby) => (
                <label key={hobby} className="block">
                  <input
                    type="checkbox"
                    name="hobbies"
                    value={hobby}
                    checked={form.hobbies.includes(hobby)}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  {hobby}
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Right column */}
        <div className="col-span-1 flex flex-col  space-y-4">
          <div className="flex items-start gap-4">
            <label className="font-semibold w-24 text-right mt-1">
              Address:
            </label>
            <textarea
              name="address"
              value={form.address}
              onChange={handleChange}
              className="w-full h-[120px] border border-black px-3 py-2 shadow-inner bg-white"
              required
            />
          </div>

          <div className="flex gap-4 mt-4">
            <label className="font-semibold w-24 text-right">Gender:</label>
            <div className="space-x-6">
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="Male"
                  checked={form.gender === "Male"}
                  onChange={handleChange}
                  className="mr-1"
                />
                Male
              </label>
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="Female"
                  checked={form.gender === "Female"}
                  onChange={handleChange}
                  className="mr-1"
                />
                Female
              </label>
            </div>
          </div>
        </div>

        {/* Buttons row */}
        <div className="col-span-3 flex justify-end gap-6 mt-6">
          <button
            type="submit"
            className={`border border-black px-6 py-2 bg-gradient-to-b ${
              isEditMode
                ? "from-blue-100 to-blue-300"
                : "from-green-100 to-green-300 border"
            }  rounded-md shadow-md`}
          >
            {isEditMode ? "Update" : "Save"}
          </button>
          <button
            onClick={() => navigate("/list")}
            type="button"
            className="px-6 py-2 bg-gradient-to-b from-red-100 to-red-300 border border-black rounded-md shadow-md"
          >
            Back
          </button>
        </div>
      </form>
    </div>
  );
}
