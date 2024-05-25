// MessageList.js

import React from "react";

const MessageList = ({ messages }) => {
    return (
        <div className={'cd'}>
            <div className="messageList">
                {messages.map((message, index) => (
                    <div key={index} className={`message ${message.sender}`}>
                        {message.sender === "receiver" ? (
                            <div className={'cr'}>
                                <div className="messageText">{message.text}</div>
                                <div className="messageTime" style={{color: '#888'}}>{message.time}</div>
                            </div>
                        ) : (
                            <div className={'cr'}>
                                <div className="messageTime" style={{color: 'rgb(231,231,231)'}}>{message.time}</div>
                                <div className="messageText">{message.text}</div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MessageList;