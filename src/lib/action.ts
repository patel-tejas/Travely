"use server";

import connectToDatabase from "./mongoose";
import Trip from "../models/Trip";
import ImageCache from "../models/ImageCache";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { auth } from '@clerk/nextjs/server';

// Initialize Redis only if keys are present
const redis = process.env.UPSTASH_REDIS_REST_URL ? new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
}) : null;

// Create sliding window limiters
const ratelimitMinute = redis ? new Ratelimit({
  redis: redis,
  limiter: Ratelimit.slidingWindow(10, "1 m"),
}) : null;

const ratelimitHour = redis ? new Ratelimit({
  redis: redis,
  limiter: Ratelimit.slidingWindow(100, "1 h"),
}) : null;

export const createTrip = async (id: string, userSelection: any, data: any) => {
    try {
        await connectToDatabase();
        
        const tripDoc = await Trip.create({
            userId: id,
            userSelection,
            tripData: data
        });
        
        return tripDoc._id.toString();
    } catch (error) {
        console.error(error);
        return error;
    }
}

export const getTripDetails = async(id: string) => {
    try {
        await connectToDatabase();
        const tripDoc = await Trip.findById(id).lean();

        if (tripDoc) {
            return {
                id: tripDoc.userId,
                userSelection: tripDoc.userSelection,
                ...(tripDoc.tripData as any)
            };
        } else {
            throw new Error('No such document!');
        }
    } catch (error) {
        console.log(error);
        return null;
        
    }
}

export const getPlacePhoto = async (query: string) => {
    try {
        const { userId } = auth();

        await connectToDatabase();
        const normalizedQuery = query.toLowerCase().trim();
        const cachedImage = await ImageCache.findOne({ query: normalizedQuery });
        if (cachedImage) return cachedImage.url;

        // Rate Limiting Check (Only if Upstash is configured and User is logged in)
        if (userId && ratelimitMinute && ratelimitHour) {
            const [minResult, hourResult] = await Promise.all([
                ratelimitMinute.limit(userId),
                ratelimitHour.limit(userId)
            ]);

            if (!minResult.success || !hourResult.success) {
                console.warn(`[RATE LIMIT] API calls exceeded for user ${userId}. Yielding fallback image.`);
                return "RATE_LIMIT_EXCEEDED"; 
            }
        }

        const res = await fetch('https://places.googleapis.com/v1/places:searchText', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Goog-Api-Key': process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
                'X-Goog-FieldMask': 'places.photos'
            },
            body: JSON.stringify({
                textQuery: query
            })
        });
        const data = await res.json();
        if (data.places && data.places.length > 0 && data.places[0].photos && data.places[0].photos.length > 0) {
            const photoName = data.places[0].photos[0].name;
            const photoUrl = `https://places.googleapis.com/v1/${photoName}/media?maxHeightPx=400&maxWidthPx=400&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}`;
            
            await ImageCache.create({ query: normalizedQuery, url: photoUrl });
            
            return photoUrl;
        }
        return null;
    } catch (e) {
        console.error("Error fetching place photo:", e);
        return null;
    }
}

export const getUserTrips = async(userId: string) => {
    try {
        await connectToDatabase();
        const trips = await Trip.find({ userId }).sort({ createdAt: -1 }).lean();
        return JSON.parse(JSON.stringify(trips)); 
    } catch (error) {
        console.error(error);
        return [];
    }
}

export const updateTripData = async (tripId: string, updatedTripData: any) => {
    try {
        await connectToDatabase();
        await Trip.findByIdAndUpdate(tripId, { tripData: updatedTripData });
        return true;
    } catch (error) {
        console.error("Error updating trip data:", error);
        return false;
    }
}
