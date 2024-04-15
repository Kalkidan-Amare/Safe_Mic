import React from "react";
function Message({sender,text,top=''}){
    const defaultStyle="w-7/12 mt-2 min-h-8 py-3 px-4 text-white rounded-lg"
    const type=sender?" bg-primary float-right":" bg-zinc-600 float-left";
    return <div className={defaultStyle+type}>
        <b>{top}</b>
        <br />
        {text}
    </div>
}export default Message;