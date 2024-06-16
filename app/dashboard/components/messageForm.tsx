// messageForm.tsx
import React, { useState } from 'react';

interface MessageFormProps {
  receiverId: string;
  onMessageSent: () => void;
}

const MessageForm: React.FC<MessageFormProps> = ({ receiverId, onMessageSent }) => {
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const senderId = localStorage.getItem('user_id');
    if (!senderId) {
      console.error('Sender ID is missing');
      return;
    }

    try {
      console.log('Sending message:', { sender_id: senderId, receiver_id: receiverId, message });

      const response = await fetch('/api/dashboard/messages/sendMessage', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sender_id: senderId, receiver_id: receiverId, message }),
      });

      const data = await response.json();
      console.log('Server response:', data);

      if (!response.ok) {
        console.error('Failed to send message:', data);
        return;
      }

      onMessageSent();
      setMessage(''); // Clear the message input
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Message</label>
        <textarea value={message} onChange={(e) => setMessage(e.target.value)} required />
      </div>
      <button type="submit">Send</button>
    </form>
  );
};

export default MessageForm;
