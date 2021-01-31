import React from "react";
import firebase from "../../firebase.config";
import { useAuthState } from "react-firebase-hooks/auth";
import ChatRoom from "./ChatRoom";
import "./Announcement.css";

const auth = firebase.auth();

const Announcement = (Props) => {
  const [user] = useAuthState(auth);

  return (
    <div className="App border-bg h-auto sm:h-screen">
      <section className="flex flex-col justify-center items-center h-auto sm:h-screen">
        <div className="chat-bg w-full sm:w-2/3 p-2 rounded-t-xl">
            <h2 className="text-white text-2xl">Exam next week</h2>
            <p className="text-white text-xl">Exam next monday at 10 Am</p>
        </div>
        <hr/>
        {user ? (
          <ChatRoom {...Props} user={user} auth={auth} roomType="Announcements" topicID="gege" />
        ) : (
          <SignInRequired />
        )}
      </section>
    </div>
  );
};

const SignInRequired = () => {
  return (
    <div>
      <h1 className="text-primary-100 text-4xl">You have to sign in first!</h1>
    </div>
  );
};

export default Announcement;
