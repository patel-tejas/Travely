import mongoose from "mongoose";

const ImageCacheSchema = new mongoose.Schema(
  {
    query: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const ImageCache = mongoose.models.ImageCache || mongoose.model("ImageCache", ImageCacheSchema);

export default ImageCache;
