import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY!;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
    model: "gemini-1.5-pro",
});

const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
};

export const chatSession = model.startChat({
    generationConfig,
    history: [
        {
            role: "user",
            parts: [
                { text: "Generate a travel plan for location: Mumbai, for 3 days for COuple with a Cheap Budget. Give me a hotels option list with hotel name, Hotel address, price, hotel image url, geo coordinates, rating, description, and suggest itinerary with placeName, Place Details, Place Image Url, Geo Coordinates, ticket pricing, time travel each of the location for 3 days  with each day with best time to visit in JSON Format." }
            ],
        },
        {
            role: "model",
            parts: [
                { text: "```json\n{\n  \"trip_name\": \"Romantic Mumbai on a Budget\",\n  \"trip_duration\": \"3 days\",\n  \"destination\": \"Mumbai, India\",\n  \"budget\": \"Cheap\",\n  \"travelers\": \"Couple\",\n  \"hotels\": [\n    {\n      \"hotel_name\": \"Hotel Causeway\",\n      \"address\": \"Near CST, Mumbai\",\n      \"price\": \"₹1,000 per night\",\n      \"image_url\": \"https://example.com/hotel_causeway.jpg\",\n      \"geo_coordinates\": {\n        \"latitude\": 18.9402,\n        \"longitude\": 72.8339\n      },\n      \"rating\": 3.8,\n      \"description\": \"A budget-friendly hotel near major attractions.\"\n    },\n    {\n      \"hotel_name\": \"FabHotel Prime\",\n      \"address\": \"Andheri East, Mumbai\",\n      \"price\": \"₹1,200 per night\",\n      \"image_url\": \"https://example.com/fabhotel_prime.jpg\",\n      \"geo_coordinates\": {\n        \"latitude\": 19.1121,\n        \"longitude\": 72.8698\n      },\n      \"rating\": 4.0,\n      \"description\": \"Modern and comfortable accommodations in a convenient location.\"\n    },\n    {\n      \"hotel_name\": \"Hotel Bawa International\",\n      \"address\": \"Near Gateway of India, Mumbai\",\n      \"price\": \"₹900 per night\",\n      \"image_url\": \"https://example.com/hotel_bawa.jpg\",\n      \"geo_coordinates\": {\n        \"latitude\": 18.9220,\n        \"longitude\": 72.8345\n      },\n      \"rating\": 3.5,\n      \"description\": \"Basic but clean hotel with a prime location near the Gateway of India.\"\n    }\n  ],\n  \"itinerary\": {\n    \"day_1\": {\n      \"best_time_to_visit\": \"Morning\",\n      \"places\": [\n        {\n          \"place_name\": \"Gateway of India\",\n          \"details\": \"Iconic arch built in 1924, offering stunning harbor views.\",\n          \"image_url\": \"https://example.com/gateway_of_india.jpg\",\n          \"geo_coordinates\": {\n            \"latitude\": 18.9220,\n            \"longitude\": 72.8345\n          },\n          \"ticket_price\": \"Free\",\n          \"travel_time\": \"1-2 hours\"\n        },\n        {\n          \"place_name\": \"Elephanta Caves\",\n          \"details\": \"UNESCO World Heritage Site with ancient cave temples dedicated to Lord Shiva.\",\n          \"image_url\": \"https://example.com/elephanta_caves.jpg\",\n          \"geo_coordinates\": {\n            \"latitude\": 18.9649,\n            \"longitude\": 72.9318\n          },\n          \"ticket_price\": \"₹260 (ferry + entry)\",\n          \"travel_time\": \"Half day (including ferry)\"\n        }\n      ]\n    },\n    \"day_2\": {\n      \"best_time_to_visit\": \"Daytime\",\n      \"places\": [\n        {\n          \"place_name\": \"Dhobi Ghat\",\n          \"details\": \"Open-air laundry where thousands of clothes are washed by hand daily.\",\n          \"image_url\": \"https://example.com/dhobi_ghat.jpg\",\n          \"geo_coordinates\": {\n            \"latitude\": 18.9721,\n            \"longitude\": 72.8326\n          },\n          \"ticket_price\": \"Free\",\n          \"travel_time\": \"1-2 hours\"\n        },\n        {\n          \"place_name\": \"Mani Bhavan Gandhi Museum\",\n          \"details\": \"Former residence of Mahatma Gandhi, showcasing his life and work.\",\n          \"image_url\": \"https://example.com/mani_bhavan.jpg\",\n          \"geo_coordinates\": {\n            \"latitude\": 19.0448,\n            \"longitude\": 72.8224\n          },\n          \"ticket_price\": \"₹5\",\n          \"travel_time\": \"1-2 hours\"\n        },\n        {\n          \"place_name\": \"Marine Drive\",\n          \"details\": \"Scenic promenade offering beautiful sunset views over the Arabian Sea.\",\n          \"image_url\": \"https://example.com/marine_drive.jpg\",\n          \"geo_coordinates\": {\n            \"latitude\": 18.9422,\n            \"longitude\": 72.8236\n          },\n          \"ticket_price\": \"Free\",\n          \"travel_time\": \"Evening (for sunset)\"\n        }\n      ]\n    },\n    \"day_3\": {\n      \"best_time_to_visit\": \"Anytime\",\n      \"places\": [\n        {\n          \"place_name\": \"Chhatrapati Shivaji Maharaj Terminus\",\n          \"details\": \"UNESCO World Heritage Site and a stunning example of Victorian Gothic architecture.\",\n          \"image_url\": \"https://example.com/cst_station.jpg\",\n          \"geo_coordinates\": {\n            \"latitude\": 18.9402,\n            \"longitude\": 72.8339\n          },\n          \"ticket_price\": \"Free (unless entering for train travel)\",\n          \"travel_time\": \"1-2 hours\"\n        },\n        {\n          \"place_name\": \"Juhu Beach\",\n          \"details\": \"Popular beach for street food, sunset views, and celebrity spotting.\",\n          \"image_url\": \"https://example.com/juhu_beach.jpg\",\n          \"geo_coordinates\": {\n            \"latitude\": 19.1087,\n            \"longitude\": 72.8084\n          },\n          \"ticket_price\": \"Free\",\n          \"travel_time\": \"Evening (for sunset)\"\n        }\n      ]\n    }\n  }\n}\n```" },
            ],
        },
    ],
});
