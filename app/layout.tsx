import type { Metadata } from 'next';
import { Toaster } from 'react-hot-toast';
import './globals.css';

export const metadata: Metadata = {
  title: 'AptiQuiz — Real-Time Quiz Battle',
  description: 'Join a real-time quiz battle. Answer fast, climb the leaderboard, win!',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>
        {children}
        <Toaster
          position="top-center"
          toastOptions={{
            style: {
              background: '#1e1b4b',
              color: '#fff',
              border: '1px solid rgba(255,255,255,0.15)',
              fontFamily: 'Rubik, sans-serif',
              fontWeight: 600,
            },
          }}
        />
      </body>
    </html>
  );
}
