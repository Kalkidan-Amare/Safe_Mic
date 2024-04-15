import React from 'react'
import Direct from "./Component2/Direct";
import Benefit from "./Component2/Benefit";
import Science from "./Component2/Science";
import Chordon from "./Component2/Chordon";
import Header from "./Component2/Header";
import Footer from './Component2/Footer';
import { BrowserRouter as Route } from 'react-router-dom'
import Chatbot from '../ChatBox/Chatbot';
import { connect } from 'react-redux';
function Counseling({isAuthenticated}) {
  return (<>
  
<div className="flex flex-col items-center mt-36 md:w-8/12 mx-auto max-md:px-5 max-md:mt-10 max-md:max-w-full">
  {isAuthenticated? <Chatbot/>: ""}
  <div><Direct isAuthenticated={isAuthenticated}/></div>
  <div><Benefit/></div>
  <div><Science/></div>
<div><Chordon isAuthenticated={isAuthenticated}/></div>
</div>
</>
  )
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(Counseling);
