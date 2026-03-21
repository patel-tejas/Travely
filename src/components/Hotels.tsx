"use client";

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { PlaceImage } from './PlaceImage';
import { chatSession } from '@/lib/AiModel';
import { updateTripData } from '@/lib/action';
import { useRouter } from 'next/navigation';

interface HotelsProps {
    hotels: any[];
    tripId?: string;
    fullTripData?: any;
    userSelection?: any;
}

const Hotels: React.FC<HotelsProps> = ({ hotels, tripId, fullTripData, userSelection }) => {
    const [swappingIdx, setSwappingIdx] = useState<number | null>(null);
    const router = useRouter();

    const bestHotelIdx = useMemo(() => {
        if (!hotels || hotels.length === 0) return 0;
        let maxIdx = 0;
        let maxVal = -1;
        hotels.forEach((h: any, i: number) => {
            const val = parseFloat(h.rating) || parseFloat(h.rating.toString().split(' ')[0]) || 0;
            if (val > maxVal) { maxVal = val; maxIdx = i; }
        });
        return maxIdx;
    }, [hotels]);

    if (!hotels || hotels.length === 0) return null;

    const handleSwap = async (e: React.MouseEvent, idx: number, hotelName: string) => {
        e.preventDefault();
        e.stopPropagation();
        
        if (!tripId || !fullTripData || !userSelection) return;

        setSwappingIdx(idx);

        try {
            const existingHotelNames = hotels.map(h => h.hotelName || h.hotel_name || h.name).join(", ");
            const prompt = `
            Suggest 1 alternative hotel in ${userSelection?.destination?.label} for a ${userSelection?.budget} budget.
            Do NOT suggest any of these: ${existingHotelNames}.
            Return ONLY a valid JSON object matching this exact format:
            {
               "hotelName": "Name",
               "hotelAddress": "Address",
               "price": "Price per night",
               "rating": 4.5,
               "description": "Short description",
               "geoCoordinates": { "latitude": 0, "longitude": 0 }
            }
            `;

            const result = await chatSession.sendMessage(prompt);
            const rawText = result.response.text();
            const cleanJson = rawText.replaceAll("```json", "").replaceAll("```", "").trim();
            const newHotel = JSON.parse(cleanJson);

            const updatedHotels = [...hotels];
            updatedHotels[idx] = newHotel;

            const updatedTripData = {
                ...fullTripData,
                hotels: updatedHotels
            };

            const success = await updateTripData(tripId, updatedTripData);
            if (success) {
                router.refresh(); 
            } else {
                alert("Failed to save the new hotel.");
            }
        } catch (error) {
            console.error("Error swapping hotel:", error);
            alert("Error finding an alternative hotel. The AI might have returned an invalid response.");
        } finally {
            setSwappingIdx(null);
        }
    };

    return (
        <section className="py-20 relative z-20">
            <div className="flex flex-col mb-16 max-w-7xl mx-auto px-6 items-center text-center">
                <h2 className="text-xs font-black tracking-[0.2em] text-orange-500 uppercase mb-3 flex items-center gap-2">
                    <span className="w-4 h-[2px] bg-orange-500 rounded-full"></span> Top Stay <span className="w-4 h-[2px] bg-orange-500 rounded-full"></span>
                </h2>
                <h3 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">Curated Accommodations</h3>
            </div>

            <div className="max-w-7xl mx-auto px-6">
                <div className="flex flex-col gap-8">
                    {hotels.map((hotel: any, idx: number) => {
                        const hName = hotel.hotelName || hotel.hotel_name || hotel.name;
                        const hAddress = hotel.hotelAddress || hotel.address;
                        const isSwapping = swappingIdx === idx;
                        const isHero = idx === bestHotelIdx;
                        const mapsLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(hName + " " + hAddress)}`;

                        if (isHero) {
                            return (
                                <div key={idx} className={`relative flex flex-col md:flex-row bg-white rounded-[2.5rem] p-4 md:p-6 border border-slate-100 shadow-[0_8px_30px_rgba(0,0,0,0.04)] transition-all duration-500 hover:shadow-[0_20px_40px_rgba(249,115,22,0.12)] hover:-translate-y-1 group overflow-hidden ${isSwapping ? 'opacity-50 pointer-events-none' : ''}`}>
                                    {/* Hero Image Side */}
                                    <div className="w-full md:w-1/2 lg:w-3/5 h-[300px] md:h-[400px] overflow-hidden rounded-[2rem] relative bg-slate-100 shrink-0">
                                        <Link href={mapsLink} target="_blank" rel="noopener noreferrer" className="absolute inset-0 z-10 block">
                                            <PlaceImage query={`${hName} hotel`} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                                        </Link>
                                        
                                        {/* Swap Button inside Image top left */}
                                        <div className="absolute top-6 left-6 z-30">
                                            <button 
                                                onClick={(e) => handleSwap(e, idx, hName)}
                                                disabled={isSwapping}
                                                className="bg-white/95 backdrop-blur-md shadow-lg border border-slate-200 text-slate-800 font-bold p-3 rounded-full hover:bg-orange-50 hover:text-orange-600 hover:border-orange-200 transition-all flex items-center justify-center cursor-pointer"
                                                title="Swap with AI Alternative"
                                            >
                                                {isSwapping ? (
                                                    <span className="animate-spin w-5 h-5 border-2 border-orange-500 border-t-transparent rounded-full flex"></span>
                                                ) : (
                                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
                                                )}
                                            </button>
                                        </div>

                                        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/60 to-transparent pointer-events-none z-10"></div>
                                        
                                        <div className="absolute bottom-6 left-6 flex flex-wrap gap-3 z-20">
                                            <span className="bg-white/95 backdrop-blur-md text-slate-800 text-xs md:text-sm font-bold px-4 py-2 rounded-full shadow-lg border border-white/50">
                                                💰 {hotel.price}
                                            </span>
                                            {hotel.rating && (
                                                <span className="bg-white/95 backdrop-blur-md text-slate-800 text-xs md:text-sm font-bold px-4 py-2 rounded-full shadow-lg border border-white/50 flex items-center gap-1.5">
                                                    <svg className="w-4 h-4 text-amber-500" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                                                    {hotel.rating} Best Rated
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    {/* Hero Content Side */}
                                    <div className="w-full md:w-1/2 lg:w-2/5 flex flex-col justify-center px-4 pt-8 md:pt-0 pb-6 md:px-10 lg:px-12 bg-white">
                                        <Link href={mapsLink} target="_blank" rel="noopener noreferrer" className="group/link block cursor-pointer">
                                            <h4 className="text-4xl lg:text-5xl font-black text-slate-900 mb-4 group-hover/link:text-orange-500 transition-colors duration-300 leading-tight">
                                                {hName}
                                            </h4>
                                        </Link>
                                        
                                        <p className="text-xs text-slate-400 font-bold tracking-wide uppercase flex items-start gap-1 mb-6 line-clamp-2">
                                            <svg className="w-4 h-4 mt-0.5 flex-shrink-0 text-orange-500/70" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" /></svg>
                                            {hAddress || "Location unavailable"}
                                        </p>

                                        <p className="text-slate-500 text-base leading-relaxed font-medium line-clamp-5 mb-8">
                                            {hotel.description}
                                        </p>

                                        <div className="mt-auto">
                                            <Link href={mapsLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 w-full lg:w-max bg-orange-50 hover:bg-orange-100 text-orange-600 font-bold py-3.5 px-8 rounded-2xl transition-all">
                                                Explore Hotel <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            );
                        }
                        
                        return null;
                    })}

                    {/* Secondary Hotels Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                        {hotels.map((hotel: any, idx: number) => {
                            if (idx === bestHotelIdx) return null;

                            const hName = hotel.hotelName || hotel.hotel_name || hotel.name;
                            const hAddress = hotel.hotelAddress || hotel.address;
                            const isSwapping = swappingIdx === idx;
                            const mapsLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(hName + " " + hAddress)}`;

                            return (
                                <div key={idx} className={`relative bg-slate-50/50 hover:bg-white rounded-3xl p-6 border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.02)] transition-all duration-300 hover:shadow-[0_10px_30px_rgba(249,115,22,0.08)] group overflow-hidden ${isSwapping ? 'opacity-50 pointer-events-none' : ''}`}>
                                    <div className="flex justify-between items-start mb-4 gap-4">
                                        <Link href={mapsLink} target="_blank" rel="noopener noreferrer" className="cursor-pointer group/link flex-1">
                                            <h4 className="text-2xl font-black text-slate-800 mb-1 group-hover/link:text-orange-500 transition-colors leading-tight">
                                                {hName}
                                            </h4>
                                            <div className="text-xs text-slate-400 font-bold tracking-wide uppercase flex items-center gap-1 line-clamp-1">
                                                <svg className="w-3.5 h-3.5 text-orange-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" /></svg>
                                                {hAddress}
                                            </div>
                                        </Link>

                                        <button 
                                            onClick={(e) => handleSwap(e, idx, hName)}
                                            disabled={isSwapping}
                                            className="bg-white border border-slate-200 text-slate-500 font-bold p-2.5 rounded-full hover:bg-orange-50 hover:text-orange-600 hover:border-orange-200 transition-all shrink-0"
                                            title="Swap with AI Alternative"
                                        >
                                            {isSwapping ? (
                                                <span className="animate-spin w-4 h-4 border-2 border-orange-500 border-t-transparent rounded-full flex"></span>
                                            ) : (
                                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
                                            )}
                                        </button>
                                    </div>

                                    <p className="text-slate-500 text-sm leading-relaxed mb-6 line-clamp-3">
                                        {hotel.description}
                                    </p>

                                    <div className="flex items-center justify-between border-t border-slate-100 pt-4">
                                        <span className="font-bold text-slate-700 bg-white px-3 py-1.5 rounded-lg border border-slate-100 shadow-sm text-sm">
                                            {hotel.price}
                                        </span>
                                        {hotel.rating && (
                                            <span className="flex items-center gap-1 text-amber-500 font-bold text-sm bg-orange-50/50 px-3 py-1.5 rounded-lg">
                                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                                                {hotel.rating}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hotels;