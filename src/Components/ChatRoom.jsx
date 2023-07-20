import React, { useRef, useState } from "react";

import { useCollectionData } from "react-firebase-hooks/firestore";

import ChatMessage from "./ChatMessage";

import { Query, messageRef, auth, db } from "../Backend/Firebase";
import { doc, setDoc, Timestamp } from "firebase/firestore";

const ChatRoom = () => {

    const dummy = useRef();

    const [messages] = useCollectionData(Query, {idField: 'id'});

    const [formValue, setFormValue] = useState('');

    const sendMessage = async(e) => {
        e.preventDefault();
        const { uid, photoUrl } = auth.currentUser;
        
        await setDoc(doc(db,"messages",Timestamp.now().toString()), {
            text: formValue,
            createdAt: Timestamp.now(),
            uid,
        });

        setFormValue('');

        dummy.current.scrollIntoView({behavior: "smooth"});
    }
    return (
        <div>
            <div>
                {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg}/>)}
            </div>
            <div ref={dummy}></div>
            <form onSubmit={sendMessage}>
                <input value={formValue} onChange={(e) => setFormValue(e.target.value)}/>
                <button type="submit" disabled={!formValue}>🕊️</button>
            </form>
        </div>
    );
}

export default ChatRoom;