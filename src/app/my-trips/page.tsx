import React from 'react'
import { auth } from '@clerk/nextjs/server';
import { getUserTrips } from '@/lib/action';
import Link from 'next/link';
import { PlaceImage } from '@/components/PlaceImage';

const MyTripsPage = async () => {
    const { userId } = auth();

    if (!userId) {
        return (
            <div className="min-h-[80vh] flex flex-col items-center justify-center bg-[#faf9f6]">
                <h2 className="text-2xl font-bold text-slate-800 mb-4">You must be logged in</h2>
                <Link href="/sign-in" className="bg-orange-500 text-white px-6 py-3 rounded-full font-bold shadow-lg hover:bg-orange-600 transition">Log In</Link>
            </div>
        );
    }

    const trips = await getUserTrips(userId);

    return (
        <div className="min-h-screen bg-[#faf9f6] pb-24">
            
            <div className="bg-white border-b border-slate-200 py-12 px-6">
                <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
                    <div>
                        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">Your Adventures</h1>
                        <p className="text-slate-500 font-medium mt-2">Manage and view your intelligently curated travel itineraries.</p>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 mt-16">
                {trips.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 bg-white rounded-[2.5rem] border border-slate-100 shadow-sm text-center px-4">
                        <span className="text-6xl mb-6">🏜️</span>
                        <h3 className="text-2xl font-bold text-slate-900 mb-2">No trips planned yet</h3>
                        <p className="text-slate-500 mb-8 max-w-md">You haven&apos;t generated any itineraries yet. Let our AI curate your first magical experience.</p>
                        <Link href="/create-trip" className="bg-orange-50 text-orange-600 border border-orange-200 font-bold px-8 py-3 rounded-full hover:bg-orange-100 transition">Start Planning</Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {trips.map((trip: any) => (
                            <Link href={`/view-trip/${trip._id}`} key={trip._id} className="group flex flex-col bg-white rounded-[2.5rem] overflow-hidden border border-slate-100 shadow-[0_8px_30px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_40px_rgba(249,115,22,0.1)] transition-all duration-500 hover:-translate-y-2">
                                
                                <div className="p-3">
                                    <div className="w-full h-56 rounded-[2rem] overflow-hidden relative bg-slate-100">
                                        <PlaceImage query={`${trip.userSelection?.destination?.label} landscape`} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                        
                                        {/* Status / Badge */}
                                        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur text-slate-900 text-xs font-bold px-3 py-1.5 rounded-full shadow-sm">
                                            {trip.userSelection?.days} Days
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-col flex-1 p-6 pt-2">
                                    <h4 className="text-2xl font-black text-slate-900 mb-2 group-hover:text-orange-500 transition-colors leading-tight">{trip.userSelection?.destination?.label}</h4>
                                    
                                    {/* Date Display */}
                                    {trip.createdAt && (
                                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">
                                            Created: {new Date(trip.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                        </p>
                                    )}

                                    <div className="flex items-center gap-3 mt-auto pt-4 border-t border-slate-100">
                                        <span className="flex items-center gap-1.5 text-slate-500 text-sm font-semibold">
                                            <span className="text-amber-500">💰</span> {trip.userSelection?.budget}
                                        </span>
                                        <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                                        <span className="flex items-center gap-1.5 text-slate-500 text-sm font-semibold">
                                            <span className="text-rose-500">✈️</span> {trip.userSelection?.people}
                                        </span>
                                    </div>
                                </div>

                            </Link>
                        ))}
                    </div>
                )}
            </div>

        </div>
    )
}

export default MyTripsPage;
