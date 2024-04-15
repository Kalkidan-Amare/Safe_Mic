import React, { useEffect, useState } from "react";
import { delete_user } from "../../actions/auth";
import { connect } from "react-redux";
import { logout } from "../../actions/auth";
import { FiLogOut } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import { NavLink, useNavigate } from "react-router-dom";

const MyProfile = ({ user, delete_user, logout }) => {
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user) {
      setIsLoading(false);
    }
  }, [user]);

  const log_out = () => {
    logout();
    navigate("/");
  }

  return (
    <div className="flex justify-center items-center rounded md p8 m-20 sm:w-[80%]  mx-auto">
      <div className="flex bg-accent border-slate-500 rounded pt-10 pl-20 pr-40 pb-32 shadow-lg text-sm/[40px] sm:w-full ">
        <form action="" className="w-full">
          <h1 className="text-[32px] pb-10 pt-12  text-center">My Account</h1>
          <div className="text-[18px] pb-12 text-medium">
            <p>User Name : {isLoading ? "" : user.name}</p>
            <p>Email : {isLoading ? "" : user.email}</p>
          </div>
          <div className="border-t border-primary my-4"></div>

          <div className="flex space-x-10 space-y- text-[18px] my-12">
            <Button
              type="submit"
              className="h-12 w-60 object-cover rounded-full py- transition-colors duration-200"
            >
              <NavLink to="/reset-password">
              Reset Password

              </NavLink>
            </Button>
            <Button onClick={log_out} className="h-12 w-60 object-cover rounded-full py- transition-colors duration-200">
              <FiLogOut className="mx-2" /> Logout
            </Button>

            
          </div>
          <div className="m-4">
          </div>
        </form>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps, { delete_user, logout })(MyProfile);
