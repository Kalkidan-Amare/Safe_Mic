import { NavLink } from "react-router-dom";
import Circles from "./Circular units/Circles";
import ComplaintBlock from "./Collapsible/ComplaintBlock";
import { connect } from "react-redux";
function Complaint({isAuthenticated}){
    const complaints = [
            {
            title: "Poor Service at Cafeteria",
            content: "The cafeteria staff has been consistently rude and unhelpful. The food quality has also been declining, and there are limited options for students with dietary restrictions."
            },
            {
            title: "Inconsistent Grading in Biology Class",
            content: "I've noticed that the grading in our biology class seems inconsistent. Some students are receiving higher grades for similar work, while others are being marked down unfairly. This inconsistency is affecting our understanding of the material and our overall academic performance."
            },
            {
            title: "Lack of Support for Students with Disabilities",
            content: "As a student with a disability, I've encountered numerous obstacles that make it difficult for me to succeed academically. The university lacks adequate support services for students like me, including accessible accommodations and resources. This lack of support is discriminatory and needs to be addressed immediately."
            },
            {
            title: "Sexual Harassment on Campus",
            content: "I've experienced sexual harassment on campus multiple times, and I know many other students who have as well. The university's response to these incidents has been inadequate, and it's clear that more needs to be done to create a safe and respectful environment for all students."
            }
        ];
    
    // Example usage:
    console.log(complaints[0].title); // Output: Slow Internet Speed
    console.log(complaints[0].description); // Output: I am experiencing very slow internet speed, making it difficult to browse or stream videos.
    
    return <div className=" grid grid-cols-1 m-12 items-center w-[80%] mx-auto">
    
    <div className="mb-16 h-1/2 mt-24">
    <h1 className=" text-6xl my-10">
        Have a Concern?
    </h1>
        <button className=" max-w-max border-solid my-4 border-foreground border-2 rounded-3xl px-4 p-1 hover:font-semibold hover:px-8 transition-all duration-300">
            <NavLink to={isAuthenticated? `/complaint-form`: '/login'}>
            File Your Complaint here

            </NavLink>
        </button>
    </div>


    <h1 className="text-3xl mt-40">
        What do you want to report?
    </h1>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"> 
        <Circles title={"Grade"} detail={" If you feel like the grade you got doesn't reflect on work you have done. And there be  another motive behind it"}/>
        <Circles title={"Services"} detail={"If you are dissatisfied with the service you are receiving and there is clear violation of policies or standards"}/>
        <span className='md:hidden lg:flex'><Circles title={"Harrasment"} detail={" If you are being harassed by students or teachers"}/></span>
    </div>
    <div className="h-screem grid grid-cols-1 place-items-center my-40">
        {
            complaints.map((obj,index)=><ComplaintBlock key={index} title={obj.title} content={obj.content}/>)
        }
    </div>

    </div>
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
  });

export default connect(mapStateToProps)(Complaint);