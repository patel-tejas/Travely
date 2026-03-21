"use client"
import React, { useState } from 'react'
import { SelectBudgetOption, SelectTravellerList } from '@/lib/options'
import { chatSession } from '@/lib/AiModel'
import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { BiLoaderAlt } from "react-icons/bi";
import { createTrip } from '@/lib/action'

const CreateTripPage = () => {
  const router = useRouter()
  const [place, setPlace] = useState<string>("")
  const [formData, setFormData] = useState<any>({})
  const [loading, setLoading] = useState<boolean>(false)

  const {user} = useUser();

  const handleInputChange = (name: string, value: any) => {
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = async (e: any) => {
    setLoading(true)
    if (!user){
      router.push("/sign-in")
      setLoading(false)
      return;
    }
    if (!place || !formData.budget || !formData.people || !formData.days) {
      alert("Please fill all the fields")
      setLoading(false)
      return;
    }
    e.preventDefault()
    
    const finalData = { ...formData, destination: { label: place, value: place } };

    const finalPrompt = `Generate a travel plan for location: ${place}, for ${formData.days} days for ${formData.people} with a ${formData.budget} Budget. Give me: 1. hotels option list with hotelName, hotelAddress, price, geoCoordinates, rating (numeric 1-5), description. 2. A detailed chronological hourly itinerary organized by day (Day 1, Day 2, etc). For each day, provide an array of places (activities) starting from morning to evening with: "time", "placeName", "placeDetails", "geoCoordinates", "ticketPricing", "timeTravel", and "rating" (numeric 1-5). 3. famousRestaurants array containing exactly 4 local street food and popular dining options matching the budget, with "placeName", "placeDetails", "geoCoordinates", "pricing", and "rating" (numeric 1-5). Very Important: For placeName, ONLY provide the exact, proper, official name of the location. Do NOT include descriptive text like "Dinner at" in the placeName. Return the entire response strictly in JSON Format.`

    try {
        const getTravelPlan = await chatSession.sendMessage(finalPrompt);
        const formattedRes= JSON.parse(getTravelPlan.response.text().replaceAll("```json", "").replaceAll("```", "") )   
        
        const tripId = await createTrip(user.id, finalData, formattedRes);
        router.push(`/view-trip/${tripId}`)
    } catch (err) {
        console.error("AI Generation Error: ", err);
    }
    setLoading(false)
  }

  return (
    <div className='min-h-screen bg-[#faf9f6] text-slate-900 selection:bg-orange-500/30 font-sans tracking-tight relative overflow-hidden flex flex-col items-center pb-24'>
      
      {/* Immersive Warm Background Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1000px] h-[500px] bg-orange-400/10 blur-[120px] rounded-full pointer-events-none z-0" />
      <div className="absolute top-[40%] right-[-10%] w-[600px] h-[600px] bg-rose-400/10 blur-[150px] rounded-full pointer-events-none z-0" />

      {/* Hero Section */}
      <div className='relative z-10 w-full max-w-5xl px-6 pt-8 lg:pt-12 pb-16 text-center flex flex-col items-center'>
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-orange-200 bg-white shadow-sm mb-8">
            <span className="flex h-2.5 w-2.5 rounded-full bg-orange-500 animate-pulse"></span>
            <span className="text-xs font-bold text-orange-600 uppercase tracking-widest">Tailored For You</span>
        </div>
        <h1 className='text-5xl md:text-7xl font-extrabold mb-6 text-slate-900 leading-[1.1] tracking-tight'>
          Design Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-rose-500 to-amber-500">Escape.</span>
        </h1>
        <p className='text-lg md:text-xl text-slate-500 max-w-2xl font-medium'>
          Input your travel desires. Our intelligent engine curates the perfect, personalized itinerary instantly.
        </p>
      </div>

      {/* Form Container */}
      <div className='relative z-10 w-full max-w-4xl px-4 sm:px-6 flex flex-col gap-16'>

        {/* Section 1: Destination & Days */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white p-8 sm:p-12 rounded-[2.5rem] shadow-xl ring-1 ring-slate-900/5">
            <div className='flex flex-col gap-4 group'>
                <label className='text-xl font-bold text-slate-800 flex items-center gap-3'>
                    <div className="p-2 bg-orange-100 rounded-xl text-orange-600">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                    </div>
                    Destination
                </label>
                <input 
                    type="text" 
                    placeholder="E.g. Santorini, Greece" 
                    className='bg-slate-50 border border-slate-200 rounded-2xl p-5 text-xl font-medium text-slate-800 focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/20 transition-all duration-300 placeholder:text-slate-400' 
                    required 
                    value={place}
                    onChange={(e) => setPlace(e.target.value)} 
                />
            </div>

            <div className='flex flex-col gap-4 group'>
                <label className='text-xl font-bold text-slate-800 flex items-center gap-3'>
                    <div className="p-2 bg-rose-100 rounded-xl text-rose-600">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                    </div>
                    Duration (Days)
                </label>
                <input 
                    type="number" 
                    placeholder="E.g. 5" 
                    className='bg-slate-50 border border-slate-200 rounded-2xl p-5 text-xl font-medium text-slate-800 focus:outline-none focus:border-rose-500 focus:ring-4 focus:ring-rose-500/20 transition-all duration-300 placeholder:text-slate-400' 
                    min={1} max={14} required 
                    onChange={(e) => handleInputChange('days', e.target.value)} 
                />
            </div>
        </div>

        {/* Section 2: Budget */}
        <div className='flex flex-col gap-8'>
          <h2 className='text-2xl font-bold text-slate-900 flex items-center gap-3 px-2'>
            What is your budget?
          </h2>
          <div className='grid grid-cols-1 sm:grid-cols-3 gap-6'>
            {SelectBudgetOption.map((option) => (
              <div key={option.id} 
                className={`relative overflow-hidden flex flex-col p-8 rounded-[2rem] transition-all duration-500 cursor-pointer border ${formData.budget === option.title ? 'border-amber-500 bg-amber-50 shadow-[0_8px_30px_rgba(245,158,11,0.2)] scale-105 z-10' : 'border-slate-200 bg-white hover:border-amber-300 hover:shadow-lg hover:-translate-y-1'}`} 
                onClick={() => handleInputChange('budget', option.title)}>
                
                <div className="relative z-10 flex flex-col items-start gap-3">
                    <span className='text-5xl drop-shadow-sm pb-2'>{option.icon}</span>
                    <h3 className='text-xl font-black text-slate-900'>{option.title}</h3>
                    <p className='text-sm text-slate-500 font-medium leading-relaxed'>{option.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 3: Companions */}
        <div className='flex flex-col gap-8'>
          <h2 className='text-2xl font-bold text-slate-900 flex items-center gap-3 px-2'>
            Who is traveling?
          </h2>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
            {SelectTravellerList.map((option) => (
              <div key={option.id} 
                className={`relative overflow-hidden flex flex-col p-8 rounded-[2rem] transition-all duration-500 cursor-pointer border ${formData.people === option.title ? 'border-rose-500 bg-rose-50 shadow-[0_8px_30px_rgba(244,63,94,0.2)] scale-105 z-10' : 'border-slate-200 bg-white hover:border-rose-300 hover:shadow-lg hover:-translate-y-1'}`}
                onClick={() => handleInputChange('people', option.title)}>

                <div className="relative z-10 flex flex-col items-start gap-3">
                    <span className='text-5xl drop-shadow-sm pb-2'>{option.icon}</span>
                    <h3 className='text-xl font-black text-slate-900'>{option.title}</h3>
                    <p className='text-sm text-slate-500 font-medium leading-relaxed'>{option.people}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Generate Button */}
        <div className='mt-8 flex items-center justify-center p-8 bg-white border border-slate-100 shadow-xl shadow-orange-900/5 rounded-[2.5rem] max-w-lg mx-auto w-full'>
          <button 
            className={`group relative overflow-hidden w-full px-12 py-5 text-xl font-extrabold rounded-2xl bg-orange-500 text-white transition-all duration-300 transform hover:scale-[1.02] shadow-[0_8px_30px_rgba(249,115,22,0.3)] hover:shadow-[0_12px_40px_rgba(249,115,22,0.5)] focus:outline-none focus:ring-4 focus:ring-orange-500/30`} 
            onClick={handleSubmit}>
            <span className="relative z-10 flex items-center justify-center gap-3 tracking-wide">
                {loading ? <BiLoaderAlt className='w-7 h-7 animate-spin'/> : "GENERATE ITINERARY"}
                {!loading && <svg className="w-6 h-6 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>}
            </span>
            <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-[150%] skew-x-[-45deg] group-hover:animate-[shine_1.5s_ease-in-out]"></div>
          </button>
        </div>

      </div>
      <style jsx>{`
        @keyframes shine {
            100% { transform: translateX(150%) skewX(-45deg); }
        }
      `}</style>
    </div>
  )
}

export default CreateTripPage;