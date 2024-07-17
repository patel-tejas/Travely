import Link from 'next/link'
import React from 'react'

const Hero = () => {
    return (
        <section className="bg-gray-50" >
            <div className="p-8 md:p-12 lg:px-16 lg:py-24">
                <div className="mx-auto max-w-lg text-center">
                    <h2 className="text-2xl font-bold text-gray-900 md:text-5xl capitalize">
                       Plan your next trip with TripGuruji
                    </h2>

                    <p className="hidden text-gray-500 sm:mt-4 sm:block">
                        
                    </p>
                </div>

                <div className="mx-auto mt-8 max-w-xl flex items-center justify-center">

                        <Link
                            href="/create-trip"
                            className="group mt-4 flex w-full items-center justify-center gap-2 rounded-md bg-rose-600 px-5 py-3 text-white transition focus:outline-none focus:ring focus:ring-yellow-400 sm:mt-0 sm:w-auto"
                        >
                            <span className="text-sm font-medium"> Let's Trip </span>

                            <svg
                                className="size-5 rtl:rotate-180"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                                />
                            </svg>
                        </Link>
              
                </div>
            </div>
        </section >
    )
}

export default Hero