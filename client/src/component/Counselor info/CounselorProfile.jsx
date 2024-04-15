import React, { useState } from 'react';
import { RiEdit2Line } from "react-icons/ri";

const UserProfile = () => {
  const [profilePicture, setProfilePicture] = useState(null);

  // Function to handle file input change
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setProfilePicture(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex items-center ">
      {/* Circular avatar */}
      <div className="h-52 w-52 rounded-full overflow-hidden border-2 border-gray-300">
        {profilePicture ? (
          <img src={profilePicture} alt="Profile Picture" className="h-full w-full object-cover" />
        ) : (
          <div className="h-full w-full flex items-center justify-center bg-gray-200">
            <span className="text-gray-500">No Image</span>
          </div>
        )}
      </div>

      {/* Input for file selection */}
      <div className="ml-4">
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
          id="profilePictureInput"
        />
        <label htmlFor="profilePictureInput" className="cursor-pointer bg-purple-500 text-white px-8 py-3 ml-12 rounded-md">
          Choose Image
        </label>
      </div>
    </div>
  );
}

const CounselorProfile = () => {
  const [selection, setSelection] = useState(); // Default selection is 'both'

  const handleRadioChange = (event) => {
    setSelection(event.target.value);
  };
  return (
    <div className="m-12">
      <div className="flex justify-center text-sm/[40px]"> 
        <UserProfile />
      </div>
      
      <p className=" justify-center mx-[325px] mt-[32px]  text-[18px] font-semibold ">Name</p>
     
      <div className="flex justify-center items-center rounded md p-8 m-20">
      
      <div className="flex bg-slate-100 border-slate-500 rounded pt-10 pl-10 pr-40 pb-12 shadow-lg backdrop-blur-sm bg-opacity-50 text-sm/[40px] ">
        <form action="">
        
            <div className="relative mr-6 my-10 flex space-x-4 text-[20px]">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                className="mt-1 block w-64 px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none"
                required
              />
            </div>
          <p className="text-[20px] mb-4 pt-2 ">Gender:</p>
          <div className="flex text-[20px]">
            <div className="mr-12">
              <input
                type="radio"
                id="Male"
                name="selection"
                value="Male"
                checked={selection === 'Male'}
                onChange={handleRadioChange}
              />
              <label htmlFor="Male"> Male </label>
            </div>
            <div className="mr-4">
              <input
                type="radio"
                id="Female"
                name="selection"
                value="Female"
                checked={selection === 'Female'}
                onChange={handleRadioChange}
              />
              <label htmlFor="Female"> Female</label>
            </div> 
          </div>
          

          <div className="relative mt-20 mb-12 mr-46 space-x-4 text-[20px]">
            <label htmlFor="">Professional Bio: </label>
            <textarea
              id="professionalBio"
              type="text"
              className="mt-1 block w-[600px] px-6 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none  "
              required
              rows="10"
              cols="20"
            />
            <label htmlFor="">Specialities and Areas of focus: </label>
            <textarea
              id="focusAreas"
              type="text"
              className="mt-1 block w-[600px] px-6 py-4 bg-white border border-slate-300 rounded-md text-sm shadow-sm focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none "
              required
              rows="4"
              cols="20"
            />
            <label htmlFor="">Languges: </label>
            <textarea
              id="languges"
              type="text"
              className="mt-1 block w-[600px] px-6 py-4 bg-white border border-slate-300 rounded-md text-sm shadow-sm focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none "
              required
              rows="1"
              cols="20"
            />
            
          </div>

          <div className="flex space-x-10 space-y-8 text-[18px]">
            <button
              type="submit"
              className="w-32 mb-8 mt-6 rounded-lg bg-purple-600 text-white hover:bg-purple-800 py-2 transition-colors duration-200"
            >
              Edit
            </button>
            <RiEdit2Line className='absolute bottom-24 left-4 text-xl text- white'/>
          </div>
        </form>
      </div>
    </div>
    </div>
  );
}

export default CounselorProfile

