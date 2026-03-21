"use client";

import React, { useState, useMemo } from 'react';
import { PlaceImage } from './PlaceImage';
import Link from 'next/link';
import { chatSession } from '@/lib/AiModel';
import { updateTripData } from '@/lib/action';
import { useRouter } from 'next/navigation';

interface DayListProps {
    days: any;
    tripId?: string;
    fullTripData?: any;
    userSelection?: any;
}

const DayList: React.FC<DayListProps> = ({ days, tripId, fullTripData, userSelection }) => {
    const [swappingState, setSwappingState] = useState<{ dayKey: string, placeIdx: number } | null>(null);
    const router = useRouter();

    const top2PlacesIds = useMemo(() => {
        let places: any[] = [];
        if (!days) return new Set<string>();
        Object.entries(days).forEach(([dayKey, dayInfo]: any) => {
            const placesList = Array.isArray(dayInfo) ? dayInfo : (dayInfo.places || dayInfo.activities || dayInfo.itinerary || []);
            placesList.forEach((p: any, idx: number) => {
                places.push({ 
                    globalDayKey: dayKey, 
                    globalIdx: idx, 
                    numericRating: parseFloat(p.rating) || 0 
                });
            });
        });
        
        // Sort by rating descending
        places.sort((a, b) => b.numericRating - a.numericRating);
        
        // If there are no ratings provided, just default to first 2 indices found
        const top2 = places.slice(0, 2);
        return new Set(top2.map(p => `${p.globalDayKey}-${p.globalIdx}`));
    }, [days]);

    if (!days) return null;
    
    const dayEntries = Object.entries(days).sort();

    const handleSwap = async (e: React.MouseEvent, dayKey: string, placeIdx: number, placeName: string) => {
        e.preventDefault();
        e.stopPropagation();

        if (!tripId || !fullTripData || !userSelection) return;

        setSwappingState({ dayKey, placeIdx });

        try {
            // Collect all current place names for avoidance
            let existingPlaces: string[] = [];
            Object.values(days).forEach((d: any) => {
                const placesList = Array.isArray(d) ? d : (d.places || d.activities || d.itinerary || []);
                placesList.forEach((p: any) => existingPlaces.push(p.placeName || p.place_name || p.name));
            });

            const prompt = `
            Suggest 1 alternative activity to "${placeName}" in ${userSelection?.destination?.label} for a ${userSelection?.budget} budget.
            Do NOT suggest any of these: ${existingPlaces.join(", ")}.
            Return ONLY a valid JSON object matching this exact format:
            {
               "time": "Time of Day (e.g., 09:00 AM)",
               "placeName": "Name",
               "placeDetails": "Description",
               "ticketPricing": "Price",
               "timeTravel": "Duration",
               "rating": 4.5,
               "geoCoordinates": { "latitude": 0, "longitude": 0 },
               "imageUrl": ""
            }
            `;

            const result = await chatSession.sendMessage(prompt);
            const rawText = result.response.text();
            const cleanJson = rawText.replaceAll("```json", "").replaceAll("```", "").trim();
            const newActivity = JSON.parse(cleanJson);

            const updatedItinerary = JSON.parse(JSON.stringify(days));
            const placesListRef = Array.isArray(updatedItinerary[dayKey]) ? updatedItinerary[dayKey] : (updatedItinerary[dayKey].places || updatedItinerary[dayKey].activities || updatedItinerary[dayKey].itinerary);
            placesListRef[placeIdx] = newActivity;

            const updatedTripData = {
                ...fullTripData,
                itinerary: updatedItinerary
            };

            const success = await updateTripData(tripId, updatedTripData);
            if (success) {
                router.refresh(); 
            } else {
                alert("Failed to save the new activity.");
            }
        } catch (error) {
            console.error("Error swapping activity:", error);
            alert("Error finding an alternative activity. The AI might have returned an invalid response.");
        } finally {
            setSwappingState(null);
        }
    };

    return (
        <section className="relative pt-4 pb-32 px-4 sm:px-6 max-w-7xl mx-auto z-20">
            <div className="flex flex-col mb-20 items-center text-center">
                <h2 className="text-xs font-black tracking-[0.2em] text-rose-500 uppercase mb-3 flex items-center justify-center gap-2">
                    <span className="w-4 h-[2px] bg-rose-500 rounded-full"></span> The Journey <span className="w-4 h-[2px] bg-rose-500 rounded-full"></span>
                </h2>
                <h3 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">Your Custom Itinerary</h3>
            </div>

            <div className="space-y-32">
                {dayEntries.map(([dayKey, dayInfo]: any, dayIndex: number) => (
                    <div key={dayKey} className="relative w-full">
                        
                        {/* Day Header */}
                        <div className="sticky top-20 z-40 bg-[#faf9f6]/95 backdrop-blur-xl py-6 mb-12 border-b border-slate-200/60 shadow-[0_8px_30px_rgba(250,249,246,1)] rounded-b-3xl">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 max-w-5xl mx-auto">
                                <div className="capitalize flex items-center gap-5">
                                    <h3 className="px-6 py-3 rounded-2xl bg-gradient-to-br from-rose-400 to-amber-500 text-2xl tracking-wide shadow-lg shadow-rose-500/30 text-white font-black shrink-0 inline-flex items-center justify-center">
                                        {dayKey.replace(/_/g, ' ')}
                                    </h3>
                                </div>
                                {dayInfo.best_time_to_visit && (
                                    <div className="text-sm font-bold text-rose-600 uppercase tracking-widest bg-rose-50 px-5 py-2.5 rounded-full border border-rose-100 shadow-sm shrink-0 w-max">
                                        Best Focus: <span className="text-rose-400 ml-1">{dayInfo.best_time_to_visit}</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* List of Tiles Container */}
                        <div className="flex flex-col gap-10 max-w-5xl mx-auto">
                            {(() => {
                                const placesList = Array.isArray(dayInfo) ? dayInfo : (dayInfo.places || dayInfo.activities || dayInfo.itinerary || []);
                                return placesList.map((place: any, placeIndex: number) => {
                                    const placeName = place.placeName || place.place_name || place.name;
                                    const placeDetails = place.placeDetails || place.place_details || place.details || place.description;
                                const ticketPricing = place.ticketPricing || place.ticket_pricing || place.ticket_price || "Free";
                                const travelTime = place.timeTravel || place.time_travel || place.travel_time || "1-2 hours";
                                const mapsLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(placeName)}`;
                                
                                const eventTime = place.time || `Target Activity ${placeIndex + 1}`;
                                const isSwapping = swappingState?.dayKey === dayKey && swappingState?.placeIdx === placeIndex;
                                const hasImage = top2PlacesIds.has(`${dayKey}-${placeIndex}`);

                                return (
                                    <div key={placeIndex} className={`relative flex flex-col md:flex-row bg-white rounded-[2.5rem] p-4 border border-slate-100 shadow-[0_8px_30px_rgba(0,0,0,0.03)] transition-all duration-500 hover:shadow-[0_20px_40px_rgba(244,63,94,0.12)] hover:-translate-y-1 group overflow-hidden ${isSwapping ? 'opacity-50 pointer-events-none' : ''}`}>
                                        
                                        {/* Conditionally Render Image logic */}
                                        {hasImage && (
                                            <div className="w-full md:w-5/12 md:max-w-md h-72 md:h-auto min-h-[250px] overflow-hidden rounded-[2rem] relative bg-slate-100 shrink-0">
                                                <Link href={mapsLink} target="_blank" rel="noopener noreferrer" className="absolute inset-0 z-10 block">
                                                    <PlaceImage query={`${placeName} tourism`} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                                                </Link>
                                                
                                                {/* Swap Button inside Image top left */}
                                                <div className="absolute top-4 left-4 z-30">
                                                    <button 
                                                        onClick={(e) => handleSwap(e, dayKey, placeIndex, placeName)}
                                                        disabled={isSwapping}
                                                        className="bg-white/95 backdrop-blur-md shadow-lg border border-slate-200 text-slate-800 font-bold p-2.5 rounded-full hover:bg-rose-50 hover:text-rose-600 hover:border-rose-200 transition-all flex items-center justify-center cursor-pointer"
                                                        title="Swap with AI Alternative"
                                                    >
                                                        {isSwapping ? (
                                                            <span className="animate-spin w-4 h-4 border-2 border-rose-500 border-t-transparent rounded-full flex"></span>
                                                        ) : (
                                                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
                                                        )}
                                                    </button>
                                                </div>

                                                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/60 to-transparent pointer-events-none z-10"></div>
                                                
                                                <div className="absolute bottom-4 left-4 flex flex-wrap gap-2 z-20">
                                                    <span className="bg-white/95 backdrop-blur-md text-slate-800 text-[10px] md:text-xs font-bold px-3 py-1.5 rounded-full shadow-lg border border-white/50">
                                                        ⏱️ {travelTime}
                                                    </span>
                                                    <span className="bg-white/95 backdrop-blur-md text-slate-800 text-[10px] md:text-xs font-bold px-3 py-1.5 rounded-full shadow-lg border border-white/50">
                                                        🎟️ {ticketPricing}
                                                    </span>
                                                </div>
                                            </div>
                                        )}

                                        {/* Content side (Right on desktop if image exists, full width if no image) */}
                                        <div className={`w-full flex flex-col justify-center px-2 pt-6 md:pt-0 pb-4 ${hasImage ? 'md:w-7/12 md:px-10' : 'px-4 md:px-8 pt-4'}`}>
                                            
                                            <div className="flex justify-between items-start mb-4">
                                                {/* Time Tag */}
                                                <span className="text-rose-500 font-bold text-xs uppercase tracking-widest bg-rose-50 px-3 py-1.5 rounded-full w-max border border-rose-100 flex items-center gap-1.5">
                                                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                                    {eventTime}
                                                </span>

                                                {/* Swap Button for layout without image */}
                                                {!hasImage && (
                                                    <button 
                                                        onClick={(e) => handleSwap(e, dayKey, placeIndex, placeName)}
                                                        disabled={isSwapping}
                                                        className="bg-slate-50 border border-slate-200 text-slate-600 font-bold p-2 rounded-full hover:bg-rose-50 hover:text-rose-600 hover:border-rose-200 transition-all ml-4"
                                                        title="Swap with AI Alternative"
                                                    >
                                                        {isSwapping ? (
                                                            <span className="animate-spin w-4 h-4 border-2 border-rose-500 border-t-transparent rounded-full flex"></span>
                                                        ) : (
                                                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
                                                        )}
                                                    </button>
                                                )}
                                            </div>
                                            
                                            <Link href={mapsLink} target="_blank" rel="noopener noreferrer" className="group/link block cursor-pointer">
                                                <h4 className="text-3xl font-black text-slate-900 mb-2 group-hover/link:text-rose-500 transition-colors duration-300 leading-tight">
                                                    {placeName}
                                                </h4>
                                                {place.rating && (
                                                    <div className="flex items-center gap-1.5 mb-2 text-sm text-yellow-500 font-bold">
                                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                                                        {place.rating}
                                                    </div>
                                                )}
                                            </Link>

                                            <p className={`text-slate-500 leading-relaxed font-medium mb-6 ${hasImage ? 'text-[15px] line-clamp-4 md:line-clamp-6' : 'text-[16px]'}`}>
                                                {placeDetails}
                                            </p>

                                            <div className="mt-auto flex justify-between items-center bg-slate-50 p-4 rounded-3xl border border-slate-100">
                                                {!hasImage && (
                                                    <div className="flex gap-4">
                                                        <span className="text-slate-600 text-[11px] md:text-sm font-bold flex flex-col">
                                                            <span className="text-[10px] uppercase tracking-widest text-slate-400">Time Travel</span>
                                                            {travelTime}
                                                        </span>
                                                        <span className="text-slate-600 text-[11px] md:text-sm font-bold flex flex-col">
                                                            <span className="text-[10px] uppercase tracking-widest text-slate-400">Tickets</span>
                                                            {ticketPricing}
                                                        </span>
                                                    </div>
                                                )}
                                                
                                                <Link href={mapsLink} target="_blank" rel="noopener noreferrer" className={`inline-flex items-center gap-2 text-rose-500 font-bold hover:text-rose-600 transition-colors ${!hasImage ? 'ml-auto' : ''}`}>
                                                    Explore on Map <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                                                </Link>
                                            </div>
                                        </div>

                                    </div>
                                );
                            });
                        })()}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default DayList;
