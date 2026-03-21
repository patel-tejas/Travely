import DayList from '@/components/DayList';
import Hotels from '@/components/Hotels';
import Restaurants from '@/components/Restaurants';
import TripHeader from '@/components/TripHeader';
import TripMap from '@/components/TripMap';
import { getTripDetails } from '@/lib/action';
import { auth } from '@clerk/nextjs/server';
import React from 'react'
import Link from 'next/link';

const page = async ({ params }: { params: { id: string } }) => {
    const { userId } = auth()
    
    const tripData: any = await getTripDetails(params.id);

    if (!tripData) {
        return (
            <div className='flex items-center justify-center min-h-[80vh] text-2xl font-bold text-slate-400'>
                Trip not found
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-[#faf9f6] pb-20 relative">
            
            {/* Bound Absolute Back Button */}
            <div className="absolute top-0 left-0 w-full z-30 pointer-events-none">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative h-0">
                    <div className="absolute top-6 left-4 sm:left-6 pointer-events-auto">
                        <Link href="/my-trips" className="flex items-center gap-2 bg-white/40 hover:bg-white/80 backdrop-blur-md px-4 py-2.5 rounded-full text-slate-900 font-bold shadow-[0_8px_30px_rgba(0,0,0,0.12)] transition-all duration-300 hover:scale-105 border border-white/50">
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                            Back to Trips
                        </Link>
                    </div>
                </div>
            </div>

            <TripHeader 
                days={tripData.userSelection.days} 
                destination={tripData.userSelection.destination.label} 
                people={tripData.userSelection.people} 
                budget={tripData.userSelection.budget}
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 space-y-24">
                <TripMap hotels={tripData.hotels} itinerary={tripData.itinerary} />
                <DayList days={tripData.itinerary} tripId={params.id} fullTripData={tripData} userSelection={tripData.userSelection} />
                <Hotels hotels={tripData.hotels} tripId={params.id} fullTripData={tripData} userSelection={tripData.userSelection} />
                <Restaurants restaurants={tripData.famousRestaurants} tripId={params.id} fullTripData={tripData} userSelection={tripData.userSelection} />
            </div>
        </div>
    )
}

export default page