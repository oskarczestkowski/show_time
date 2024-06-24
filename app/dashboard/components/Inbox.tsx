// components/Inbox.tsx
import React, { useEffect, useState } from "react";
import { Message, UserRole } from "@/types/types";
import SendReplyBox from "./sendReplyBox";
import GetOrganizerProfile from "./GetOrganizerProfile";
import GetArtistProfile from "./GetArtistProfile";

interface InboxProps {
  userId: string;
  userRole: UserRole;
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
    <div className="text-white p-1">
      <h2 className="text-center text-2xl">Inbox</h2>
      {error && <p className="text-red-500">{error}</p>}
      {messages.length > 0 ? (
        <ul className="flex flex-col gap-1  overflow-y-scroll h-[32rem]">
          {messages.map((message) => (
            <li key={message.id} style={{ marginBottom: '10px' }}>
              <p>From: {message.sender_email}</p>
              <p>{message.message}</p>
              <p>{new Date(message.created).toLocaleString()}</p>
              <button className="btn" onClick={() => setReplyReceiverId(message.sender_id)}>Reply</button>
              {userRole === "artist" ? (
                <GetOrganizerProfile organizerId={message.sender_id} />
              ) : (
                <GetArtistProfile artistId={message.sender_id} />
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p>No messages</p>
      )}
      {replyReceiverId && (
        <SendReplyBox
          receiverId={replyReceiverId}
          senderRole={userRole}
          context="inbox"  // Pass the context
          onMessageSent={() => setReplyReceiverId(null)}
        />
      )}
    </div>
  );
};

export default Inbox;
