import { Popover,
    PopoverContent,
    PopoverTrigger} from "@radix-ui/react-popover";

import { Calendar } from "@/components/ui/calendar";
import { Card } from "@/components/ui/card";
import { useState,useEffect } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useContext } from "react";
import { AppointmentContext } from "../Appointment";
function Datepicker(){
    const [date,setDate]=useState(new Date())
    const [dsply, setDsply]= useState("Set the date") 
    const {dateSetter}=useContext(AppointmentContext);
    let a=new Date(2024,3,4);
    let b=new Date(2024,5,17)
    const [disabledDates,setDisabledDates]=useState([])
    useEffect(()=>{
        let c=[]
        if(a.getDay!==6){
            let ad=a.getDate()+6-a.getDay()
            a.setDate(ad)
        }
        let sum=a.getDate()
        let i=0
        while(i<11){
            c.push(new Date(2024,3,sum))
            c.push(new Date(2024,3,sum+1))
            sum=sum+7
            i++;
        }
        c.push({from: new Date(2024,5,17), to:new Date(2024,10,1)})
        setDisabledDates(c)
    },[])
    return <Popover>
        <PopoverTrigger asChild>
            <Button
            variant={"outline"}
            className={cn(
                "w-[280px] justify-start text-left font-normal rounded-lg shadow-md"
            )}
        >{dsply}</Button>
        </PopoverTrigger>
        <PopoverContent  className={cn('bg-background')}>

        <Calendar 
        mode="single"
        selected={date}
        onSelect={date=>{
            setDate(date)
            setDsply(date.toLocaleDateString("en-US",
            {year:'numeric',
            month:'short',
            day:'numeric'
        }))
        setDate(date)
        dateSetter(date)
        }}
        disabled={disabledDates}
        initialFocus
        />
        </PopoverContent>
    </Popover>
}export default Datepicker;