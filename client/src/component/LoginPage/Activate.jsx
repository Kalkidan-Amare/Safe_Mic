import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { connect } from "react-redux";
import { verify } from "../../actions/auth";
import { Button } from "@/components/ui/button";

const Activate = ({ verify }) => {
  const { uid, token } = useParams();
  const navigate = useNavigate();
  const [verified, setVerified] = useState(false);

  const verify_account = (e) => {
    verify(uid, token);
    setVerified(true);
  };

  if (verified) {
    navigate(`/login/verified`);
  }

  return (
    <div className="flex justify-center items-center rounded md my-20 w-full">
      <div className="flex bg-accent border-slate-500 rounded-lg pt-20 pl-5 pr-5 pb-32 shadow-lg bg-opacity-50 text-sm/[40px] xl:w-[40%] xl:min-w-[600px] w-[100%] sm:w-[80%]">
        <div className="mx-auto sm:w-[60%] w-[80%]">
          <h1 className="text-[32px] pb-10 text-center">Activate your Account</h1>
          <Button
            onClick={verify_account}
            type="button"
            className="w-full rounded-lg bg-primary text-secondary py-1 transition-colors duration-200 font-medium text-[18px]"
          >
            Activate
          </Button>
        </div>
      </div>
    </div>
  );
};

export default connect(null, { verify })(Activate);
