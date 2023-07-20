import {firestore} from "firebase-functions";
import Filter from "bad-words";

import {initializeApp, firestore as _firestore} from "firebase-admin";
initializeApp();

const db = _firestore();

export const detectEvilUsers = firestore
    .document("messages/{msgId}")
    .onCreate( async (doc, context) => {
      const filter = new Filter();
      const {text, uid} = doc.data();

      if (filter.isProfane(text)) {
        const cleaned = filter.clean(text);
        await doc.ref.update({text: `I got banned for life for 
        saying... ${cleaned}`});
        await db.collection("banned").doc(uid).set({});
      }
    });
