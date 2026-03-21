"use client"
import Link from 'next/link'
import React from 'react'

const Hero = () => {
    return (
        <section className="relative overflow-hidden bg-[#faf9f6] min-h-[90vh] pb-24">
            {/* Decorative background blobs */}
            <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/3 w-[800px] h-[800px] bg-orange-400/20 rounded-full blur-[120px] mix-blend-multiply pointer-events-none"></div>
            <div className="absolute top-1/4 left-0 -translate-x-1/2 w-[600px] h-[600px] bg-rose-400/20 rounded-full blur-[120px] mix-blend-multiply pointer-events-none"></div>

            <div className="relative mx-auto max-w-screen-xl px-4 pt-8 sm:pt-12 lg:px-8">
                <div className="mx-auto max-w-3xl text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-100 text-orange-700 font-semibold text-sm mb-8 border border-orange-200 shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-700">
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
                        </span>
                        AI-POWERED ITINERARIES
                    </div>

                    <h1 className="text-5xl font-black text-slate-900 sm:text-6xl lg:text-8xl tracking-tighter mb-6 leading-[1.1] drop-shadow-sm">
                        Discover your next <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-rose-500 to-amber-500">
                            Great Adventure.
                        </span>
                    </h1>

                    <p className="mx-auto mt-6 max-w-xl text-lg sm:text-xl text-slate-600 leading-relaxed mb-12 font-medium">
                        Stop stressing over planning. Enter your preferences and let our AI curate the perfect, personalized travel itinerary in seconds.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link
                            href="/create-trip"
                            className="group relative flex w-full sm:w-auto items-center justify-center gap-3 rounded-full bg-orange-500 px-8 py-4 text-white font-bold text-lg shadow-[0_8px_30px_rgba(249,115,22,0.3)] transition-all duration-300 hover:scale-105 hover:shadow-[0_12px_40px_rgba(249,115,22,0.4)] overflow-hidden"
                        >
                            <span className="relative z-10">Start Planning Free</span>
                            <svg className="w-6 h-6 relative z-10 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                            
                            {/* Shiny overlay effect */}
                            <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-[150%] skew-x-[-45deg] group-hover:animate-[shine_1.5s_ease-in-out]"></div>
                        </Link>
                    </div>
                </div>
            </div>
            
            <style jsx>{`
                @keyframes shine {
                    100% { transform: translateX(150%) skewX(-45deg); }
                }
            `}</style>
        </section>
    )
}

export default Hero