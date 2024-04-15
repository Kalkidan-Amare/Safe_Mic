import { Fetcher } from "./Fetcher";
import { PopUp } from "./PopUp";
import useFetch from "./useFetch";
import Loading from "@/component/Animation/Loading/Loading";
export const Permission=(props)=>{
    const { isLoading, data } = useFetch(`all/users/${props.id}`, true);

    if (isLoading) {
      return <div className="flex w-full justify-center"><Loading/>
            </div>
    }
    if(data){
      console.log(data);
    }
    return(
        <div className="h-[100vh]">
        {
        data?.data.is_staff?<><Fetcher/><PopUp/></>:"you must be an admin to access this"
        }
        </div>
    ) 
}