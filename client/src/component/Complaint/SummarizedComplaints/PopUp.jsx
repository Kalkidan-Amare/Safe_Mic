import { useState } from "react";
import { Summary } from "./Summary";

let tags = {
    grade_issue: 'grade issue',
    harassment_teacher: 'harasment by a teacher',
    harassment_student: 'harasment by a student',
    bullied: 'bullied',
    lounge: 'lounge',
    other: "other",
}

export const PopUp = () => {
    const [open, setOpen] = useState(false)
    let clickHandler = () => {
        setOpen(prev => prev == true ? false : true)
    }
    return (
        <div>
            {open ?
                <div style={{height:"100vh"}} id="crypto-modal" tabIndex="-1" aria-hidden="true" className="fixed bg-gray-900 bg-opacity-50 backdrop-blur-sm top-0 right-0 bottom-0 left-0 flex items-center justify-center overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
                    <div className="relative p-4 w-full w-[80vw] max-w-lg max-h-full">
                        <div style={{height:"520px"}} className="relative bg-white rounded-lg shadow dark:bg-gray-700 animate-fade-in">
                            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                    AI Summary
                                </h3>
                                <button onClick={clickHandler} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm h-8 w-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="crypto-modal">
                                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                    </svg>
                                    <span className="sr-only">Close modal</span>
                                </button>
                            </div>

                            <div className="p-4 md:p-5">
                                <ul className="my-4 space-y-3">
                                    <Summary tags={tags} />
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                :
                ""}

            <div className="fixed bottom-4 right-4">
                <button onClick={clickHandler} type="button" className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
                    summerizer
                </button>
            </div>
        </div>


    )
}
