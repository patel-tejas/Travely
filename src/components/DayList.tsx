"use client"

import React from 'react'
import { TracingBeam } from './ui/tracing-beam'

const DayList = ( days :any) => {
    const dayEntries = Object.entries(days.days);
    console.log(dayEntries);
    
    return (
        <TracingBeam className="px-6">
            <div className="max-w-2xl mx-auto antialiased pt-4 relative">
                {dayEntries.map(([dayKey, dayInfo]: any) => (
                    <div key={dayKey} className="my-4">
                        <h2 className="text-xl font-bold">Day: {dayKey.replace('_', ' ')}</h2>
                        <p className="italic">Best time to visit: {dayInfo.best_time_to_visit}</p>
                        {dayInfo.places.map((place: any, index: number) => (
                            <div key={index} className="my-2 p-2 border rounded shadow">
                                <h3 className="text-lg font-semibold">{place.place_name}</h3>
                                <img src={place.image_url} alt={place.place_name} className="w-full h-48 object-cover rounded-md mb-2" />
                                <p>{place.details}</p>
                                <p>Travel time: {place.travel_time}</p>
                                <p>Ticket price: {place.ticket_price}</p>
                                <p>Coordinates: {place.geo_coordinates.latitude}, {place.geo_coordinates.longitude}</p>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </TracingBeam>
    )
}

export default DayList;
