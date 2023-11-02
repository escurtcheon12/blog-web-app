import React, { useEffect } from "react";
import "../../assets/css/about.css";

const About = ({Navbar, Footer}) => {
  useEffect(() => {
    localStorage.removeItem("dataBlog");
    localStorage.clear();
  }, []);

  return (
    <>
       
      <section>
      {Navbar}

        <div className="container_about text-center">
          <h1 className="header_about">About</h1>
          <div className="line_br mt-3 mb-4"></div>
          <p className="p_about">
            This website have purpose to sharing information through my
            persepective while iam considering something and also sharing some
            my experiences which is in past for this i hope you guys can be
            satisfied and can get benefit from this website
          </p>
        </div>

        
      </section>
      {Footer}
    </>
  );
};

export default About;
