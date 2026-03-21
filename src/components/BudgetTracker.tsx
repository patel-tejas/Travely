"use client";

import React, { useMemo } from 'react';

interface BudgetTrackerProps {
  tripData: any;
  userSelection: any;
}

const extractNumber = (str: string): number => {
    if (!str) return 0;
    // Extract first continuous block of numbers (potentially with commas/decimals)
    const match = str.replace(/,/g, '').match(/\d+(?:\.\d+)?/);
    return match ? parseFloat(match[0]) : 0;
};

const extractCurrency = (str: string): string => {
    if (!str) return '$';
    // Look for common currency symbols
    const match = str.match(/[₹$€£¥]/);
    return match ? match[0] : '$';
};

const BudgetTracker: React.FC<BudgetTrackerProps> = ({ tripData, userSelection }) => {
    
    const { totalCost, currency } = useMemo(() => {
        let cost = 0;
        let currencySymbol = '$';

        // 1. Calculate Hotel Cost (assume they pick the first hotel)
        if (tripData?.hotels && tripData.hotels.length > 0) {
            const firstHotelPrice = tripData.hotels[0].price || tripData.hotels[0].price_per_night || "";
            if (firstHotelPrice) {
                 const extractedCur = extractCurrency(firstHotelPrice);
                 if (extractedCur !== '$' || firstHotelPrice.includes('$')) {
                     currencySymbol = extractedCur;
                 }
                 const priceNum = extractNumber(firstHotelPrice);
                 
                 const days = parseInt(userSelection?.days) || 1;
                 const lowerPrice = firstHotelPrice.toLowerCase();
                 const isPerNight = lowerPrice.includes('per night') || lowerPrice.includes('/night') || lowerPrice.includes('per day') || lowerPrice.includes('/day');
                 
                 cost += isPerNight ? priceNum * days : priceNum;
            }
        }

        // 2. Calculate Activities Cost
        if (tripData?.itinerary) {
             Object.values(tripData.itinerary).forEach((day: any) => {
                 if (day.places && Array.isArray(day.places)) {
                     day.places.forEach((place: any) => {
                         const ticketStr = place.ticketPricing || place.ticket_pricing || place.ticket_price || "";
                         if (ticketStr && !ticketStr.toLowerCase().includes('free')) {
                              const priceNum = extractNumber(ticketStr);
                              
                              let peopleMultiplier = 1;
                              const peopleStr = userSelection?.people?.toLowerCase() || "";
                              if (peopleStr.includes('couple')) peopleMultiplier = 2;
                              else if (peopleStr.includes('family')) peopleMultiplier = 4;
                              else if (peopleStr.includes('friends')) peopleMultiplier = 4;
                              
                              const lowerTicket = ticketStr.toLowerCase();
                              const isTotal = lowerTicket.includes('total') || lowerTicket.includes('family') || lowerTicket.includes('group');
                              
                              // Most AI ticket prices are implicitly per person unless stated otherwise
                              cost += isTotal ? priceNum : priceNum * peopleMultiplier;
                         }
                     });
                 }
             });
        }

        return { totalCost: Math.round(cost), currency: currencySymbol };
    }, [tripData, userSelection]);

    return (
        <div className="flex items-center gap-4 bg-emerald-500/10 backdrop-blur-xl px-6 py-4 rounded-3xl border border-emerald-100 shadow-[0_8px_30px_rgba(16,185,129,0.1)] transition-transform hover:scale-105 hover:-translate-y-1 cursor-default">
            <span className="text-2xl bg-emerald-50 text-emerald-500 p-2.5 rounded-2xl">💸</span> 
            <div className="flex flex-col text-left">
                <span className="text-[10px] text-emerald-600/80 uppercase tracking-widest font-bold">Estimated Cost</span>
                <span className="text-emerald-700 font-extrabold text-xl tracking-tight">
                    {totalCost > 0 ? `${currency}${totalCost.toLocaleString('en-US')}` : 'Free / Not specified'}
                </span>
            </div>
        </div>
    );
};

export default BudgetTracker;
