import React from 'react';
import {Link,useHistory} from "react-router-dom";
import firebase from "../../firebase.config";
import { useAuthState } from 'react-firebase-hooks/auth';
import ExitToApp from '@material-ui/icons/ExitToApp'
import googleImg from '../../images/G-Sign.png';
//home page
//classes - after sign-in
//announcements - after sign-in
//about-us - brief description about the website
//contact-us

// [4:31 PM, 12/3/2020] Doaa Althawr: #1e6262
// [4:31 PM, 12/3/2020] Doaa Althawr: #2d767f
// [4:31 PM, 12/3/2020] Doaa Althawr: #b4f1f1
// [4:31 PM, 12/3/2020] Doaa Althawr: #ecfffb

// [10:30 AM, 12/4/2020] Doaa Althawr: #2d767f #b4f1f1
// [10:30 AM, 12/4/2020] Doaa Althawr: نقدر نخليهم اساسي

const Navigation=(Props)=>{
  const path=useHistory();

  const auth = firebase.auth();
  const [user] = useAuthState(auth); 
  
    const signIn=()=>{
      const provider = new firebase.auth.GoogleAuthProvider();
      auth.signInWithPopup(provider);
  }
  const SignOut=()=>{
    return auth.currentUser && (
      <div className="w-full">
        <button className="text-white w-40 h-12 hover:bg-white hover:text-primary-100 rounded-3xl" onClick={() => {auth.signOut();
        path.replace("/")}}>Sign Out <ExitToApp/></button>
      </div>
    )
  }


    return(
        // <!-- This example requires Tailwind CSS v2.0+ -->
<nav className="bg-primary-100">
  <div className="w-4/5 max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
    <div className="flex items-center justify-between h-16">
      <div className="flex-1 flex items-center justify-center">
        <div className="flex-shrink-0 flex items-center">
          {/* <img className="block lg:block h-8 w-auto" src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg" alt="Workflow"/> */}
          <h1 className="hidden md:block lg:block h-8 w-auto text-2xl ml-1 text-white ">CAAT</h1>
        </div>
        <div className=" sm:block sm:ml-6">
          <div className="flex flex-wrap space-x-4">
            {/* <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" --> */}
            <Link to="/" className="text-gray-300 hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">Home</Link>
            <Link to="/about-us" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">About-Us</Link>
            {user?<Link to="/join-class" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Join Class</Link>:""}
            {user?<Link to={"/classes/"+user.uid+"/"} className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Classes</Link>:""}
            {/* <Link to="/announcements" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Announcements</Link> */}
          </div>
        </div>
       
        </div>
        <div className="justify-self-start">
         {user? <SignOut/>: <button onClick={signIn} className="text-white w-40 h-12 hover:bg-white hover:text-primary-100 rounded-3xl">Sign-in with-<img src={googleImg} className="w-6 inline" alt="Google G letter icon"/></button>}
        </div>
        </div>
  </div>


</nav>

    )
}

export default Navigation;