import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const dummyData = [
  {
    id: 1,
    name: "Alice",
    department: "HR",
    doj: "2023-01-10",
    address: "USA",
    gender: "Male",
    hobbies: ["Reading", "Playing"],
  },
  {
    id: 2,
    name: "Bob",
    department: "IT",
    doj: "2022-09-15",
    address: "USA",
    gender: "Male",
    hobbies: ["Reading", "Singing"],
  },
  {
    id: 3,
    name: "Charlie",
    department: "Finance",
    doj: "2021-06-25",
    address: "USA",
    gender: "Male",
    hobbies: ["Reading", "Playing"],
  },
];

export default function ListPage() {
  const [search, setSearch] = useState("");
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (!isLoggedIn) {
      navigate("/signin");
      return;
    }
    const stored = localStorage.getItem("employees");
    if (stored) {
      setEmployees(JSON.parse(stored));
    } else {
      setEmployees(dummyData);
      localStorage.setItem("employees", JSON.stringify(dummyData));
    }
  }, [location]);

  const filtered = employees.filter(
    (item) =>
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.department.toLowerCase().includes(search.toLowerCase())
  );
  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this employee?"
    );
    if (!confirmDelete) return;

    const stored = JSON.parse(localStorage.getItem("employees")) || [];
    const updated = stored.filter((emp) => emp.id !== id);
    localStorage.setItem("employees", JSON.stringify(updated));
    setEmployees(updated);
  };

  return (
    <div className="min-h-screen bg-[#FCE9B3] p-8 text-sm font-sans">
      <div className="border-b-8 border-black px-6 py-4 font-bold text-lg bg-black text-white">
        Employee Records
      </div>
      <div className="flex justify-between items-center mt-6 mb-4">
        <input
          type="text"
          placeholder="Search by name or department..."
          className="px-3 py-2 w-96 bg-white border border-black rounded shadow-inner"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          onClick={() => navigate("/add-edit")}
          className="px-4 py-2 bg-gradient-to-b from-green-100 to-green-300 border border-black rounded-md shadow-md"
        >
          Add New
        </button>
      </div>

      <table className="w-full table-auto border border-black">
        <thead className="bg-yellow-200">
          <tr>
            <th className="border border-black px-3 py-2 text-left">Name</th>
            <th className="border border-black px-3 py-2 text-left">
              Department
            </th>
            <th className="border border-black px-3 py-2 text-left">
              Date of Joining
            </th>
            <th className="border border-black px-3 py-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((emp) => (
            <tr key={emp.id} className="hover:bg-yellow-100 transition-colors">
              <td className="border border-black px-3 py-2">{emp.name}</td>
              <td className="border border-black px-3 py-2">
                {emp.department}
              </td>
              <td className="border border-black px-3 py-2">{emp.doj}</td>
              <td className="border border-black px-3 py-2 space-x-2">
                <button className="text-blue-700 underline">View</button>
                <button
                  className="text-green-700 underline"
                  onClick={() => {
                    navigate(`/add-edit?id=${emp.id}`);
                  }}
                >
                  Edit
                </button>
                <button
                  className="text-red-700 underline"
                  onClick={() => {
                    handleDelete(emp.id);
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
