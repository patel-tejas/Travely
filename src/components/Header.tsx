"use client";

import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import Link from 'next/link'
import React, { useState, useEffect } from 'react'

const Header = () => {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        let ticking = false;
        const handleScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    setScrolled(window.scrollY > 50);
                    ticking = false;
                });
                ticking = true;
            }
        };
        window.addEventListener("scroll", handleScroll, { passive: true });
        handleScroll();
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div className={`fixed top-0 w-full z-50 pointer-events-none transition-all duration-700 ease-in-out ${scrolled ? 'pt-4' : 'pt-0'}`}>
            <header className={`mx-auto pointer-events-auto transition-all duration-700 ease-in-out ${scrolled ? 'max-w-[90%] sm:max-w-7xl px-4' : 'max-w-full px-0'}`}>
                <div className={`flex items-center justify-between transition-all duration-500 ease-in-out ${scrolled ? 'h-16 bg-white/95 backdrop-blur-xl rounded-full shadow-[0_8px_30px_rgba(0,0,0,0.08)] border border-slate-200/80 px-6 sm:px-10' : 'h-20 bg-[#faf9f6]/95 backdrop-blur-md border-b border-orange-900/5 px-4 sm:px-6 lg:px-8'}`}>
                    
                    <div className="flex items-center gap-2">
                        <Link className="flex items-center gap-2 text-orange-600 hover:text-orange-700 transition" href="/">
                            <span className="drop-shadow-sm text-2xl">🌅</span>
                            <span className="font-extrabold tracking-tight text-xl">TripGuruji</span>
                        </Link>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="flex gap-2 sm:gap-4 items-center">
                            <SignedIn>
                                <Link href="/create-trip" className="font-bold text-white bg-gradient-to-r from-orange-500 to-rose-500 hover:from-orange-600 hover:to-rose-600 rounded-full shadow-md hover:shadow-lg hidden sm:block px-5 py-2 text-sm transition-all">
                                    + Plan Trip
                                </Link>
                                <Link href="/my-trips" className="font-bold text-orange-600 hover:text-orange-700 bg-orange-50 hover:bg-orange-100 rounded-full border border-orange-100 hidden sm:block px-5 py-2 text-sm transition-colors">
                                    My Trips
                                </Link>
                                <div className="ml-2 shrink-0">
                                    <UserButton />
                                </div>
                            </SignedIn>
                            <SignedOut>
                                <Link
                                    className="rounded-full bg-orange-500 hover:bg-orange-600 font-bold text-white shadow-sm hover:shadow-[0_4px_20px_rgba(249,115,22,0.3)] px-6 py-2 text-sm transition-all"
                                    href="/sign-in"
                                >
                                    Log In
                                </Link>
                            </SignedOut>
                        </div>
                    </div>
                </div>
            </header>
        </div>
    )
}

export default Header