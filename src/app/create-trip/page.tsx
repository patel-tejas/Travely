"use client"
import React, { useEffect, useState } from 'react'
import GooglePlacesAutocomplete from 'react-google-places-autocomplete'
import GooglePlacesAutocompleteProps from 'react-google-places-autocomplete/build/types'
import { Input } from "@/components/ui/input"
import { SelectBudgetOption, SelectTravellerList } from '@/lib/options'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'
import { chatSession } from '@/lib/AiModel'
import { useSession, useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { BiLoaderAlt } from "react-icons/bi";
import { createTrip } from '@/lib/action'

const page = () => {
  // const {user} = useUser();
  const router = useRouter()
  const [place, setPlace] = useState<any>()
  const [formData, setFormData] = useState<any>([])
  const [loading, setLoading] = useState<boolean>(false)
  const { toast } = useToast()
  // const {session} = useSession()

  const {user} = useUser();
  // console.log(user);
  
  
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
    if (!formData || !formData.destination || !formData.budget || !formData.people || !formData.days) {
      toast({
        title: "Failed to Generate",
        description: "Please fill all the fields",
      })
      setLoading(false)
      return;
    }
    e.preventDefault()
    const finalPrompt = `Generate a travel plan for location: ${formData.destination.label}, for ${formData.days} days for ${formData.people} with a ${formData.budget} Budget. Give me a hotels option list with hotel name, Hotel address, price, hotel image url, geo coordinates, rating, description, and suggest itinerary with placeName, Place Details, Place Image Url, Geo Coordinates, ticket pricing, time travel each of the location for ${formData.days} days with each day with best time to visit in JSON Format. Make sure the to return Days in correct format like Day 1 and then Day 2 with their location images and itinerary.`

    const getTravelPlan = await chatSession.sendMessage(finalPrompt);
    const formattedRes= JSON.parse(getTravelPlan.response.text().replaceAll("```json", "").replaceAll("```", "") )   
    // console.log(formattedRes);
    const tripId = await createTrip(user.id, formData, formattedRes);
    console.log(tripId);

    router.push(`/view-trip/${tripId}`)

    setLoading(false)
  }

  return (
    <div className='sm:px-10 md:px-32 lg:px-56 px-5 my-10'>
      <h2 className='text-3xl font-bold'>Tell us your travel preferences</h2>
      <p className='mt-3 text-gray-500 text-lg'>Just provide some basic information, our trip planner will do the rest</p>

      <div className='mt-10 flex flex-col gap-10'>
        <div>
          <h2 className='text-xl my-3 font-semibold'>What is the destination? 🏕️🌴 </h2>
          <GooglePlacesAutocomplete
            apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}
            selectProps={{
              value: place,
              onChange: (value) => {
                setPlace(value)
                handleInputChange('destination', value)
              }
            }}
          />
        </div>

        <div className='flex flex-col gap-1'>
          <h2 className='text-lg font-semibold'>How many days are you planning to go?</h2>
          <Input type="number" placeholder="Ex: 3" className='focus:outline-none ' min={1} max={7} required onChange={(e) => handleInputChange('days', e.target.value)} />
        </div>

        <div className='flex flex-col gap-3'>
          <h2 className='text-lg font-semibold'>What is Your Budget?</h2>
          <div className='grid grid-cols-2 sm:grid-cols-3 gap-5 w-full'>
            {
              SelectBudgetOption.map((option) => (
                <div key={option.id} className={`flex flex-col p-4 border rounded-lg hover:shadow-lg duration-200 cursor-pointer ${formData.budget === option.title && 'bg-green-100 shadow-lg border border-gray-600'}`} onClick={() => {
                  handleInputChange('budget', option.title)
                }}>
                  <h2 className='text-3xl'>{option.icon}</h2>
                  <h2 className='text-lg font-bold'>{option.title}</h2>
                  <h2 className='text-sm text-gray-500'>{option.desc}</h2>
                </div>
              ))
            }
          </div>
        </div>


        <div className='flex flex-col gap-3'>
          <h2 className='text-lg font-semibold'>Whom are travelling with?</h2>
          <div className='grid grid-cols-2 sm:grid-cols-3 gap-5 w-full'>
            {
              SelectTravellerList.map((option) => (
                <div key={option.id} className={`flex flex-col p-4 border rounded-lg hover:shadow-lg duration-200 cursor-pointer ${formData.people === option.title && 'bg-blue-100 shadow-lg border border-gray-600'}`}
                  onClick={() => handleInputChange('people', option.title)}>
                  <h2 className='text-3xl'>{option.icon}</h2>
                  <h2 className='text-lg font-bold'>{option.title}</h2>
                  <h2 className='text-sm text-gray-500'>{option.people}</h2>
                </div>
              ))
            }
          </div>
        </div>
      </div>
      <div className='mt-10 flex items-center justify-center'>
        
        <Button className={`w-full sm:w-1/5`} onClick={handleSubmit}>
        {
          loading ? <BiLoaderAlt className='w-5 h-5 animate-spin'/> : 
          "Generate Trip"
        }
        </Button>
      </div>
    </div>
  )
}

export default page