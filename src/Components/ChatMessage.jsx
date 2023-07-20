import { auth } from "../Backend/Firebase";

const ChatMessage = (props) => {
    const { text, uid, photoUrl} = props.message;
    const messageClass = uid === auth.currentUser.uid ? 'sent' : 'recieved';
    return (
        <div className={`message ${messageClass}`}>
            <img src={photoUrl}></img>
            <p>{text}</p>
        </div>
    );
}

export default ChatMessage;