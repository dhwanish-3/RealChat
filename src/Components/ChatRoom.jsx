import React, { useEffect, useRef, useState } from "react";

import { useCollectionData } from "react-firebase-hooks/firestore";

import ChatMessage from "./ChatMessage";

import { Timestamp, doc, setDoc } from "firebase/firestore";
import { Query, auth, banEvilUser, db, isBanned } from "../Backend/Firebase";

import Filter from "bad-words";

let badCount = 0;
let ban = false;

const ChatRoom = () => {
  const [Instruction, setInstruction] = useState("say something nice");
  useState(async () => {
    ban = await isBanned();
    console.log(ban);
    if (ban) {
      console.log("Setting ..");
      setInstruction("You have been banned for life.");
    }
  });

  useEffect(() => {
    if (badCount === 1) {
      setInstruction("Please be respectful to others");
      console.log("1 = count");
    } else if (badCount === 2) {
      setInstruction("You have been warned...");
      console.log("2 = count");
    } else if (badCount >= 2) {
      setInstruction("You have been banned for life.");
      ban = true;
      console.log("3 = count");
      banEvilUser();
      console.log("banned you...");
    }
  }, []);

  const detectEvilUser = async (text) => {
    console.log(ban);
    if (ban) {
      setInstruction("You have been banned for life.");
      console.log("You were banned already");
      return true;
    }

    const filter = new Filter();

    if (filter.isProfane(text)) {
      badCount = badCount + 1;
      console.log("badword count = ", badCount);
      return true;
    } else {
      setInstruction("say something nice");
      return false;
    }
  };

  const dummy = useRef();

  const [messages] = useCollectionData(Query, { idField: "id" });

  const [formValue, setFormValue] = useState("");

  const sendMessage = async (e) => {
    e.preventDefault();
    console.log(auth.currentUser.uid);
    const { uid, photoURL } = auth.currentUser;
    // clearing text after sending
    setFormValue("");
    let evil = await detectEvilUser(formValue);
    if (!evil) {
      await setDoc(doc(db, "messages", Timestamp.now().toString()), {
        text: formValue,
        createdAt: Timestamp.now(),
        uid,
        photoURL,
      });
    }

    dummy.current.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <div>
      <main
        onChange={(e) => dummy.current.scrollIntoView({ behavior: "smooth" })}
        onLoad={(e) => dummy.current.scrollIntoView({ behavior: "smooth" })}
      >
        {messages &&
          messages.map((msg) => (
            <ChatMessage key={msg.createdAt} message={msg} />
          ))}
        <div ref={dummy}></div>
      </main>
      <form onSubmit={sendMessage}>
        <input
          value={formValue}
          onChange={(e) => setFormValue(e.target.value)}
          placeholder={Instruction}
        />
        <button type="submit" disabled={!formValue}>
          🕊️
        </button>
      </form>
    </div>
  );
};

export default ChatRoom;
