import { Fetcher } from "./Fetcher";
import { Permission } from "./Permission";
import { PopUp } from "./PopUp";
import useFetch from "./useFetch";
import Loading from "@/component/Animation/Loading/Loading";
export const Complaints=()=>{
    const { isLoading, data } = useFetch('auth/users/me/', true);

    if (isLoading) {
      return <div className="flex w-full justify-center !h-[100vh]"><Loading/>
            </div>
    }
    return <Permission id={data?.data.id} />
}