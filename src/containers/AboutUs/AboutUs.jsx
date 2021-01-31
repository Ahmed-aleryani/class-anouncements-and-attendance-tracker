import React from 'react';
import Person from '@material-ui/icons/Person';
import RecordVoiceOverIcon from '@material-ui/icons/RecordVoiceOver';
import AddAlertIcon from '@material-ui/icons/AddAlert';

const AboutUs=(Props)=>{
    return(
        <div className="h-auto lg:h-screen xl:h-screen bg-secondary-200 flex flex-col items-center">
        <div className="text-center text-secondary-100 mt-8">
            <h1 className="text-4xl ">What is CAAT?</h1>
            <p className="text-justify w-full md:w-2/4 lg:w-2/4 xl:w-2/4 m-auto">It is a space for teachers, tutors, instructors or even University professors to post the announcements of their class. Thus, it becomes easier for students to follow up with the announcements and nto miss any announcement.</p>

        </div>
        <br/>
        <br/>
        <br/>
        {/* cards container */}
            <div className="flex flex-wrap justify-around w-full md:w-4/5 lg:w-4/5 xl:w-4/5 mx-auto">
           
            <div className="w-full md:w-1/3 lg:w-1/3 xl:w-1/3 px-10 transform rotate-3 bg-secondary-100 text-white rounded-lg p-4 shadow-lg mb-6">
                <h2 className="text-center text-2xl">1. Sign-in <Person className="text-white"/></h2>
           
                    <ul className="list-disc">
                    <li className="text-justify">Create an account with us using easy method of Google Sign-in.</li>
                    <li>Or just Sign-in if you already have an account.</li>
                    </ul>
               
            </div>
                       
            <div className="w-full md:w-1/3 lg:w-1/3 xl:w-1/3 px-10 transform -rotate-6 bg-white rounded-lg p-4 shadow-lg mb-6">
                <h2 className="text-center text-2xl">2. Create Class & Share Class Code <RecordVoiceOverIcon/></h2>
                <br/>
                <p className="text-justify">
                   Create new Class easily and then share class code with students so they be able to join class announcements!.
                </p>
            </div>
            <div className="w-full md:w-1/3 lg:w-1/3 xl:w-1/3 px-10 transform rotate-12 bg-primary-100 text-white rounded-lg p-4 shadow-lg mb-6">
                <h2 className="text-center text-2xl">3. Post class announcements <AddAlertIcon/> </h2>
                <br/>
                <p className="text-justify">
                   Share class code with students to join class announcements!.
                </p>
            </div>
            </div>
        </div>
    )
}

export default AboutUs;