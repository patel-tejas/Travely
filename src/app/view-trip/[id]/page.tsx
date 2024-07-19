// import { useUser } from '@clerk/nextjs';


import DayList from '@/components/DayList';
import Hotels from '@/components/Hotels';
import TripHeader from '@/components/TripHeader';
import { getTripDetails } from '@/lib/action';
import { useUser } from '@clerk/nextjs';
import { auth } from '@clerk/nextjs/server';
import React, { useEffect, useState } from 'react'


const page = async ({ params }: { params: { id: string } }) => {

    const {userId} = auth()
    
    
    const tripData: any = await getTripDetails(params.id);
    // console.log(tripData);

    if (!tripData) {
        return (
            <div className='flex items-center justify-center min-h-[80vh]'>
                Trip not found
            </div>
        )
    }

    if (tripData.id !== userId) {
        return (
            <div className='flex items-center justify-center min-h-[80vh]'>
                You are not authorized to view this trip
            </div>
        )
    }

    return (
        <div>
            <TripHeader  days={tripData.userSelection.days} destination={tripData.userSelection.destination.label} people={tripData.userSelection.people} budget={tripData.userSelection.budget}/>

            <Hotels hotels={tripData.hotels}/>
            <DayList days={tripData.itinerary}/>
        </div>
    )
}

export default page