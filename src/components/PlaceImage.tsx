"use client";
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { getPlacePhoto } from '@/lib/action';
import placeholderImg from "../../public/travelBanner.jpg";
import { useToast } from "@/components/ui/use-toast";

export const PlaceImage = ({ query, className }: { query: string, className?: string }) => {
    const [imgUrl, setImgUrl] = useState<string | null>(null);
    const { toast } = useToast();

    useEffect(() => {
        let isMounted = true;
        const fetchPhoto = async () => {
            const url = await getPlacePhoto(query);
            if (url === "RATE_LIMIT_EXCEEDED") {
                if (!sessionStorage.getItem('rateLimitToastFired')) {
                    toast({
                        title: "Image Credits Exhausted 🏜️",
                        description: "You have hit your hourly API limit. Beautiful placeholder images will be shown temporarily.",
                    });
                    sessionStorage.setItem('rateLimitToastFired', 'true');
                    // Reset the toast block after 60 seconds
                    setTimeout(() => { sessionStorage.removeItem('rateLimitToastFired'); }, 60000); 
                }
                if (isMounted) setImgUrl(null); // Triggers fallback image
            } else if (url && isMounted) {
                setImgUrl(url);
            }
        }
        if (query) {
            fetchPhoto();
        }
        return () => { isMounted = false; };
    }, [query, toast]);

    return (
        <Image 
            src={imgUrl || placeholderImg} 
            alt={query} 
            width={400} 
            height={400} 
            className={className || "h-56 w-full rounded-md object-cover"} 
        />
    )
}
