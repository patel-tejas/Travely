import React from 'react'
import { PlaceImage } from './PlaceImage';

interface TripHeaderProps {
    days: string;
    budget: string;
    people: string;
    destination: string;
}

const TripHeader: React.FC<TripHeaderProps> = ({ days, budget, people, destination }) => {
    return (
        <article className="relative w-full h-[60vh] min-h-[500px] flex flex-col justify-end overflow-hidden bg-stone-50">
            {/* Immersive Bright Background */}
            <div className="absolute inset-0 w-full h-full z-0">
                <PlaceImage query={destination + " landscape sun"} className="w-full h-full object-cover scale-105 animate-[pulse_20s_ease-in-out_infinite_alternate]" />
            </div>

            {/* Gradient Mask fading into the light theme container */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#faf9f6] via-[#faf9f6]/40 to-black/20 z-10"></div>

            {/* Content Container */}
            <div className="relative z-20 w-full px-6 sm:px-12 max-w-7xl mx-auto pb-12 sm:pb-20 flex flex-col items-center text-center">
                
                {/* Micro Label */}
                <div className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 bg-white/60 backdrop-blur-md rounded-full shadow-sm border border-white">
                    <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></span>
                    <span className="text-xs font-bold tracking-[0.2em] text-orange-600 uppercase">Your Curated Journey</span>
                </div>

                <h1 className="text-4xl sm:text-6xl lg:text-8xl font-black text-slate-900 mb-10 tracking-tighter leading-none drop-shadow-sm">
                    {destination}
                </h1>

                {/* Elegant Glassmorphic Data Chips */}
                <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6 text-sm font-semibold w-full">
                    <div className="flex items-center gap-4 bg-white/80 backdrop-blur-xl px-6 py-4 rounded-3xl border border-white shadow-[0_8px_30px_rgba(0,0,0,0.04)] transition-transform hover:scale-105 hover:-translate-y-1 cursor-default">
                        <span className="text-2xl bg-orange-50 text-orange-600 p-2.5 rounded-2xl">🗓️</span> 
                        <div className="flex flex-col text-left">
                            <span className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">Duration</span>
                            <span className="text-slate-800 text-lg">{days} Days</span>
                        </div>
                    </div>
                    
                    <div className="flex items-center gap-4 bg-white/80 backdrop-blur-xl px-6 py-4 rounded-3xl border border-white shadow-[0_8px_30px_rgba(0,0,0,0.04)] transition-transform hover:scale-105 hover:-translate-y-1 cursor-default">
                        <span className="text-2xl bg-amber-50 text-amber-500 p-2.5 rounded-2xl">💰</span> 
                        <div className="flex flex-col text-left">
                            <span className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">Budget</span>
                            <span className="text-slate-800 text-lg">{budget}</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 bg-white/80 backdrop-blur-xl px-6 py-4 rounded-3xl border border-white shadow-[0_8px_30px_rgba(0,0,0,0.04)] transition-transform hover:scale-105 hover:-translate-y-1 cursor-default">
                        <span className="text-2xl bg-rose-50 text-rose-500 p-2.5 rounded-2xl">✈️</span> 
                        <div className="flex flex-col text-left">
                            <span className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">Travelers</span>
                            <span className="text-slate-800 text-lg">{people}</span>
                        </div>
                    </div>
                </div>

            </div>
        </article>
    )
}

export default TripHeader