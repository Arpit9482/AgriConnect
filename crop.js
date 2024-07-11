import mongoose from "mongoose";

const cropSchema = new mongoose.Schema({
  name: String,
  quantity: Number,
  farmer: { type: mongoose.Schema.Types.ObjectId, ref: "Farmer" },
});

export default mongoose.model("Crop", cropSchema);
