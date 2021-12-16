import React, { useEffect, useRef, useState } from 'react';
import firebase from '../../firebase.config';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import ChatMessage from './ChatMessage';
import Send from '@material-ui/icons/Send'

const firestore = firebase.firestore();

const ChatRoom = ({Props,auth,roomType,topicID})=> {
  const dummy = useRef();
  const messagesRef = firestore.collection('Discussions').doc(roomType).collection(topicID);
  const query = messagesRef.orderBy('createdAt', 'asc').limitToLast(100);

  const [messages] = useCollectionData(query, {idField: 'id'});
  const [formValue, setFormValue] = useState('');

  const scrollToBottom = () => {
    dummy.current.scrollIntoView({ behavior: 'smooth' });
  }

  useEffect(scrollToBottom, [messages]);

  const sendMessage = async (e) => {
    e.preventDefault();

    const { displayName, uid, photoURL } = auth.currentUser;

    await messagesRef.add({
      user: displayName,
      body: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid: uid,
      photoURL: photoURL
    })

    setFormValue('');
    dummy.current.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <div className="chat-bg w-full sm:w-2/3 p-2 rounded-b-xl">
      <div className="overflow-y-auto h-screen-90">
        { messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} auth={auth}/>)}
        <span ref={dummy}></span>
      </div>

      <form onSubmit={sendMessage} className="pt-3 w-full inline-flex mb-10">
        <input className="rounded-3xl px-3 w-full py-1 outline-none focus:shadow" value={formValue} onChange={(e) => setFormValue(e.target.value)} placeholder="Say something" />
        <button className={`pb-3 pt-2 pl-4 pr-3 mx-2 bg-white rounded-full transition-all duration-75 ease-in-out text-xl ${!formValue || 'text-pink-700 hover:text-pink-900'}`} type="submit" disabled={!formValue}><Send className="text-secondary-100"/></button>
      </form>
    </div>
  )
}

export default ChatRoom;