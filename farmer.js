import { mongoose } from "mongoose";
import { CropPredictionModel } from "./cropprediction.js";

const farmerSchema = new mongoose.Schema({
  id: Number,
  name: String,
  email: String,
  crops: [{ type: mongoose.Schema.Types.ObjectId, ref: "Crop" }],
  sales: [{ type: mongoose.Schema.Types.ObjectId, ref: "Sale" }],
  balance: Number,
  services: {
    cropPrediction: Boolean,
    cropRegistration: Boolean,
    marketPriceService: Boolean,
    communicationService: Boolean,
    salesTrackingService: Boolean,
    paymentFromSupplier: Boolean,
  },
});

export default mongoose.model("Farmer", farmerSchema);

export class Farmer {
  constructor(identityInfo) {
    this.id = identityInfo.id;
    this.name = identityInfo.name;
    this.email = identityInfo.email;
    this.cropPredictionModel = new CropPredictionModel();
    this.crops = []; // Registered crops
    this.sales = []; // Sales tracking
    this.balance = 0;
    this.services = {
      cropPrediction: true,
      cropRegistration: true,
      marketPriceService: true,
      communicationService: true,
      salesTrackingService: true,
      paymentFromSupplier: true,
    };
  }

  killService(serviceName) {
    if (this.services[serviceName]) {
      this.services[serviceName] = false;
      console.log(`Farmer service ${serviceName} has been killed`);
    }
  }

  checkService(serviceName) {
    if (!this.services[serviceName]) {
      console.log(`Farmer service ${serviceName} is not available`);
    } else {
      console.log(`Congrats, Farmer service ${serviceName} is available`);
    }
  }

  cropPrediction(params) {
    if (!this.services.cropPrediction) {
      console.log("Crop prediction service is not available");
      return null;
    }
    return this.cropPredictionModel.predict(params);
  }

  cropRegistration(crop) {
    if (!this.services.cropRegistration) {
      console.log("Crop registration service is not available");
      return null;
    }
    this.crops.push(crop);
    console.log(`Farmer ${this.name} registered crop ${crop.name}`);
  }

  marketPriceService(crop) {
    if (!this.services.marketPriceService) {
      console.log("Market price service is not available");
      return null;
    }
    // Use ML model to predict price (dummy implementation, replace with actual ML model)
    return 100; // dummy price
  }

  communicationService(message) {
    if (!this.services.communicationService) {
      console.log("Communication service is not available");
      return null;
    }
    console.log(`Farmer ${this.name} received message: ${message}`);
  }

  salesTrackingService(sale) {
    if (!this.services.salesTrackingService) {
      console.log("Sales tracking service is not available");
      return null;
    }
    this.sales.push(sale);
    console.log(
      `Farmer ${this.name} sold ${sale.crop.name} to ${sale.consumer.name}`
    );
  }

  paymentFromSupplier(amount) {
    if (!this.services.paymentFromSupplier) {
      console.log("Payment from supplier service is not available");
      return null;
    }
    this.balance += amount;
    console.log(
      `Farmer ${this.name} received payment of ${amount} from supplier`
    );
  }
}
