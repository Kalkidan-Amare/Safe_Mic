import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useNavigate } from "react-router-dom";
import API_URL from "@/url";
import { connect } from "react-redux";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const ChooseCounselor = ({user}) => {
  const navigate = useNavigate();
  const [counselers, setCounselers] = useState([]);
  useEffect(() => {
    getVerifiedCounselors();
  }, []);

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
      setCounselers(res.data);
    } catch (err) {}
  };


  const handleClick = (counselor) => {
    const roomName = "c" + counselor.otherId + "s" + user.id;
    console.log(roomName);
    if(typeof roomName === 'string'){
      console.log("string");
    }
    navigate(`/oneToOneChat/${roomName}`);
  }

  const goToAppointment = () => {
    navigate(`/appointment`)
  }

  return (
    <div className="flex items-center justify-center">

    <div className="md:w-[80%]">
      <h1 className="flex justify-center mt-28 p-8 font-semibold text-2xl">
        Select a Counselor you want to chat with
      </h1>
      <div className="flex justify-center flex-wrap">
        {counselers.map((counselor, index) => (
          <Card key={index} className="bg-gray-200 flex flex-col rounded-lg m-5 lg:w-4/12 md:w-1/3 sm:w-1/2 w-[80%] hover:bg-gray-300">
            <CardHeader className="p-6">
              
              <p>{counselor.username}</p>
            </CardHeader>
            <CardContent className="h-36 overflow-y-scroll">
              <CardDescription>Bio</CardDescription>
              <p>{counselor.bio}</p>
            </CardContent>
            <CardFooter className="flex flex-col justify-start h-48" class={cn(' p-6 flex flex-col justify-start')}>
              <div className="flex">
              <CardDescription>Specialities</CardDescription>
              <p className="pl-4">{counselor.specialities}</p>
              </div>
              <div className="flex">
              <CardDescription>Languages</CardDescription>
              <p className="pl-4">{counselor.languages}</p>

              </div>
              <div className="flex py-4 gap-3">
             <Button  onClick={() => handleClick(counselor)} variant="outline">Chat</Button>
             <Button onClick={() => goToAppointment()}>Schedule Appointment</Button>

              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
</div>
  );
}

const mapStateToProps = (state) => ({
  user: state.auth.user
});

export default connect(mapStateToProps)(ChooseCounselor);
