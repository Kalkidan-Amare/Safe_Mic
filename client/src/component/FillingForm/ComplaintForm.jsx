import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem ,
  DropdownMenuTrigger,
DropdownMenuGroup,
DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import API_URL from '@/url';
import { NavLink } from 'react-router-dom';
const ComplaintForm = () => {
  const [selection, setSelection] = useState('both'); 
  const [tag, setTag] = useState("grade_issue");
  const [body, setBody] = useState("");
  const [complaintType,setComplaintType]=useState('Complaint')

  const handleRadioChange = (event) => {
    setSelection(event.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    submitForm();
  }

  
  const submitForm = async () => {
    
    const bod = JSON.stringify({
      tag,
      body,
    });
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `JWT ${localStorage.getItem("access")}`,
        Accept: "application/json",
      },
    };
  
  
    try {
      const res = await axios.post(
        `${API_URL}/complaint/complaints/`,
        bod,
        config,
      );
      console.log(res);
    } catch (err){
      console.log(err);
    }
  }
  

  return (
    <div className="flex justify-center items-center rounded md p-8 m-20">
      <div className="flex bg-accent border-slate-500 
                      rounded pt-10 pl-10 pr-40 pb-12 shadow-lg backdrop-blur-sm
                       text-sm/[40px] sm:w-[80%]">
        <form onSubmit={handleSubmit} className='w-full'>
          <h1 className="text-[32px] pt-24 pb-20 ">Complaint Filling Form</h1>
          <p className="text-[18px] mb-4">What is Your Complaint on?</p>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Input value={tag} className={cn('w-4/12')}/>
            </DropdownMenuTrigger>
            <DropdownMenuContent className={cn('p-4')}>
              <DropdownMenuGroup>
Harrasment by
              <DropdownMenuItem onClick={()=>setTag('harassment_teacher')}>
              Teacher
              </DropdownMenuItem >
              <DropdownMenuItem onClick={()=>setTag('harassment_student')}>
              Student
              </DropdownMenuItem >

              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
              Services
              <DropdownMenuItem onClick={()=>setTag('lounge')}>
                Lounge
              </DropdownMenuItem >
              <DropdownMenuItem onClick={()=>setTag('other')}>
                Other
              </DropdownMenuItem >

              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={()=>setTag('grade_issue')}>
              Grade Issues
              </DropdownMenuItem >
              <DropdownMenuItem onClick={()=>setTag('bullied')}>
              Bullying 
              </DropdownMenuItem >
            </DropdownMenuContent>
          </DropdownMenu>
          <div className="flex text-[18px]">
          </div>

          <div className="relative mt-10 mb-8 text-[18px]">
            <label htmlFor="complaint">Complaint</label>
            <Textarea
              id="complaint"
              type="text"
              required
              rows="12"
              cols="20"
              onChange={(e) => setBody(e.target.value)}
              value={body}
            />
          </div>

          <div className="flex flex-row-reverse space-x-10 space-y-8 text-[18px]">
            <Dialog>
    <DialogTrigger>
            <Button
              type="submit"
              //className="w-32 mb-8 mt-6 rounded-full bg-purple-600 text-white hover:bg-purple-800 py-2 transition-colors duration-200"
            >
              Submit
            </Button>

    </DialogTrigger>
    
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Submitted</DialogTitle>
        <DialogDescription>
          You have successfully submited your complaint
        </DialogDescription>
      </DialogHeader>
      <DialogFooter>
        <NavLink to="/">
        <Button>Go to HomePage</Button>

        </NavLink>
      </DialogFooter>
    </DialogContent>
  </Dialog>
          </div>
          <div>

          </div>
        </form>
      </div>
    </div>
  );
};

export default ComplaintForm;
