export const TagButton=(props)=>{
    return (
            <li style={{margin:"7px"}}>
                <a href="#" className="flex items-center p-3 text-base font-bold text-gray-900 rounded-lg bg-gray-50 hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white">
                    <span className="flex-1 ms-3 whitespace-nowrap">{props.name}</span>
                </a>
            </li>
    )
}