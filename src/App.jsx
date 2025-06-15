import { Route, Routes, useLocation } from "react-router-dom";
import {useEffect} from "react";
import SigninPage from "./pages/SigninPage";
import ListPage from "./pages/ListPage";
import Add from "./pages/Add";

const App = () => {
useEffect(()=>{
alert("Please use username: admin, and password: admin123")
},[])
  const location = useLocation();

  return (
    <Routes>
      <Route path="/" element={<SigninPage />} />
      <Route path="/signin" element={<SigninPage />} />
      <Route path="/list" element={<ListPage />} />
      <Route path="/add-edit" element={<Add />} />
    </Routes>
  );
};

export default App;
