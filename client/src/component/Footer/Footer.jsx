import logo from '/Images/safemic.png'
function Footer(){
    return <footer className="bg-background rounded-lg shadow border-2 m-4 mt-16">
        <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
            <div className="sm:flex sm:items-center sm:justify-between">
                    <span className="self-center text-xl whitespace-nowrap dark:text-white">
                        
                        <p className='flex items-center'>
                        <img className='aspect-square w-12 mx-2' src={logo} alt="safemic logo" /> Safe Mic
                        </p>
                    </span>
                <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
                    <li>
                        <a href="#" className="hover:underline me-4 md:me-6">About</a>
                    </li>
                    <li>
                        <a href="#" className="hover:underline">Contact</a>
                    </li>
                </ul>
            </div>
            <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
            <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2024 <a href="https://github.com/Ge-ez-Bit" className="hover:underline">Ge-ez bit™</a>. All Rights Reserved.</span>
        </div>
    </footer>
    
    
}export default Footer