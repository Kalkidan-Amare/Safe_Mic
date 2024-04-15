import { 
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuTrigger, 
    DropdownMenu,
    DropdownMenuItem,
    DropdownMenuGroup,
    DropdownMenuSeparator} from "@radix-ui/react-dropdown-menu"
import { Button, } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useState, useContext } from "react";
import { AppointmentContext } from "../Appointment";
function TimeSetter(){
const {hourSetter}=useContext(AppointmentContext)
const [stime,setStime]=useState([3,4,5,8,9])
const [btnText,setbtnText]=useState('Set Time')
return <span className="mx-8">
    <DropdownMenu>
    <DropdownMenuTrigger asChild>
    <Button
            variant={"outline"}
            className={cn(
                "w-40  justify-start text-left font-normal rounded-lg shadow-md"
            )}
        >
            {btnText}
        </Button>
    </DropdownMenuTrigger>

    <DropdownMenuContent  className={cn("bg-transparent rounded-lg px-4 pt-4 shadow-sm")}>
        {/* <DropdownMenuLabel >
            Available slots
        </DropdownMenuLabel> */}
            <DropdownMenuGroup>{
                
stime.map(obj=>{
    let appointment=obj+':00 - '+ obj+':45'
    return  <DropdownMenuItem key={obj} 
    className={cn('px-4 py-2 mb-2 flex justify-center rounded-md hover:cursor-pointer hover:scale-105')}
    onClick={()=>{
        setbtnText(obj+':00 - '+ obj+':'+'45')
        hourSetter(obj)
        
        }}>
                {appointment}
            </DropdownMenuItem>
})
}
            </DropdownMenuGroup>

    </DropdownMenuContent>
    <DropdownMenuSeparator/>
</DropdownMenu>
</span> 

}export default TimeSetter;