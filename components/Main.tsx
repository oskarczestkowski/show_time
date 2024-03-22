import { ReactNode } from 'react';

interface MainProps {
  children: ReactNode;
}

export default function Main({ children }: MainProps) {
  return (
    <main className="min-h-screen flex flex-col items-center mt-16">
      {children}
    </main>
  );
}
