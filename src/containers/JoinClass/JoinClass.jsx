import React from 'react';
import { useAuthState } from "react-firebase-hooks/auth";
import firebase from '../../firebase.config';
import JoinClassForm from './JoinClassForm';

const auth = firebase.auth();

const JoinClass=(Props)=>{
    const [user] = useAuthState(auth);
return(
    <div>
        <hr/>
        <div style={{height:"80vh"}} className="bg-primary-100 flex flex-col items-center justify-center">
    {user?<JoinClassForm user={user}/>:<SignInRequired/>}
    </div>
    <hr/>
    </div>
)

}

const SignInRequired = () => {
    return (
      <div>
        <h1 className="text-white text-4xl">You have to sign in first!</h1>
      </div>
    );
  };

export default JoinClass;