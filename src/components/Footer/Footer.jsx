import React from 'react';
import {Link} from 'react-router-dom';

const Footer = ()=>{
 
    return(
        <div className="flex flex-wrap bg-primary-100 text-white">
     <div className="flex flex-col justify-center w-full md:w-1/2 lg:w-1/2">
        <h2 className="font-bold text-2xl">CAAT (Class announcements and attendance tracker)</h2>
        <h3 className="leading-8 text-justify">CAAT is a web-based system that is used by teachers to make announcements and allows them to track students attendance. It makes life easier for teachers to make announcements and students won't mess any announcement.</h3>
     </div>
     <div className=' w-full md:w-1/2 lg:w-1/2'>
     <div className="px-2 pt-2 pb-3 space-y-1 text-center md:text-left lg:text-left xl:text-left">
      {/* <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" --> */}
      <Link to="/" className="text-white hover:shadow-outline block px-3 py-2 rounded-md text-base font-medium">Home</Link>
      <Link to="/about-us" className="text-white hover:shadow-outline block px-3 py-2 rounded-md text-base font-medium">About-Us</Link>
      <Link to="/contact-us" className="text-white hover:shadow-outline block px-3 py-2 rounded-md text-base font-medium">Contact-Us</Link>
      <Link to="/classes" className="text-white hover:shadow-outline block px-3 py-2 rounded-md text-base font-medium">Classes</Link>
      {/* <Link to="/announcements" className="text-white hover:shadow-outline block px-3 py-2 rounded-md text-base font-medium">Announcements</Link> */}
    </div>
     </div>
 </div>
    )
}

export default Footer;