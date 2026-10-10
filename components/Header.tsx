'use client';

import React from 'react';
import {
  Zap,
  Award,
  User,
  Menu,
  Volume2,
  VolumeX,
  X,
  Radio,
  Tv,
  Users,
  Trophy,
  Sliders,
  Home as HomeIcon
} from 'lucide-react';
import { sound } from '@/lib/audio';

export type ActiveTab = 'home' | 'quiz-arena' | 'lobby' | 'leaderboard' | 'host-console' | 'projector';

interface HeaderProps {
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
  roomCode: string;
  userXP: number;
  soundEnabled: boolean;
  onToggleSound: () => void;
  onOpenProfile: () => void;
  onOpenRoomModal: () => void;
  clusterWorkerId?: number | null;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  onTabChange,
  roomCode,
  userXP,
  soundEnabled,
  onToggleSound,
  onOpenProfile,
  onOpenRoomModal,
  clusterWorkerId,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const handleTabClick = (tab: ActiveTab) => {
    sound.playClick();
    onTabChange(tab);
    setMobileMenuOpen(false);
  };

  const navItems: { id: ActiveTab; label: string; icon: React.ReactNode }[] = [
    { id: 'home', label: 'Home', icon: <HomeIcon className="w-4 h-4" /> },
    { id: 'quiz-arena', label: 'Quiz Arena', icon: <Zap className="w-4 h-4" /> },
    { id: 'lobby', label: 'Lobby', icon: <Users className="w-4 h-4" /> },
    { id: 'leaderboard', label: 'Leaderboard', icon: <Trophy className="w-4 h-4" /> },
    { id: 'projector', label: 'Projector', icon: <Tv className="w-4 h-4" /> },
  ];

  return (
    <>
      <header className="fixed top-0 w-full z-50 bg-[#0e082a]/85 backdrop-blur-xl border-b border-white/5 shadow-[0_1px_8px_rgba(0,0,0,0.35)]">
        <div className="h-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 flex items-center justify-between gap-4">
          
          {/* Left Brand & Room Pill */}
          <div className="flex items-center gap-3 sm:gap-4">
            <button
              onClick={() => handleTabClick('home')}
              className="flex items-center gap-2 group text-left transition-transform active:scale-95 cursor-pointer"
            >
              <div className="w-10 h-10 rounded-full bg-[#7359f8] flex items-center justify-center shadow-[0_2px_12px_rgba(115,89,248,0.5)] group-hover:brightness-110 transition-all">
                <Zap className="w-5 h-5 text-white fill-white" />
              </div>
              <div className="flex flex-col">
                <span className="font-['Rubik'] font-black text-lg text-white leading-none tracking-tight">
                  QUITZO
                </span>
                <span className="font-['Rubik'] text-[10px] text-[#c8bfff] tracking-widest font-extrabold uppercase leading-none mt-1">
                  APTIQUIZ
                </span>
              </div>
            </button>

            {/* Room Indicator Pill */}
            <button
              onClick={onOpenRoomModal}
              title="Click to view or edit Room PIN"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#2a2547] hover:bg-[#353053] transition-colors border border-white/10 shadow-inner group"
            >
              <span className="w-2 h-2 rounded-full bg-[#c8bfff] animate-pulse"></span>
              <span className="text-[12px] font-bold text-[#c9c4d8] tracking-wider uppercase">ROOM:</span>
              <span className="text-sm font-extrabold text-white tracking-widest group-hover:text-[#c8bfff] transition-colors">
                {roomCode}
              </span>
            </button>
          </div>

          {/* Desktop Navigation Tabs */}
          <nav className="hidden lg:flex items-center gap-1 p-1.5 rounded-full bg-[#1c1738] border border-white/5">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleTabClick(item.id)}
                  className={`px-4 py-2 rounded-full text-sm font-bold transition-all flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-[#7359f8] text-white shadow-[0_2px_10px_rgba(115,89,248,0.45)]'
                      : 'text-[#c9c4d8] hover:text-white hover:bg-[#2a2547]'
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Action Bar */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Audio Toggle */}
            <button
              onClick={onToggleSound}
              title={soundEnabled ? 'Mute Audio FX' : 'Enable Audio FX'}
              className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${
                soundEnabled
                  ? 'bg-[#201b3c] text-[#c8bfff] hover:bg-[#2a2547]'
                  : 'bg-[#201b3c]/60 text-white/40 hover:text-white hover:bg-[#201b3c]'
              }`}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>

            {/* XP Pill */}
            <div className="hidden md:flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#201b3c] border border-white/5">
              <Award className="w-4 h-4 text-[#c8bfff]" />
              <span className="text-sm font-bold text-[#c8bfff] tracking-wide">
                {userXP.toLocaleString()} XP
              </span>
            </div>

            {/* User Profile Button */}
            <button
              onClick={onOpenProfile}
              aria-label="User Profile"
              className="w-9 h-9 rounded-full bg-[#c8bfff] hover:brightness-110 text-[#2d009d] flex items-center justify-center transition-all shadow-md active:scale-95"
            >
              <User className="w-4 h-4 stroke-[2.5]" />
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Mobile Menu"
              className="lg:hidden w-9 h-9 rounded-full bg-[#201b3c] flex items-center justify-center text-white hover:bg-[#2a2547] transition-all"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#0e082a]/95 border-b border-white/10 px-4 py-4 backdrop-blur-2xl flex flex-col gap-2">
            <div className="flex items-center justify-between px-2 py-1 mb-2 border-b border-white/5">
              <span className="text-xs font-semibold text-[#c9c4d8]">ROOM: {roomCode}</span>
              <span className="text-xs font-bold text-[#c8bfff]">{userXP.toLocaleString()} XP</span>
            </div>
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleTabClick(item.id)}
                  className={`px-4 py-2.5 rounded-full text-sm font-bold text-left flex items-center gap-2.5 transition-all ${
                    isActive
                      ? 'bg-[#7359f8] text-white shadow-md'
                      : 'text-[#c9c4d8] hover:text-white hover:bg-[#2a2547]'
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        )}
      </header>
    </>
  );
};
