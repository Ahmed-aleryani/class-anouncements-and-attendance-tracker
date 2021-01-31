import React,{useState} from "react";
import {Link,useHistory} from 'react-router-dom';
import ClassesBg from "../../images/classesBg.jpg";
import Add from '@material-ui/icons/Add';
import AddClassForm from './AddClassForm';
import firebase from '../../firebase.config';
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from 'react-firebase-hooks/firestore';

const auth = firebase.auth();
const firestore = firebase.firestore();

const Classes = (Props) => {
  const [user] = useAuthState(auth);
  const path=useHistory();
  if(user===null){
    path.goBack();
  }

    const classRef = firestore.collection('Classes');


  const query = classRef.where("studentsIDs","array-contains",Props.match.params.uid);
  const [classes] = useCollectionData(query, {idField: 'id'});

  // console.log(classes)


   const [formVisible,setFormVisible]=useState(false);
    return(
    <section className="relative text-gray-600 body-font overflow-hidden bg-fixed bg-no-repeat bg-cover" style={{backgroundImage:`url(${ClassesBg})`}}>
    <div className="absolute bg-secondary-100 opacity-25 h-full w-full z-0">
{/* this is the overlay */}
    </div>
    <AddClassForm setFormVisible={setFormVisible} formVisible={formVisible} user={user}/>

  
    <div className="relative w-full">
  {user?  <div className="fixed right-0 bottom-0 mb-2 p-4 z-10">
    <button onClick={()=>{
        setFormVisible(true);
    }} id="btnAddClass"  className="bg-secondary-200 hover:bg-primary-100 hover:text-white transition duration-300 ease-in-out rounded-full p-4">
    Add new Class <Add />
    </button>
    
    </div>:""}
    <div className="container py-16 mx-auto">
      <div className="flex flex-col text-center w-full mb-20">
        <h1 className="sm:text-4xl text-4xl font-bold title-font mb-2 text-white">
          Classes
        </h1>
      </div> 
     
      <div className="flex flex-wrap justify-center">
      { classes ?classes && classes.map(classRooms => <Card posts={classRooms}/>):""}
        </div>
    </div>
    </div>
 
  </section>
    )
};

const Card=(Props)=>{
  return(<div className="p-4 xl:w-1/4 md:w-1/2 w-7/12 mb-12">
  <div className="bg-secondary-100 h-64 rounded-lg mb-6 flex flex-col relative overflow-hidden shadow-xl">
    <span className="bg-primary-100 text-white px-3 py-1 tracking-widest text-xs absolute right-0 top-0 rounded-bl">
      {Props.posts.classOwnerName}
    </span>
 
    <div className="text-4xl text-white mt-4 ml-4">
    {Props.posts.newClassName}
    </div>

    <div className="pt-5 pl-4 pr-4 flex rounded-lg items-center text-gray-900 overflow-hidden">
      <p className="overflow h-24 text-white">
      {Props.posts.classDescription}
      </p>
      
    </div>
    <div className="pt-4 pl-4 pr-4 rounded-lg flex items-center justify-center">
    <Link to={"/classes/"+Props.posts.classID+"&"+Props.posts.newClassName+"&"+Props.posts.classOwnerID} className="flex items-center mt-auto text-primary-100 bg-secondary-200 text-center border-0 py-2 px-4 focus:outline-none hover:bg-primary-200 rounded-xl shadow-xl">
    Go to Classroom
  </Link>
    </div>
  </div>
</div>)
}

export default Classes;
