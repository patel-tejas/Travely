import mongoose from "mongoose";

const TripSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    userSelection: {
      type: Object,
      required: true,
    },
    tripData: {
      type: Object, // Stores formattedRes details like hotels, itinerary, etc.
      required: true,
    },
  },
  { timestamps: true }
);

// We define the model this way to prevent 'OverwriteModelError' in Next.js development
const Trip = mongoose.models.Trip || mongoose.model("Trip", TripSchema);

export default Trip;
