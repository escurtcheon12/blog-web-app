import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  About,
  Blogs,
  PreviewBlog,
  Contact,
  Home,
  Login,
  Navbar,
  Footer,
} from "../../components/index";
import axios from "axios";

const Routers = () => {
  const [dataCategories, setDataCategories] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3006/categories")
      .then((res) => {
        setDataCategories(res.data.data);  
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<Home Navbar={<Navbar />} Footer={<Footer Categories={dataCategories} />} />} />
          <Route exact path="/about" element={<About Navbar={<Navbar />} Footer={<Footer Categories={dataCategories} />} />} />
          <Route exact path="/contact" element={<Contact Navbar={<Navbar />} Footer={<Footer Categories={dataCategories} />} />} />
          <Route exact path="/blog" element={<Blogs Navbar={<Navbar />} Footer={<Footer Categories={dataCategories} />} />} />
          <Route exact path="/previewBlog" element={<PreviewBlog Navbar={<Navbar />} Footer={<Footer Categories={dataCategories} />} />} />
          <Route exact path="/login" element={<Login />} />
        </Routes>
      </Router>
    </>
  );
};

export default Routers;
