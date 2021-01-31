import React,{useState,useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import firebase from '../../firebase.config';
import GroupAdd from '@material-ui/icons/GroupAdd'

const auth = firebase.auth();
const firestore=firebase.firestore();

const JoinClassForm=(Props)=>{
    const path=useHistory();

    
    const [classCode,setClassCode]=useState("");

    const handleChange=(event)=>{
        setClassCode(event.target.value)
    }
    
    const classFormSubmit=async (event)=>{
      event.preventDefault();

      if(classCode===""){
        alert("Class name and Description can not be empty!");
        return;
      }

        firestore.collection('Classes').doc(classCode).get().then(result=>{
        //   console.log(result.data().newClassName)

       if(result.exists){
           if(!result.data().studentsIDs.includes(Props.user.uid)){
        firestore.collection('Classes').doc(classCode).set({
            ...result.data(),
            studentsIDs:[...result.data().studentsIDs,Props.user.uid]
        },{ merge: true })
        alert("You have joined "+result.data().newClassName+" class successfully :D");
        // path.replace("/classes/"+Props.user.uid+"/")
    }else{
        alert("You are already a member of this class!");
    }
       }else{
           alert("Class Code is wrong or class does not exist!");
       }
      });
 
      const { displayName, uid, photoURL } = auth.currentUser;

      
    }
    
return(
    <div className="w-full">
     <form>
     <fieldset className="border-2 border-white w-4/5 text-left p-4 mx-auto rounded-2xl">
            <legend className="text-2xl text-white">&nbsp;&nbsp; Join Class &nbsp;&nbsp;&nbsp;&nbsp;</legend>
            <form className="w-4/5 mx-auto text-center" onSubmit={classFormSubmit}>
                <label className="text-xl text-white w-1/5">Class Code: </label>
                <input name="classCode" onChange={handleChange} value={classCode} type="text" placeholder="Enter class code to join class..." className="border-2 rounded-lg py-2 pl-2 border-white focus:outline-none focus:border-white w-4/5"/>
                <br/>
                <br/>
            
                <button type="submit" className=" bg-white hover:bg-secondary-200 hover:text-secondary-100 focus:outline-none py-2 px-4 text-secondary-100 rounded-lg">Join Class <GroupAdd/></button>

            </form>
            </fieldset>
     </form>
    </div>
)

}

export default JoinClassForm;