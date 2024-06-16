// components/Inbox.tsx
"use client";
import React, { useEffect, useState } from "react";
import { Message } from "@/types/types"; // Ensure this path is correct
import ReplyBox from "./replyBox";

interface InboxProps {
  userId: string;
}

const Inbox: React.FC<InboxProps> = ({ userId }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [replyToMessage, setReplyToMessage] = useState<Message | null>(null);

  const fetchMessages = async () => {
    try {
      const response = await fetch('/api/dashboard/messages/getMessage', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'user_id': userId,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch messages');
      }

      const data = await response.json();
      setMessages(data);
      console.log('Fetched messages:', data); // Debugging information
    } catch (error) {
      console.error('Error fetching messages:', error);
      setError('Failed to fetch messages');
    }
  };

  useEffect(() => {
    console.log('Inbox component mounted'); // Debugging information
    console.log('User ID:', userId); // Debugging information

    fetchMessages();
  }, [userId]);

  const handleReply = (message: Message) => {
    setReplyToMessage(message);
  };

  const handleMessageSent = () => {
    setReplyToMessage(null);
    fetchMessages();
  };

  return (
    <div style={{ backgroundColor: 'white', color: 'black' }}> {/* Add some styling */}
      <h2>Inbox</h2>
      {error && <p className="text-red-500">{error}</p>}
      {messages.length > 0 ? (
        <ul>
          {messages.map((message) => (
            <li key={message.id} style={{ marginBottom: '10px' }}> {/* Add some margin */}
              <p>From: {message.sender_email}</p> {/* Show sender's email */}
              <p>{message.message}</p>
              <p>{new Date(message.created).toLocaleString()}</p>
              <button onClick={() => handleReply(message)}>Reply</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No messages</p>
      )}

      {replyToMessage && (
        <ReplyBox
          receiverId={replyToMessage.sender_id}
          onClose={() => setReplyToMessage(null)}
          onMessageSent={handleMessageSent}
        />
      )}
    </div>
  );
};

export default Inbox;
