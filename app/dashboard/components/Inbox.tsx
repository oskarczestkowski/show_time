import React, { useEffect, useState } from "react";
import { Message, UserRole } from "@/types/types"; // Ensure this path is correct
import SendMessageBox from "./sendMessageBox";

interface InboxProps {
  userId: string;
  userRole: UserRole; // Add userRole prop
}

const Inbox: React.FC<InboxProps> = ({ userId, userRole }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [replyReceiverId, setReplyReceiverId] = useState<string | null>(null);

  useEffect(() => {
    console.log('Inbox component mounted');
    console.log('User ID:', userId);

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
        console.log(userRole)
        console.log('Fetched messages:', data);
      } catch (error) {
        console.error('Error fetching messages:', error);
        setError('Failed to fetch messages');
      }
    };

    fetchMessages();
  }, [userId]);

  return (
    <div style={{ backgroundColor: 'white', color: 'black' }}>
      <h2>Inbox</h2>
      {error && <p className="text-red-500">{error}</p>}
      {messages.length > 0 ? (
        <ul>
          {messages.map((message) => (
            <li key={message.id} style={{ marginBottom: '10px' }}>
              <p>From: {message.sender_email}</p>
              <p>{message.message}</p>
              <p>{new Date(message.created).toLocaleString()}</p>
              <button onClick={() => setReplyReceiverId(message.sender_id)}>Reply</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No messages</p>
      )}
      {replyReceiverId && (
        <SendMessageBox 
          receiverId={replyReceiverId} 
          senderRole={userRole}
          onMessageSent={() => setReplyReceiverId(null)} 
        />
      )}
    </div>
  );
};

export default Inbox;
