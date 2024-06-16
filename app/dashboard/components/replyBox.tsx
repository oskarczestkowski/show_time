// components/ReplyBox.tsx
"use client";
import React, { useState } from 'react';
import ReactDOM from 'react-dom';

interface ReplyBoxProps {
  receiverId: string;
  onClose: () => void;
  onMessageSent: () => void;
}

const ReplyBox: React.FC<ReplyBoxProps> = ({ receiverId, onClose, onMessageSent }) => {
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
      onClose();
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return ReactDOM.createPortal(
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
      <div className="bg-white p-4 rounded shadow-lg">
        <button onClick={onClose} className="absolute top-0 right-0 p-2">X</button>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Message</label>
            <textarea value={message} onChange={(e) => setMessage(e.target.value)} required />
          </div>
          <button type="submit">Send</button>
        </form>
      </div>
    </div>,
    document.getElementById('modal-root')!
  );
};

export default ReplyBox;
