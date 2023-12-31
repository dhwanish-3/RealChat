import React from 'react';
import './App.css';

import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './Backend/Firebase';

import SignIn from './Components/SignIn';
import SignOut from './Components/SignOut';
import ChatRoom from './Components/ChatRoom';

function App() {
  const [user] = useAuthState(auth);
  return (
    <div className="App">
      <header className="App-header">
        <h1>⚛️🔥💬</h1>
        <SignOut />
      </header>
      <section>
        {user ? <ChatRoom/> : <SignIn />}
      </section>
    </div>
  );
}

export default App;
