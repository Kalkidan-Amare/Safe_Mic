import React, { Fragment, useEffect, useState } from "react";
import logo from "/Images/safemic.png";

import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../../actions/auth";
import Selector from "../ThemeSelector/Selector";
import { Outlet } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import DrawerComp from "../Customization/DrawerComp";
import { useContext } from "react";
import { themeContext } from "@/App";
import axios from "axios";
import API_URL from "@/url";
const Navbar = ({ user, logout, isAuthenticated }) => {
  const [lastScrollTop, setLastScrollTop] = useState(0);
  const [isScrolledDown, setIsScrolledDown] = useState(false);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (user) {
      fetchUserData();
    }
  }, [user]);

  const fetchUserData = async () => {
    if (localStorage.getItem("access")) {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `JWT ${localStorage.getItem("access")}`,
          Accept: "application/json",
        },
      };

      try {
        const res = await axios.get(`${API_URL}/all/users/${user.id}`, config);
        setUserData(res.data);
      } catch (err) {
        console.log(err);
      }
    } else {
      console.log("invalid token");
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;

      setIsScrolledDown(scrollTop > lastScrollTop);
      setLastScrollTop(scrollTop);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollTop]);
  const guestLinks = () => (
    <div className="z-0">
      <header
        className={` flex bg-background justify-evenly items-center w-full px-8 py-4 fixed top-0 z-10 ${
          isScrolledDown ? "-translate-y-full" : "translate-y-0"
        } `}
      >
        <p className="flex items-center">
          <img
            className="aspect-square w-12 mx-2"
            src={logo}
            alt="safemic logo"
          />{" "}
          Safe Mic
        </p>
        <div className="w-2/3 flex justify-evenly">
          <div>
            <NavLink
              to="/"
              className="font-semibold px-4 hover:border-b-2 border-primary focus:border-b-2"
            >
              Home
            </NavLink>
            <NavLink
              to="/counseling"
              className="font-semibold px-4 hover:border-b-2 border-primary focus:border-b-2"
            >
              Counseling
            </NavLink>
            <NavLink
              to="/complaint"
              className="font-semibold px-4 hover:border-b-2 border-primary focus:border-b-2"
            >
              Complaint
            </NavLink>
          </div>

          <div>
            <NavLink
              to="/login"
              className="rounded-3xl border-2 px-5 p-2 font-bold hover:bg-primary hover:text-secondary duration-300 transition-all"
            >
              Login
            </NavLink>
          </div>
        </div>
      </header>
    </div>
  );
  const authLinks = () => (
    <div className="z-0">
      <header
        className={` flex bg-background items-center justify-evenly w-full px-8 py-1 fixed top-0 z-10 ${
          isScrolledDown ? "-translate-y-full" : "translate-y-0"
        } `}
      >
        <p className="flex items-center">
          <img
            className="aspect-square w-12 mx-2"
            src={logo}
            alt="safemic logo"
          />{" "}
          Safe Mic
        </p>
        <div className="w-2/3 flex justify-around">
          <div>
            <NavLink
              to="/"
              className="font-semibold px-4 hover:border-b-2 border-primary focus:border-b-2"
            >
              Home
            </NavLink>
            <NavLink
              to="/counseling"
              className="font-semibold px-4 hover:border-b-2 border-primary focus:border-b-2"
            >
              Counseling
            </NavLink>
            <NavLink
              to="/oneToOneChat"
              className="font-semibold px-4 hover:border-b-2 border-primary focus:border-b-2"
            >
              Chat
            </NavLink>
            <NavLink
              to="/complaint"
              className="font-semibold px-4 hover:border-b-2 border-primary focus:border-b-2"
            >
              Complaint
            </NavLink>
            <NavLink
              to="/appointment"
              className="font-semibold px-4 hover:border-b-2 border-primary focus:border-b-2"
            >
              Appointment
            </NavLink>
          </div>
          <div className="px-4 flex justify-end  hover:border-b-2 border-primary focus:border-b-2">
            <DrawerComp />
          </div>
        </div>
      </header>
    </div>
  );
  const counselorLinks = () => (
    <div className="z-0">
      <header
        className={` flex bg-background items-center justify-evenly w-full px-8 py-1 fixed top-0 z-10 ${
          isScrolledDown ? "-translate-y-full" : "translate-y-0"
        } `}
      >
        <p className="flex items-center">
          <img
            className="aspect-square w-12 mx-2"
            src={logo}
            alt="safemic logo"
          />{" "}
          Safe Mic
        </p>
        <div className="w-2/3 flex justify-evenly">
          <div>
            <NavLink
              to="/counselor/landing-page"
              className="font-semibold px-4 hover:border-b-2 border-primary focus:border-b-2"
            >
              Home
            </NavLink>
            <NavLink
              to="/counselor/all-appointments"
              className="font-semibold px-4 hover:border-b-2 border-primary focus:border-b-2"
            >
              Appointment
            </NavLink>
            <NavLink
              to="/oneToOneChat"
              className="font-semibold px-4 hover:border-b-2 border-primary focus:border-b-2"
            >
              Chat
            </NavLink>
          </div>

          <div className="px-4 flex justify-end  hover:border-b-2 border-primary focus:border-b-2">
            <DrawerComp />
          </div>
        </div>
      </header>
    </div>
  );
  const adminLinks = () => (
    <div className="z-0">
      <header
        className={` flex bg-background items-center justify-evenly w-full px-8 py-1 fixed top-0 z-10 ${
          isScrolledDown ? "-translate-y-full" : "translate-y-0"
        } `}
      >
        <p className="flex items-center">
          <img
            className="aspect-square w-12 mx-2"
            src={logo}
            alt="safemic logo"
          />{" "}
          Safe Mic
        </p>
        <div className="w-2/3 flex justify-evenly">
          <div>
            <NavLink
              to="/"
              className="font-semibold px-4 hover:border-b-2 border-primary focus:border-b-2"
            >
              Home
            </NavLink>
            <NavLink
              to="/complaints"
              className="font-semibold px-4 hover:border-b-2 border-primary focus:border-b-2"
            >
              Complaints
            </NavLink>
          </div>

          <div className="px-4 flex justify-end  hover:border-b-2 border-primary focus:border-b-2">
            <DrawerComp />
          </div>
        </div>
      </header>
    </div>
  );

  const links = () => {
    if (isAuthenticated) {
      if (userData) {
        if (userData.is_student) {
          return authLinks();
        } else if (userData.is_staff) {
          return adminLinks();
        } else {
          return counselorLinks();
        }
      }
    } else {
      return guestLinks();
    }
  };

  return (
    // <div className={`flex justify-between p-6 bg-gray-50 fixed w-full`}>
    //   <div>
    //     <div>Mic</div>
    //   </div>
    <>
      {links()}
      <main>
        <Outlet />
      </main>
    </>
    // </div>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
});

export default connect(mapStateToProps, { logout })(Navbar);
