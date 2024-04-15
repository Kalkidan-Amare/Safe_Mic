import React from "react";
import Approach from "./Component/Approach";
import GetCons from "./Component/GetCons";
import Hero from "./Component/Hero";
import Ready from "./Component/Ready";
import Service from "./Component/Service";
import AdviceCarousel from "./Component/AdviceCarousel";
import Chatbot from "../ChatBox/Chatbot";
import { connect } from "react-redux";
function Homepage({isAuthenticated}) {
  return (<>
      <div className="flex flex-col items-center  md:w-8/12 mx-auto max-md:px-5 max-md:mt-10 max-md:max-w-full pt-36">
        <div>
          <Hero />
          {isAuthenticated? <Chatbot/>: ""}
          
        </div>
        <div>
          <AdviceCarousel/>
        </div>
        <div>
          <Approach />
        </div>
          <Service />
        <div>
          <Ready />
        </div>
        <div>
          <GetCons isAuthenticated={isAuthenticated} />
        </div>
      </div>
    </>
  );
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(Homepage);
