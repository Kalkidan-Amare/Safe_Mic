import { Collapsible,
    CollapsibleTrigger,
    CollapsibleContent} from "@/components/ui/collapsible"; 
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import up from './ChevronUp.svg'
import down from './ChevronDown.svg'
import { Card,CardContent,CardTitle } from "@/components/ui/card";
import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import { FaChevronUp } from "react-icons/fa";
function ComplaintBlock({title,content}){
    const [open,SetOpen]=useState(false)
    return <Collapsible
        open={open}
        onOpenChange={SetOpen}
        className={cn("w-full md:w-8/12 font-sans")}
        >
        <CollapsibleTrigger
        className={cn("w-full")}
        >
            <div className="border-solid
            border-2 px-4 py-1 my-2 
            rounded-2xl flex justify-between
            ">
                <p className="">
                    {title}
                </p> 
                {open?<FaChevronUp/>:<FaChevronDown/>}
            </div>
        </CollapsibleTrigger>
        
        <CollapsibleContent className={cn("w-full")}>
        <Card className=" mx-4">
            <CardTitle className="m-2 font-semibold text-base">
                {title}
            </CardTitle>
            <CardContent>
                {content}
            </CardContent>
        </Card>
        </CollapsibleContent>
        </Collapsible>
}export default ComplaintBlock;