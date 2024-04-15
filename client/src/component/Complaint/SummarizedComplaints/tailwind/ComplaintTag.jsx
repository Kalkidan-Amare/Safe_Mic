export const CompaintTag = (props) => {
    return (
            <div style={{ borderRadius:'5px'}} className="w-[100vw] max-w-[400px] m-1 bg-gray-600 text-gray-200">
                <p className="p-5 pl-5 pb-1.5 font-bold pl-2.5 pr-2.5 text-lg mb-2 text-gray-200">{props.tag}</p>
                <p className="p-5 pt-2 text-sm text-gray-400">{props.body}</p>
            </div>
    )
}