import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
function AppointmentToast(){
const {toast}=useToast()
return <Button onClick={()=>{toast(
        {
            title:"Title",
            Description:"Hello this a toast test",
            action: (
                <ToastAction altText="Goto schedule to undo">Undo</ToastAction>
            )
        }
    )}}
>
Hey
</Button>
}export default AppointmentToast