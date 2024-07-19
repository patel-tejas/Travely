import Image from 'next/image'
import React from 'react'

import img from "../../public/travelBanner.jpg"
import Link from 'next/link';

const Hotels = ({ hotels }: any) => {
    // console.log(hotels);

    return (
        <div className='px-3 sm:px-5 lg:px-10 mb-10'>
            <h2 className='font-bold text-xl my-5'>Hotel Recommendations</h2>

            <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-10'>
                {
                    hotels.map((hotel: any, idx: number) => {
                        console.log(hotel);

                        return (
                            <Link href={`https://www.google.com/maps/search/?api=1&query=${hotel.hotel_name}`} className="block rounded-lg p-4 shadow-sm shadow-indigo-100 hover:scale-105   transition-all duration-100" target='_blank'>
                                <Image
                                    alt=""
                                    src={img}
                                    className="h-56 w-full rounded-md object-cover"
                                />

                                <div className="mt-2">
                                    <dl>
                                        <div>
                                            <dt className="sr-only">Price</dt>

                                            <dd className="text-sm text-gray-500">{hotel.price}</dd>
                                        </div>

                                        <div>
                                            <dt className="sr-only">Address</dt>

                                            <dd className="font-medium">{hotel.hotel_name}</dd>
                                        </div>
                                    </dl>
                                    <p className='text-sm text-gray-500 mt-3'>
                                        {hotel.description}
                                    </p>
                                    <div className="mt-3 flex items-center gap-8 text-xs">
                                        <div className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
                                            <svg
                                                className="size-4 text-indigo-700"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                                                />
                                            </svg>

                                            <div className="mt-1.5 sm:mt-0">
                                                <p className="text-gray-500">Ratings</p>

                                                <p className="font-medium">{hotel.rating}</p>
                                            </div>
                                        </div>




                                    </div>
                                </div>
                            </Link>
                        )

                    })
                }
            </div>

        </div>
    )
}

export default Hotels