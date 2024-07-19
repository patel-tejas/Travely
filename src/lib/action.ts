import { addDoc, collection, doc, getDoc } from "firebase/firestore"
import { db } from "./db"

export const createTrip = async (id: string, userSelection: any, data: any) => {
    try {
        
        const tripDoc = await addDoc(collection(db, 'trips'), {
            id,
            userSelection,
            ...data
        })
        
        return tripDoc.id
    } catch (error) {
        return error;
    }
}

export const getTripDetails = async(id: string) => {
    try {
        // add firebase get trip by id
        const tripDocRef = doc(db, 'trips', id);
        const tripDocSnap = await getDoc(tripDocRef);

        if (tripDocSnap.exists()) {
            return tripDocSnap.data();
        } else {
            throw new Error('No such document!');
        }
    } catch (error) {
        console.log(error);
        return null;
        
    }
}

