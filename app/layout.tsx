import type {Metadata} from 'next';
import { Rubik } from 'next/font/google';
import './globals.css';

const rubik = Rubik({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-rubik',
});

export const metadata: Metadata = {
  title: 'Quitzo AptiQuiz - Live Multiplayer Aptitude Arena',
  description: 'Synchronized real-time multiplayer aptitude quiz arena with live projector display, lobby matchmaking, proctored scratchpad, round reveal breakdowns, and host console.',
  openGraph: {
    title: 'Quitzo AptiQuiz - Live Multiplayer Aptitude Arena',
    description: 'Synchronized real-time multiplayer aptitude quiz arena with live projector display, lobby matchmaking, proctored scratchpad, round reveal breakdowns, and host console.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Quitzo AptiQuiz - Live Multiplayer Aptitude Arena',
    description: 'Synchronized real-time multiplayer aptitude quiz arena with live projector display, lobby matchmaking, proctored scratchpad, round reveal breakdowns, and host console.',
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={`dark ${rubik.variable}`}>
      <body className={`${rubik.className} bg-[#130e2f] text-[#e5deff] min-h-screen relative overflow-x-hidden selection:bg-[#c8bfff] selection:text-[#2d009d]`} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
