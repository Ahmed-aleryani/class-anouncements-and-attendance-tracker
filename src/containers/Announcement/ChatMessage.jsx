import React from 'react';

const ChatMessage=(props) =>{
    const { user, body, uid, photoURL, createdAt } = props.message;
    const messageClass = uid === props.auth.currentUser.uid ? 'flex-row-reverse' : 'flex-row';
    const messageBodyClass = uid === props.auth.currentUser.uid ? 'sent-message-bg text-right' : 'received-message-bg';
    const imageClass = uid === props.auth.currentUser.uid ? 'ml-2' : 'mr-2';
    const formatter = new Intl.DateTimeFormat("en-GB", { dateStyle: 'full', timeStyle: 'long' });
      return (
        <div className={`px-3 py-2 flex no-wrap items-start ${messageClass}`}>
          <div>
            <img className={`block rounded-full object-cover w-10 ${imageClass}`} src={photoURL || 'https://i.imgur.com/rFbS5ms.png'} alt="{user}'s pfp" />
          </div>
          <div className={`block w-80 break-words p-2 rounded-md ${messageBodyClass}`}>
            <p className="text-xs">{user}</p>
            <p>{body}</p>
            {(()=>{
                if(createdAt!=null)
                    return(
                        <p className="text-xs">{formatter.format(new Date(createdAt.seconds*1000))}</p>
                    )
            })()}
          </div>
        </div>
    )
  }
  
  export default ChatMessage;