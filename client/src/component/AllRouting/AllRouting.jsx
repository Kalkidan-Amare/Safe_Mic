import { createBrowserRouter,createRoutesFromElements } from "react-router-dom";
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
import AuthCounselor from "../LoginPage/AuthCounselor";
import OneToOneChat from "../chat/OneToOne/OneToOneChat"
import Apoo from "../CounselorPage/Appo/Compo/Apoo";
import Landing from "../CounselorPage/LandingPage/Comp/Landing";
const AllRouting=createBrowserRouter(
    createRoutesFromElements(
        <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/login/:verified?" element={<LoginPage />} />
            <Route path="/signup" element={<Reg />} />
            <Route path="/complaint" element={<Complaint />} />
            <Route path="/counseling" element={<Counseling />} />
            <Route path="/groupChat" element={<GroupChat />} />
            <Route path="/oneToOneChat" element={<OneToOneChat/>}/>
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/appointment" element={<Appointment/>} />
            <Route path="/counselor-info" element={<CounseInfo/>}/>
            <Route path="/complaint-form" element={<ComplaintForm/>}/>
            <Route path="/chooseCounselor" element={<ChooseCounselor/>}/>
            <Route
                path="/password/reset/confirm/:uid/:token"
                element={<ResetPasswordConfirm />}
            />
            <Route path="/activate/:uid/:token" element={<Activate />} />
            <Route path="/account" element={<MyProfile/>}/>
            <Route path="/authCounselor" element={<AuthCounselor/>}/>
            <Route path="/counselor/all-appointments" element={<Apoo/>}/>
            <Route path="/counselor/landing-page" element={<Landing/>}/>
            </Routes>
    )
)
export default AllRouting