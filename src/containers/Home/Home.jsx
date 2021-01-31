import React from 'react';
import HomeImg from '../../images/mainClassBg.jpg';
import {Link} from 'react-router-dom';

const Home=(Props)=>{

    return(
        <div style={{backgroundImage:`url(${HomeImg})`,
            backgroundAttachment:'fixed'
        }} className="relative h-auto md:h-screen lg:h-screen xl:h-screen flex flex-wrap justify-center bg-cover">
        <div className="absolute h-auto w-full md:h-screen lg:h-screen xl:h-screen bg-secondary-200 bg-opacity-50">

        </div>
        <div className="relative">
        <div className="mt-12 flex flex-col">
        <h1 className="text-6xl text-secondary-100 bg-transparent rounded-3xl p-10 ">Welcome to CAAT</h1>
        <p className="text-secondary-100 text-xl text-center">The place of all announcements :D</p>
        <br/>
           <Link to="/about-us" className="justify-center w-40 mx-auto "><button className="w-full bg-primary-100 text-white h-10 rounded-2xl hover:bg-secondary-200 hover:text-primary-100 hover:shadow-2xl">Get Started</button>
           </Link> 
        </div>

        </div>
        </div>
    )
}
export default Home;