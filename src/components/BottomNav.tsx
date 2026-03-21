"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { SignedIn, SignedOut } from '@clerk/nextjs';
import { Home, PlusSquare, Map, User } from 'lucide-react';

const BottomNav = () => {
  const pathname = usePathname();

  const navItems = [
    { label: 'Home', icon: Home, path: '/' },
    { label: 'Plan', icon: PlusSquare, path: '/create-trip' },
    { label: 'My Trips', icon: Map, path: '/my-trips' },
    { label: 'Login', icon: User, path: '/sign-in', signedOutOnly: true },
  ];

  return (
    <nav className="sm:hidden fixed bottom-0 left-0 right-0 z-[60] bg-white/80 backdrop-blur-xl border-t border-slate-200 px-6 pb-6 pt-3 shadow-[0_-8px_30px_rgba(0,0,0,0.05)]">
      <div className="flex items-center justify-between max-w-md mx-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.path;
          const Icon = item.icon;

          if (item.signedOutOnly) {
            return (
              <SignedOut key={item.path}>
                <Link
                  href={item.path}
                  className={`flex flex-col items-center gap-1 transition-all duration-300 ${
                    isActive ? 'text-orange-500 scale-110' : 'text-slate-400 hover:text-slate-600'
                  }`}
                >
                  <Icon className={`w-6 h-6 ${isActive ? 'fill-orange-500/10' : ''}`} />
                  <span className="text-[10px] font-bold uppercase tracking-widest">{item.label}</span>
                </Link>
              </SignedOut>
            );
          }

          return (
            <Link
              key={item.path}
              href={item.path}
              className={`flex flex-col items-center gap-1 transition-all duration-300 ${
                isActive ? 'text-orange-500 scale-110' : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              <Icon className={`w-6 h-6 ${isActive ? 'fill-orange-500/10' : ''}`} />
              <span className="text-[10px] font-bold uppercase tracking-widest">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
