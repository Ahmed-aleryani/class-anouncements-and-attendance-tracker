import React, { useState,useEffect } from "react";
import { Link } from "react-router-dom";
import ClassesBg from "../../images/announcementsBG.jpg";
import Add from "@material-ui/icons/Add";
import firebase from "../../firebase.config";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import ChatRoom from '../Announcement/ChatRoom';

const auth = firebase.auth();
const firestore = firebase.firestore();



const ClassDetails = (Props) => {

  // console.log(Props.match);

  const {classID, className,ownerID} = Props.match.params;
  const [user] = useAuthState(auth);
  const annRef = firestore
  .collection("Classes")
  .doc(classID)
  .collection("Announcements");
  
  const query = annRef.orderBy("datePosted", "asc").limitToLast(100);
  
  const [announcements] = useCollectionData(query, { idField: "id" });
  // console.log(classes)

  const [formVisible, setFormVisible] = useState(false);

  useEffect(() => {
  
  }, [])
  return (
    <section
      className="relative text-gray-600 body-font overflow-hidden bg-fixed bg-no-repeat bg-cover"
      style={{ backgroundImage: `url(${ClassesBg})` }}
    >
      <div className="absolute bg-secondary-100 opacity-50 h-full w-full z-0">
        {/* this is the overlay */}
      </div>
  
      <div className="relative w-full">
        {user&&user.uid==ownerID ? (
          <div className="fixed right-0 bottom-0 mb-2 p-4 z-10">
            <Link
              to={"/addAnnouncement/"+classID}
              id="btnAddClass"
              className="bg-secondary-200 hover:bg-primary-100 hover:text-white transition duration-300 ease-in-out rounded-full p-4"
            >
              Add Announcement <Add />
            </Link>
          </div>
        ) : (
          ""
        )}
        <div className="container py-16 mx-auto">
          <div className="flex flex-col text-center w-full mb-20">
            <h1 className="sm:text-4xl text-4xl font-bold title-font mb-2 text-white">
              Welcome to {className} Announcements
            </h1>
            <h2 className="text-lg font-bold title-font mb-2 text-white underline" >Class Code: {classID}</h2>
          </div>

          <div className="flex flex-wrap justify-center">
            {announcements
              ? announcements &&
              announcements.map((announcement) => <Card posts={announcement} />)
              : ""}
          </div>
          <div className="flex flex-col justify-center items-center">
          <h2 className="text-2xl text-white bg-primary-100 rounded-full p-4">General Class Discussion Board</h2>
          <br/>
          {user ? (
          <ChatRoom {...Props} user={user} auth={auth} roomType="ClassDiscussions" topicID={classID} />
        ) : (
          <SignInRequired />
        )}
          </div>
          
        </div>
      </div>
    </section>
  );
};

const Card = (Props) => {
  const formatter = new Intl.DateTimeFormat("en-GB", { dateStyle: 'full', timeStyle: 'short' });

  return (
    <div className="p-4 xl:w-1/4 md:w-1/2 w-7/12 mb-12">
      <div className="bg-secondary-100 h-64 rounded-lg mb-6 flex flex-col relative overflow-hidden shadow-xl">
        <span className="bg-primary-100 text-white px-3 py-1 tracking-widest text-xs absolute right-0 top-0 rounded-bl">
          {(()=>{
            if(Props.posts.datePosted!==null)
              return formatter.format(new Date(Props.posts.datePosted.seconds*1000))
          })()}
        </span>

        <div className="text-4xl text-white mt-4 ml-4">
          {Props.posts.title}
        </div>

        <div className="pt-5 pl-4 pr-4 flex rounded-lg items-center text-gray-900 overflow-hidden">
          <p className="overflow h-24 text-white">
            {Props.posts.body}
          </p>
        </div>
        <div className="pt-4 pl-4 pr-4 rounded-lg flex items-center justify-center">
          <Link
            to={"/AnnouncementDetails/" +Props.posts.annID+"&"+Props.posts.title+"&"+Props.posts.body+"&AnDiscussions"}
            className="flex items-center mt-auto text-primary-100 bg-secondary-200 text-center border-0 py-2 px-4 focus:outline-none hover:bg-primary-200 rounded-xl shadow-xl"
          >
            Discussions
          </Link>
        </div>
      </div>
    </div>
  );
};
const SignInRequired = () => {
  return (
    <div>
      <h1 className="text-white text-4xl">You have to sign in first!</h1>
    </div>
  );
};

export default ClassDetails;
