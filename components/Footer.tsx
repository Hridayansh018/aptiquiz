'use client';

import React from 'react';
import { Zap } from 'lucide-react';

interface FooterProps {
  onOpenRules?: () => void;
  onOpenHostGuide?: () => void;
  onToggleAudioModal?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenRules,
  onOpenHostGuide,
  onToggleAudioModal,
}) => {
  return (
    <footer className="relative z-10 w-full bg-[#0e082a]/90 backdrop-blur-md border-t border-white/5 mt-12 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Brand Lockup */}
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-full bg-[#7359f8] flex items-center justify-center shadow-md">
            <Zap className="w-4 h-4 text-white fill-white" />
          </div>
          <span className="font-['Rubik'] font-bold text-base text-white">AptiQuiz</span>
          <span className="text-xs text-[#c9c4d8]/80 font-medium">• Powered by Quitzo Engine</span>
        </div>

        {/* Links */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-[#c9c4d8]">
          <button
            onClick={onOpenRules}
            className="hover:text-white transition-colors cursor-pointer"
          >
            Rules & Scoring
          </button>
          <a
            href="#privacy"
            onClick={(e) => {
              e.preventDefault();
              alert('Quitzo AptiQuiz conforms to strict collegiate privacy and proctoring sandbox guidelines.');
            }}
            className="hover:text-white transition-colors"
          >
            Privacy Policy
          </a>
          <button
            onClick={onToggleAudioModal}
            className="hover:text-white transition-colors cursor-pointer"
          >
            Audio Settings
          </button>
          <button
            onClick={onOpenHostGuide}
            className="hover:text-white transition-colors cursor-pointer"
          >
            Host Guide
          </button>
        </div>

        {/* Copyright */}
        <div className="text-xs text-[#c9c4d8]/70">
          © 2025 Quitzo AptiQuiz. All rights reserved.
        </div>

      </div>
    </footer>
  );
};
