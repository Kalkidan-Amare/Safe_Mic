import { Button } from "@/components/ui/button";
import React from "react";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";

function GetCons({ isAuthenticated }) {
  return (
    <div className="flex flex-col items-center justify-center py-24">
      <motion.p
        className=" font-sans text-center"
        initial={{
          opacity: 0,
          y: 150,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
      >
        <p className="text-3xl m-8 font-medium text-center max-md:mt-10">
          Our team is ready to help!
        </p>
        <NavLink to={isAuthenticated ? "/counseling" : "/login"}>
          <Button>Get Counseling</Button>
        </NavLink>
      </motion.p>
    </div>
  );
}

export default GetCons;
