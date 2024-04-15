import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Card,CardContent, CardDescription, CardHeader } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { FaArrowRight } from "react-icons/fa";
import API_URL from "@/url";

const AuthCounselor = () => {
  const [errorStatus, setErrorStatus] = useState(0);
  const navigate = useNavigate();
  const [verified, setVerified] = useState(false);
  const [formData, setFormData] = useState({
    bio: "",
    languages: "",
    specialities: "",
    years_of_experience: 0,
  });
  const [gender, setGender] = useState("");

  const { bio, languages, specialities, years_of_experience } = formData;
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    submitProfile();
    setErrorStatus(0);
  };

  const submitProfile = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${localStorage.getItem("access")}`,
        Accept: "application/json",
      },
    };

    const body = JSON.stringify({ bio, languages, specialities, gender, years_of_experience});

    try {
      const res = await axios.post(
        `${API_URL}/counselor/counselor-profile/`,
        body,
        config
      );
      console.log(res);
    } catch (err) {
      console.log(err);
      setErrorStatus(err.response.status);
    }
  };

  useEffect(() => {
    getProfile();
    // getVerifiedCounselors();
  }, []);

  if (verified) {
    navigate("/counselor/landing-page");
  }

  const getProfile = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${localStorage.getItem("access")}`,
        Accept: "application/json",
      },
    };

    try {
      const res = await axios.get(
        `${API_URL}/counselor/counselor-profile/`,
        config
      );
      console.log(res);
      setVerified(res.data.verified);
    } catch (err) {
      console.log(err);
      setErrorStatus(err.response.status);
    }
  };
  const getVerifiedCounselors = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${localStorage.getItem("access")}`,
        Accept: "application/json",
      },
    };

    try {
      const res = await axios.get(
        `${API_URL}/counselor/counselors/`,
        config
      );
      console.log("Counselors");
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };
  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };

  return (
    <div className="mt-28 mx-16">
      
        {errorStatus == 500 ? (
        <Card className={cn('py-4 px-2')}>
          <CardHeader>
            Enter your profile detail

          </CardHeader>
          <CardContent>
            
          <form onSubmit={(e) => onSubmit(e)} className='flex flex-col gap-4'>
            <Label>Bio</Label>
            <Textarea onChange={(e) => onChange(e)} value={bio} name="bio" placeholder="bio"/>
            <Label>Languages</Label>
            <Input
              onChange={(e) => onChange(e)}
              value={languages}
              name="languages"
              placeholder="English,..."
              ></Input>
            <Label>Specialities</Label>
            <Input
              onChange={(e) => onChange(e)}
              value={specialities}
              name="specialities"
              placeholder="specialities..."
            ></Input>
            <div className="flex gap-12">
              Gender:
              <span>
              <Label>
              <input
                
                className='aspect-square w-4 mx-2'
                type="radio"
                value="male"
                checked={gender === "male"}
                onChange={handleGenderChange}
                />Male
              </Label>
            
              </span>
              <span>
              <Label htmlFor="">
                
              <input
                className='aspect-square w-4 mx-2'
                type="radio"
                value="female"
                checked={gender === "female"}
                onChange={handleGenderChange}
                />
                Female</Label>
              </span>
            </div>
            <Label className={cn()}>Years of experience:</Label>
            <Input type='number' min='0' className={cn('w-8/12')} onChange={(e) => onChange(e)}/>
            <Button type="submit" className=' font-semibold w-fit'>Submit</Button>
          </form>
        </CardContent>
        </Card>
        ) : verified ? (
          "Verified"
        ) : (
          <div className="grid grid-cols-2 gap-24 font-bold w-8/12 text-3xl pt-24 mx-24"> 
          <p>
          Your Account is not verified by the Admin yet.
          </p>
          <button className=" flex items-center border-solid my-4 
                        border-foreground border-2 
                        h-fit font-medium text-lg
                        w-fit
                        rounded-3xl px-4 p-1 hover:font-semibold 
                        hover:px-8 transition-all ease-in-out duration-300"
                        onClick={()=>{
                          navigate("/")
                        }}
                        >
            <p className="mr-4">
              HomePage
            </p>
              <FaArrowRight/>
        </button>
          </div>
        )}
      
    </div>
  );
};

export default AuthCounselor;
