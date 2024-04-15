import React from "react";
import { Routes, Route } from "react-router-dom";
import LoginPage from "../LoginPage/LoginPage";
import Complaint from "../Complaint/Complaint";
import Reg from "../LoginPage/Reg";
import GroupChat from "../chat/Group/GroupChat";
import ResetPassword from "../LoginPage/ResetPassword";
import ResetPasswordConfirm from "../LoginPage/ResetPasswordConfirm";
import Appointment from "../Appointment/Appointment";
import Activate from "../LoginPage/Activate";
import Counseling from "../Counesling/Counseling";
import Homepage from "../Homepage/Homepage";
import MyProfile from "../MyProfile/MyProfile";
import CounseInfo from "../Counselor info/CounseInfo";
import ComplaintForm from "../FillingForm/ComplaintForm";
import ChooseCounselor from "../Counesling/ChooseCounselor";
import Chatbot from "../ChatBox/Chatbot";
import AuthCounselor from "../LoginPage/AuthCounselor";
import OneToOneChat from "../chat/OneToOne/OneToOneChat"
import Apoo from "../CounselorPage/Appo/Compo/Apoo";
import Landing from "../CounselorPage/LandingPage/Comp/Landing";
import { Complaints } from "../Complaint/SummarizedComplaints/Complaints";
import NotFound from "./NotFound";
const AllRouting = () => {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/login/:verified?" element={<LoginPage />} />
      <Route path="/signup" element={<Reg />} />
      <Route path="/complaint" element={<Complaint />} />
      <Route path="/counseling" element={<Counseling />} />
      <Route path="/oneToOneChat/:roomName?" element={<OneToOneChat/>}/>
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/appointment" element={<Appointment/>} />
      <Route path="/counselor-info" element={<CounseInfo/>}/>
      <Route path="/complaint-form" element={<ComplaintForm/>}/>
      <Route path="/chooseCounselor" element={<ChooseCounselor/>}/>
      <Route path="/chatbot" element={<Chatbot/>}/>
      <Route
        path="/password/reset/confirm/:uid/:token"
        element={<ResetPasswordConfirm />}
      />
      <Route path="/activate/:uid/:token" element={<Activate />} />
      <Route path="/account" element={<MyProfile/>}/>
      <Route path="/authCounselor" element={<AuthCounselor/>}/>
      <Route path="/counselor/all-appointments" element={<Apoo/>}/>
      <Route path="/counselor/landing-page" element={<Landing/>}/>
      <Route path="/complaints" element={<Complaints/>}/>
      <Route path="*" element={<NotFound/>}/>
    </Routes>
  );
};

export default AllRouting;
