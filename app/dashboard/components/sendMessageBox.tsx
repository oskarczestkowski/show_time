// components/SendMessageBox.tsx
import React, { useState } from 'react';
import { UserRole } from '@/types/types';

interface SendMessageBoxProps {
  receiverId: string;
  senderRole: UserRole;
  onMessageSent: () => void;
}

const SendMessageBox: React.FC<SendMessageBoxProps> = ({ receiverId, senderRole, onMessageSent }) => {
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const senderId = localStorage.getItem('user_id');
    if (!senderId) {
      console.error('Sender ID is missing');
      return;
    }

    try {
      console.log('Sending message:', { sender_id: senderId, receiver_id: receiverId, sender_role: senderRole, message });

      const response = await fetch('/api/dashboard/messages/sendMessage', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sender_id: senderId, receiver_id: receiverId, sender_role: senderRole, message }),
      });

      const data = await response.json();
      console.log('Server response:', data);

      if (!response.ok) {
        console.error('Failed to send message:', data);
        return;
      }

      onMessageSent();
      setMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div className="send-message-box">
      <form onSubmit={handleSubmit}>
        <div>
          <label>Message</label>
          <textarea value={message} onChange={(e) => setMessage(e.target.value)} required />
        </div>
        <button type="submit" className='bg-red-500 text-white py-2 px-4 rounded'>Send</button>
      </form>
    </div>
  );
};

export default SendMessageBox;
