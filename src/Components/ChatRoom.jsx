import React, { useRef, useState, useEffect } from "react";

import { useCollectionData } from "react-firebase-hooks/firestore";

import ChatMessage from "./ChatMessage";

import { Query, auth, banEvilUser, db, isBanned } from "../Backend/Firebase";
import { doc, setDoc, Timestamp } from "firebase/firestore";

import Filter from "bad-words";

let badCount = 0;
let Instruction = "say something nice";
let ban = false;

const ChatRoom = () => {

    useState(async() =>{
        ban =  await isBanned();
        console.log(ban);
        if (ban) {
            console.log("Setting ..");
            Instruction = "You have been banned for life.";
        }
    });

    useEffect(() => {
        if (ban) {
            Instruction = "You have been banned for life.";
        } else if (badCount == 1) {
            Instruction = "Please be respectful to others";
            console.log("1 = count");
        } else if (badCount == 2) {
            Instruction = "You have been warned...";
            console.log("2 = count");
        } else if (badCount >= 2) {
            Instruction = "You have been banned for life.";
            ban = true;
            console.log("3 = count");
            banEvilUser();
            console.log("banned you...");       
        }
    }, [badCount]);

    const detectEvilUser = async (text) => {
        console.log(ban);
        if (ban) {
            Instruction = "You have been banned for life.";
            console.log("You were banned already");
            return true;
        }

        const filter = new Filter();

        if (filter.isProfane(text)) {
            badCount = badCount + 1;
            console.log("badword count = ",badCount);
            return true;
        } else {
            Instruction = "say something nice";
            return false;
        }
    }

    const dummy = useRef();

    const [messages] = useCollectionData(Query, {idField: 'id'});

    const [formValue, setFormValue] = useState('');

    const sendMessage = async(e) => {
        e.preventDefault();
        console.log(auth.currentUser.uid);
        const { uid, photoURL } = auth.currentUser;
        let evil = await detectEvilUser(formValue);
        if (!evil) {
            await setDoc(doc(db,"messages",Timestamp.now().toString()), {
                text: formValue,
                createdAt: Timestamp.now(),
                uid,
                photoURL
            });
        }
        setFormValue('');

        dummy.current.scrollIntoView({ behavior: 'smooth' });
    }
    return (
        <div>
            <main>
                {messages && messages.map(msg => <ChatMessage key={msg.createdAt} message={msg}/>)}
                <div ref={dummy}></div>
            </main>
            <form onSubmit={sendMessage}>
                <input value={formValue} onChange={(e) => setFormValue(e.target.value)} placeholder={Instruction}/>
                <button type="submit" disabled={!formValue}>🕊️</button>
            </form>
        </div>
    );
}

export default ChatRoom;