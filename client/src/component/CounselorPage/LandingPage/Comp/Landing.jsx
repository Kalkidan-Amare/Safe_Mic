import * as React from "react";
import { Link, NavLink } from 'react-router-dom';
import { BrowserRouter as Route } from 'react-router-dom'
import Tablecon from "./Tablecon";
import { Button } from "@/components/ui/button";
function Landing() {
  return (
    <div className="flex flex-col pr-1.5">
            <div className="flex flex-col items-start mt-56 ml-32 max-w-full font-semibold w-[600px] max-md:mt-10">
        <div className="self-stretch text-5xl font-bold bg-clip-text max-md:max-w-full max-md:text-4xl">
          Welcome Back
        </div>
        <div className="mt-64 ml-2.5 text-4xl max-md:mt-10">
          Today’s appointments
        </div>
        <div className="flex flex-col mt-16 ml-2.5 max-w-full text-xs leading-4 rounded w-[496px] max-md:mt-10">
         <Tablecon/>
        </div>
        <NavLink to="/counselor/all-appointments" className="p-4 py-8">
        <Button className="">
          All appointments
        </Button>

        </NavLink>
        <div className="mt-40 ml-2.5 text-3xl font-medium leading-10 max-md:mt-10">
          See who have messaged you
        </div>
        
        <div className="flex gap-4 p-8">

        <Link to='/oneToOneChat'>
          <Button className="">
            Go to Discussion
          </Button>
          </Link>
          <Link to='/oneToOneChat'>
          <Button className="">
            Chat with a student
          </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}


export default Landing