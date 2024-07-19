import Image from 'next/image';
import React from 'react'
import img from "../../public/travelBanner.jpg"

const TripHeader = ({ days, budget, people, destination }: { days: string, budget: string, people: string, destination: any }) => {
    // console.log(days);

    return (
        <article className="bg-white mb-5 flex flex-col sm:flex-row sm:h-[40vh]">
            <div className='h-[40vh] sm:h-full relative w-full sm:w-1/2 gap-2 '>
                <Image src={img} alt="travel" className='object-cover w-full h-full absolute' />
            </div>
            <div className='flex flex-col items-start px-4 pb-5 border-b sm:w-1/2 sm:ml-5'>
                <h2 className='text-sm sm:text-xl font-semibold my-2 sm:my-5 bg-gray-200 rounded-full px-2 py-1 sm:px-3 sm:py-2 text-black'>You Searched for</h2>
                <div className="flex items-start sm:gap-8 w-full">
                    <div className='w-full'>
                        <h2 className='text-2xl font-bold text-blue-600 w-full'>{destination}</h2>

                        <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm sm:text-[15px]">
                            <div className="flex items-center gap-1 text-white w-max bg-green-500 px-2 py-1 sm:px-3 sm:py-2 rounded-full">
                                <p className="font-medium">{days} day/s</p>
                            </div>

                            <span className="hidden text-2xl sm:block" aria-hidden="true" >|</span>

                            <p className="flex items-center gap-1 text-black w-max bg-yellow-300 px-2 py-1 sm:px-3 sm:py-2 rounded-full">
                                Budget: <span className=''>{budget}</span>
                            </p>
                            <p className="flex items-center gap-1 text-black w-max bg-blue-300 px-2 py-1 sm:px-3 sm:py-2 rounded-full">
                                 {people}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </article>
    )
}

export default TripHeader