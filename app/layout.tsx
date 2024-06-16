'use client';

import './globals.css';
import { UserProvider } from './contexts/UserContext';
import { ReactNode, useEffect } from 'react';

export default function RootLayout({ children }: { children: ReactNode }) {
  useEffect(() => {
    const modalRoot = document.createElement('div');
    modalRoot.id = 'modal-root';
    document.body.appendChild(modalRoot);

    return () => {
      const element = document.getElementById('modal-root');
      if (element) {
        document.body.removeChild(element);
      }
    };
  }, []);

  return (
    <html lang="en">
      <head>
        <title>Showtime</title>
      </head>
      <body>
        <UserProvider>
          {children}
          <div id="modal-root" />
        </UserProvider>
      </body>
    </html>
  );
}
