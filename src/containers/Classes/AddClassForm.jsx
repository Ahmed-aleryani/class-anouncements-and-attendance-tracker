import React, {useState,useEffect} from 'react';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import Add from '@material-ui/icons/Add';
import firebase from "../../firebase.config";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from 'react-firebase-hooks/firestore';

const auth = firebase.auth();
const firestore = firebase.firestore();

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const AddClassForm=(Props)=> {


  const classObj={
    newClassName:"",
    classOwnerID:"",
    classOwnerName:"",
    classDescription:"",
    dateClassCreated:""
};
const [newClassObj,setNewClassObj]=useState(classObj);
  const handleClose = () => {
    Props.setFormVisible(false);
  };
const handleChange=(event)=>{
    const name=event.target.name;
    const value=event.target.value;
    // console.log(name,value)
    setNewClassObj({...newClassObj,[name]:value})
}

const classFormSubmit=async (event)=>{
  event.preventDefault();
  const classRef = firestore.collection('Classes').doc();
  const classID=classRef.id;
  if(newClassObj.className===""||newClassObj.classDescription===""){
    alert("Class name and Description can not be empty!");
    return;
  }
  const { displayName, uid, photoURL } = auth.currentUser;


 await classRef.set(
    {...newClassObj,
      classOwnerID:uid,
      classOwnerName:displayName,
      dateClassCreated:firebase.firestore.FieldValue.serverTimestamp(),
      studentsIDs:[uid],
      classID:classID
      }
  )
  handleClose();
  setNewClassObj(classObj);
  alert("Class Added Successfully!");
  
}

  return (
    <div>
      <Dialog fullScreen open={Props.formVisible} onClose={handleClose} TransitionComponent={Transition}>
        <AppBar className="relative">
          <Toolbar className="bg-primary-100">
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon className="outline-white"/>
            </IconButton>
            <Typography variant="h6" className="flex-1">
              Cancel
            </Typography>
          </Toolbar>
        </AppBar>
            <br/>
            <br/>
            <br/>
            <div className="flex flex-col items-center justify-between">
            {/* classOwnerID:"",
    classOwnerName:"",
    classDescription:"", */}
            <fieldset className="border-2 border-primary-100 w-4/5 text-center p-4">
            <legend className="text-2xl text-secondary-100">Add new class</legend>
            <form className="w-4/5 mx-auto text-left" onSubmit={classFormSubmit}>
                <label className="text-xl text-primary-100 w-1/5">Class Name: </label>
                <input name="newClassName" onChange={handleChange} value={newClassObj.newClassName} type="text" placeholder="Enter Class Name..." className="border-2 rounded-lg py-2 pl-2 border-primary-200 focus:outline-none focus:border-primary-100 w-4/5"/>
                <br/>
                <br/>
                <label className="text-xl text-primary-100 w-1/5">Class Description: </label>
                <br/>
                <br/>
                <textarea name="classDescription" onChange={handleChange} col="15" row="10" value={newClassObj.classDescription} type="text" placeholder="Enter Class Description..." className="border-2 rounded-lg py-2 pl-2 border-primary-200 focus:outline-none focus:border-primary-100 w-11/12"></textarea>
                <br/>
                <br/>
                <button type="submit" className="bg-secondary-100 hover:bg-secondary-200 hover:text-secondary-100 focus:outline-none py-2 px-4 text-white rounded-lg">Add Class <Add/></button>

            </form>
            </fieldset>
            </div>
        
      </Dialog>
    </div>
  );
}

export default AddClassForm;