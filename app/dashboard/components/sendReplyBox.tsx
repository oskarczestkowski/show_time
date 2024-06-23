// components/SendMessageBox.tsx
import React, { useState } from 'react';
import { UserRole } from '@/types/types';

interface SendReplyBoxProps {
  receiverId: string;
  senderRole: UserRole;
  context: string; // Add context prop
  onMessageSent: () => void;
}

const SendReplyBox: React.FC<SendReplyBoxProps> = ({ receiverId, senderRole, context, onMessageSent }) => {
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const senderId = localStorage.getItem('user_id');
    if (!senderId) {
      console.error('Sender ID is missing');
      return;
    }

    try {
      console.log('Sending message:', { sender_id: senderId, receiver_id: receiverId, sender_role: senderRole, message, context });

      const response = await fetch('/api/dashboard/messages/sendReplies', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sender_id: senderId, receiver_id: receiverId, sender_role: senderRole, message, context }),
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
    <div className="send-message-box border-t border-white">
      <form onSubmit={handleSubmit}>
        <div className='flex flex-col justify-center items-center gap-2 p-1'>
          <label>Message</label>
          <textarea className='border w-full border-white rounded-md text-black p-1'
            rows={4}
            value={message} onChange={(e) => setMessage(e.target.value)} required />
          <button type="submit" className='btn'>Send</button>

        </div>
      </form>
    </div>
  );
};

export default SendReplyBox;
