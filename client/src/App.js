// App.js

import "./App.css";
import io from "socket.io-client";
import { useEffect, useState } from "react";
import MessageList from "./ChatList";

const socket = io.connect("http://localhost:3001");

function App() {
    // Room State
    const [room, setRoom] = useState("");

    // Messages States
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const joinRoom = () => {
        if (room !== "") {
            socket.emit("join_room", room);
        }
    };

    const sendMessage = () => {
        socket.emit("send_message", { message, room });
        setMessages((prevMessages) => [
            ...prevMessages,
            { text: message, sender: "sender" ,time: currentTime }, // Set sender as receiver
        ]);
    };

    useEffect(() => {
        socket.on("receive_message", (data) => {
            setMessages((prevMessages) => [
                ...prevMessages,
                { text: data.message, sender: "receiver", time: currentTime }, // Set sender as receiver
            ]);
        });
    }, [socket]);

    return (
        <div className="App">
            <div className="inputContainer">
                <input
                    placeholder="Room Number..."
                    onChange={(event) => {
                        setRoom(event.target.value);
                    }}
                />
                <button onClick={joinRoom}>Join Room</button>
            </div>
            <MessageList messages={messages} />

            <div className="messageContainer">
                <input
                    className="messageInput"
                    placeholder="Message..."
                    onChange={(event) => {
                        setMessage(event.target.value);
                    }}
                />
                <button className="sendMessageBtn" onClick={sendMessage}>
                    Send Message
                </button>
            </div>
            {/* Integrate the MessageList component */}
        </div>
    );
}

export default App;