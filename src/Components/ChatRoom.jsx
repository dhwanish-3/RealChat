import React, { useRef, useState } from "react";
import firebase from "firebase/compat/app";
import { getAuth } from 'firebase/auth';
import { useCollectionData } from "react-firebase-hooks/firestore";
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';

import ChatMessage from "./ChatMessage";

const auth = getAuth();
const db = getFirestore();

const ChatRoom = () => {

    const dummy = useRef();
    const messageRef  = collection(db, 'messages');
    const query = messageRef.orderBy('createdAt').limit(25);
    // const snapShot = await getDocs(messageRef);

    const [messages] = useCollectionData(query, {idField: 'id'});

    const [formValue, setFormValue] = useState('');

    const sendMessage = async(e) => {
        e.preventDefault();
        const { uid, photoUrl } = auth.currentUser;
        
        await messageRef.add({
            text: formValue,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            uid,
            photoUrl
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
                <button type="submit">send</button>
            </form>
        </div>
    );
}

export default ChatRoom;