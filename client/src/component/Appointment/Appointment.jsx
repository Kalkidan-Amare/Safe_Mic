"use client";
import Datepicker from "./InputBlocks/Datepicker";
import TimeSetter from "./InputBlocks/TimeSetter";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { createContext } from "react";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import API_URL from "@/url";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { NavLink } from "react-router-dom";
export const AppointmentContext = createContext(null);
function Appointment() {
  let dt = new Date();
  const [date, setDate] = useState(dt);
  const [appointment, setAppointment] = useState("");
  const [counselers, setCounselers] = useState([]);
  const [counselorChoice, setCounselorChoice] = useState(null);

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
      const res = await axios.get(`${API_URL}/counselor/counselors/`, config);
      setCounselers(res.data);
    } catch (err) {}
  };
  console.log(counselers);

  useEffect(() => {
    setAppointment(
      date.toLocaleDateString("en-UK", {
        hour: "2-digit",
        weekday: "long",
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    );
  }, [date]);
  const dateSetter = (dae) => {
    dae.setHours(date.getHours());
    setDate(dae);
  };
  const hourSetter = (hr) => {
    let date2 = new Date(date);
    date2.setHours(hr);
    setDate(date2);
  };

  const sendAppointment = async () => {
    const appointment_datetime = date.toISOString();
    const counselor = counselorChoice.id + "";
    const bod = JSON.stringify({
      counselor,
      appointment_datetime,
    });
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${localStorage.getItem("access")}`,
        Accept: "application/json",
      },
    };

    try {
      const res = await axios.post(
        `${API_URL}/counselor/appointments/`,
        bod,
        config
      );
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="h-[100vh] mt-24 md:p-10">
      <Card>
        <CardHeader>
          <p className="text-2xl">Schedule in person counseling</p>
        </CardHeader>
        <CardContent>
          <div>
            <DropdownMenu>
              <DropdownMenuTrigger className={cn('flex gap-3 items-center')}>
              <Input className={cn('')} value={counselorChoice?counselorChoice.username:"Choose a counselor"}/>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
              {counselers.map((counseler, index) => (
                <DropdownMenuItem key={index} onClick={() => setCounselorChoice(counseler)}>{counseler.username}</DropdownMenuItem>
              ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        <div className="flex flex-col my-4">
          <p className="mb-4">Set your appointment date and time</p>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:w-1/2">
            <AppointmentContext.Provider value={{ dateSetter, hourSetter }}>
              <Datepicker />
              <TimeSetter />
            </AppointmentContext.Provider>
          </div>
        </div>

        </CardContent>
        <CardFooter>
        <Dialog>
    <DialogTrigger>
        <Button
          onClick={() => {
            sendAppointment();
          }}
        >
          Confirm
        </Button>
            

    </DialogTrigger>
    
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Submitted</DialogTitle>
        <DialogDescription>
          You have successfully Scheduled your in person appointment
        </DialogDescription>
      </DialogHeader>
      <DialogFooter>
        <NavLink to="/">
        <Button>Go to HomePage</Button>

        </NavLink>
      </DialogFooter>
    </DialogContent>
  </Dialog>

        </CardFooter>
      </Card>
      <div className="flex my-4 justify-center flex-col">
        <div className="">
          
        </div>
      </div>
    </div>
  );
}
export default Appointment;
