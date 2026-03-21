import React from 'react'
import Image from 'next/image'

const Features = () => {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
        {/* Decorative Background */ }
        <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-orange-100/50 rounded-full blur-[100px] -translate-y-1/2 -translate-x-1/2 mix-blend-multiply"></div>
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-rose-100/50 rounded-full blur-[80px] mix-blend-multiply"></div>

        <div className="max-w-7xl mx-auto px-6 sm:px-12 relative z-10">
            
            <div className="text-center max-w-2xl mx-auto mb-20 text-slate-900">
                <h2 className="text-orange-600 font-bold uppercase tracking-widest text-sm mb-3">Core Features</h2>
                <h3 className="text-4xl md:text-5xl font-black mb-6 leading-tight">Everything you need for the perfect trip.</h3>
                <p className="text-lg text-slate-500 font-medium leading-relaxed">From luxurious hand-picked accommodations to precise daily scheduling, TripGuruji eliminates the chaos of travel planning.</p>
            </div>

            {/* Feature 1: Hotels / Accommodations */}
            <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20 mb-32">
                <div className="w-full lg:w-1/2 flex flex-col justify-center">
                    <div className="w-16 h-16 bg-amber-100 text-amber-600 rounded-2xl flex items-center justify-center text-3xl mb-6 shadow-sm border border-amber-200">
                        🏨
                    </div>
                    <h4 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">Curated Hotel Selection</h4>
                    <p className="text-lg text-slate-500 mb-6 font-medium leading-relaxed">
                        We don't just find a place to sleep; we find the perfect stay. Our AI parses through thousands of options to deliver top-rated, tailored accommodations that fit exactly within your budget.
                    </p>
                    <ul className="space-y-4">
                        <li className="flex items-start gap-3">
                            <span className="text-orange-500 mt-1"><svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg></span>
                            <span className="text-slate-600 font-medium">Real-time dynamic pricing</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-orange-500 mt-1"><svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg></span>
                            <span className="text-slate-600 font-medium">Hyper-personalized matching</span>
                        </li>
                    </ul>
                </div>
                
                <div className="w-full lg:w-1/2 relative">
                    <div className="absolute inset-0 bg-gradient-to-tr from-orange-200 to-rose-200 rounded-[2.5rem] transform rotate-3 -z-10 blur-sm"></div>
                    <img 
                        src="/landing1.png" 
                        alt="Curated Accommodations" 
                        className="w-full h-auto rounded-[2rem] shadow-[0_20px_40px_rgba(0,0,0,0.08)] border border-slate-100 object-cover"
                    />
                </div>
            </div>

            {/* Feature 2: Itinerary / Day by Day */}
            <div className="flex flex-col-reverse lg:flex-row items-center gap-12 lg:gap-20">
                <div className="w-full lg:w-1/2 relative">
                    <div className="absolute inset-0 bg-gradient-to-tr from-rose-200 to-purple-200 rounded-[2.5rem] transform -rotate-3 -z-10 blur-sm"></div>
                    <img 
                        src="/landing2.png" 
                        alt="Intelligent Daily Itineraries" 
                        className="w-full h-auto rounded-[2rem] shadow-[0_20px_40px_rgba(0,0,0,0.08)] border border-slate-100 object-cover"
                    />
                </div>

                <div className="w-full lg:w-1/2 flex flex-col justify-center">
                    <div className="w-16 h-16 bg-rose-100 text-rose-600 rounded-2xl flex items-center justify-center text-3xl mb-6 shadow-sm border border-rose-200">
                        🗺️
                    </div>
                    <h4 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">Intelligent Daily Itineraries</h4>
                    <p className="text-lg text-slate-500 mb-6 font-medium leading-relaxed">
                        Say goodbye to endless Google tabs. Your complete journey is laid out day-by-day in a premium timeline, perfectly optimized for travel time, opening hours, and geographic proximity.
                    </p>
                    <ul className="space-y-4">
                        <li className="flex items-start gap-3">
                            <span className="text-rose-500 mt-1"><svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg></span>
                            <span className="text-slate-600 font-medium">Smart route-mapping to save time</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-rose-500 mt-1"><svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg></span>
                            <span className="text-slate-600 font-medium">Automatic ticket and time estimations</span>
                        </li>
                    </ul>
                </div>
            </div>

        </div>
    </section>
  )
}

export default Features
