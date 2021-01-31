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

const AddAnnouncement=(Props)=> {

  const annObj={
    body:"",
    annID:"",
    title:"",
    datePosted:"",
};
const [newAnnObj,setNewAnnObj]=useState(annObj);
  const handleClose = () => {
    Props.setFormVisible(false);
  };
const handleChange=(event)=>{
    const name=event.target.name;
    const value=event.target.value;
    // console.log(name,value)
    setNewAnnObj({...newAnnObj,[name]:value})
}

const classFormSubmit=async (event)=>{
  event.preventDefault();
//   const annRef = firestore.collection('Classes').doc(Props.classID).collection("Announcements");
    const annRef=Props.annRef.doc();
  const annId=annRef.id;
//   console.log(annID)
  if(newAnnObj.body===""||newAnnObj.title===""){
    alert("Class name and Description can not be empty!");
    return;
  }
  const { displayName, uid, photoURL } = auth.currentUser;

// console.log(newAnnObj)
 try{
    await annRef.set(
        {body:newAnnObj.body,
            title:newAnnObj.title,
            datePosted:firebase.firestore.FieldValue.serverTimestamp(),
          annID:annId
          }
      )
 }catch(ex){

 }
  handleClose();
  alert("Announcement Added Successfully!");
  setNewAnnObj(annObj);
  
}

  return (
    <div>
      <Dialog fullScreen open={Props.formVisible?true:false} onClose={handleClose} TransitionComponent={Transition}>
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
                <label className="text-xl text-primary-100 w-1/5">Title: </label>
                <input name="title" onChange={handleChange} value={newAnnObj.title} type="text" placeholder="Enter Announcement Title..." className="border-2 rounded-lg py-2 pl-2 border-primary-200 focus:outline-none focus:border-primary-100 w-4/5"/>
                <br/>
                <br/>
                <label className="text-xl text-primary-100 w-1/5">Description: </label>
                <br/>
                <br/>
                <textarea name="body" onChange={handleChange} col="15" row="10" value={newAnnObj.body} type="text" placeholder="Enter Announcement Body..." className="border-2 rounded-lg py-2 pl-2 border-primary-200 focus:outline-none focus:border-primary-100 w-11/12"></textarea>
                <br/>
                <br/>
                <button type="submit" className="bg-secondary-100 hover:bg-secondary-200 hover:text-secondary-100 focus:outline-none py-2 px-4 text-white rounded-lg">Add Announcement <Add/></button>

            </form>
            </fieldset>
            </div>
        
      </Dialog>
    </div>
  );
}

export default AddAnnouncement;