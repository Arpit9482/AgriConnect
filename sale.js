import mongoose from "mongoose";

const saleSchema = new mongoose.Schema({
  crop: { type: mongoose.Schema.Types.ObjectId, ref: "Crop" },
  consumer: { type: mongoose.Schema.Types.ObjectId, ref: "Consumer" },
  supplier: { type: mongoose.Schema.Types.ObjectId, ref: "Supplier" },
  amount: Number,
});

export default mongoose.model("Sale", saleSchema);
