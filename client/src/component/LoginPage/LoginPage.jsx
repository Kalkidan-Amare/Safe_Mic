import React, { useEffect, useState } from "react";
import { MdOutlineMail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { Link, NavLink, useNavigate, useParams } from "react-router-dom";
import { connect } from "react-redux";
import { login } from "../../actions/auth";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
const LoginPage = ({ user, login, isAuthenticated, error }) => {
  const navigate = useNavigate();
  const [is_student, setIs_student] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { verified } = useParams();
  console.log(verified);

  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    login(email, password);
  };


  useEffect(() => {
    if (isAuthenticated) {
      if(user){
        if (user.is_student) {
          navigate("/");
        } else {
          navigate("/authCounselor");
        }
        console.log(user);

      }
    }
    if(error){
      setIsLoading(false);
    }
  });

  
  return (
    <div className="flex justify-center items-center rounded md my-2 w-full flex-col">
      {verified == "notverified"? (
        <div className="w-full p-4 bg-purple-300 text-blue-950 ">
          An Activation link has been sent to your email, Please activate your
          account by clicking the link inorder to be able to login.
        </div>
      ) : (
        ""
      )}
      {verified == "verified"? (
        <div className="w-full p-4 bg-purple-300 text-blue-950 ">
          You have successfully activated your account, you can now login
        </div>
      ) : (
        ""
      )}
      <div className="flex bg-accent border-slate-500 rounded-lg pt-20 pl-5 pr-5 pb-32 shadow-lg bg-opacity-50 text-sm/[40px] xl:w-[40%] xl:min-w-[600px] w-[100%] sm:w-[80%] my-12">
        <form
          onSubmit={(e) => onSubmit(e)}
          className="mx-auto sm:w-[60%] w-[80%]"
        >
          <h1 className="text-[32px] pb-10 text-center">Your Account</h1>
          <div className="relative mt-10 flex text-[18px] flex-wrap flex-col">
            <label htmlFor="" className="w-[110px] font-medium">
              Email
            </label>
            <Input
              type="email"
              className="mt-1 block w-full  xl:w-[100%] px-3 py-2 border b rounded-md text-sm shadow-sm"
              placeholder="Email"
              name="email"
              value={email}
              onChange={(e) => onChange(e)}
              required
            />
            <MdOutlineMail className="absolute top-4 right-4" />
          </div>
          <div className="relative my-7 flex flex-wrap text-[18px] flex-col">
            <label htmlFor="" className="w-[110px] font-medium">
              {" "}
              Password
            </label>
            <Input
              type="password"
              className=" mt-1 block xl:w-[100%] w-full px-3 py-2 border rounded-md text-sm shadow-sm"
              placeholder="password"
              name="password"
              value={password}
              onChange={(e) => onChange(e)}
              required
            />
            <RiLockPasswordLine className="absolute top-4 right-4" />
          </div>

          <div className="flex gap-4 text-[18px] align-middle py-3 flex-col">
            <div className=" italic text-red-500 text-lg ">
              {error ? error.detail : ""}
            </div>
            
            {isLoading? <Button disabled className=" bg-muted-foreground text-muted">
                <Loader2 className="mr-2 h-4 w-4 animate-spin"/>
                Please wait
              </Button>:<Button
              type="submit"
              className="w-full rounded-lg bg-muted-foreground text-muted py-1 transition-colors duration-200 font-medium"
            >
              Login
            </Button>}

              
            <div className="w-full text-primary text-right mr-4 font-medium">
              <NavLink to="/reset-password">Forgot Password?</NavLink>
            </div>
          </div>
          <div className="text-lg py-8 font-medium">
            <p>
              {" "}
              New to Safe Mic?{" "}
              <NavLink to="/signup" className="text-primary sm:mx-3">
                Create Account
              </NavLink>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.auth.error,
  user: state.auth.user,
});

export default connect(mapStateToProps, { login })(LoginPage);
