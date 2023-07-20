import React from 'react';
import './App.css';

import 'firebase/firestore';
import 'firebase/auth';

import { useAuthState } from 'react-firebase-hooks/auth';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

import SignIn from './Components/SignIn';
import ChatRoom from './Components/ChatRoom';
import Credentials from './private/Credentials';
import { getFirestore } from 'firebase/firestore';

const app = initializeApp(Credentials);

const auth = getAuth(app);
const db = getFirestore(app);

function App() {
  const [user] = useAuthState(auth);
  return (
    <div className="App">
      <header className="App-header">
        
      </header>
      <section>
        {user ? <ChatRoom/> : <SignIn />}
      </section>
    </div>
  );
}

export default App;
