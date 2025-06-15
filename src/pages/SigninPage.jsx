import { useState } from "react";
import toast from "react-hot-toast";
import { CORRECT_USERNAME, CORRECT_PASSWORD } from "../../config";
import { useNavigate } from "react-router-dom";
export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!username || !password) {
      toast.error("Username and password are required");
      return;
    }

    const toastId = toast.loading("Checking credentials...");

    setTimeout(() => {
      if (username === CORRECT_USERNAME && password === CORRECT_PASSWORD) {
        localStorage.setItem("isLoggedIn", "true");

        toast.success("Login successful!", {
          id: toastId,
        });
        navigate("/list");
      } else {
        toast.error("Invalid username or password", {
          id: toastId,
        });
      }
    }, 2000);
  };

  return (
    <>
      <div className="h-screen bg-[#FCE9B3]/60 font-sans text-sm flex flex-col justify-center items-center">
        <div className="space-y-6 max-w-md mx-auto w-[350px] p-6 border border-black shadow-lg bg-[#FCE9B3] rounded-md hover:shadow-black/30 transition-all duration-200 ease-in-out ">
          <div className="w-full text-center p-2 text-lg  bg-black/80 rounded-md text-white font-semibold">
            Login Form
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block mb-1 font-semibold">Username:</label>
              <input
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
                type="text"
                className="w-full border border-black px-3 py-2 rounded shadow-inner bg-white"
                placeholder="Enter your username"
              />
            </div>

            <div>
              <label className="block mb-1 font-semibold">Password:</label>
              <input
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                type="password"
                className="w-full border border-black px-3 py-2 rounded shadow-inner bg-white"
                placeholder="Enter your password"
              />
            </div>

            <div className="flex gap-4 justify-center pt-2">
              <button
                type="submit"
                className="cursor-pointer px-6 py-2 bg-gradient-to-b from-blue-200 to-blue-400 border border-black rounded-md shadow-md active:translate-y-[2px]"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
