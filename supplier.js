import mongoose from "mongoose";

const supplierSchema = new mongoose.Schema({
  id: Number,
  name: String,
  email: String,
  inventory: [{ type: String }],
  customers: [{ type: mongoose.Schema.Types.ObjectId, ref: "Consumer" }],
  balance: Number,
  services: {
    cropPurchase: Boolean,
    inventoryManagementService: Boolean,
    logisticsAndDistributionService: Boolean,
    supplierCustomerManagementService: Boolean,
    communicationService: Boolean,
    paymentFromConsumer: Boolean,
    paymentToSupplier: Boolean,
  },
});

export default mongoose.model("Supplier", supplierSchema);

export class Supplier {
  constructor(identityInfo) {
    this.id = identityInfo.id;
    this.name = identityInfo.name;
    this.email = identityInfo.email;
    this.inventory = []; // List of crops in inventory
    this.customers = []; // List of customers
    this.balance = 0; // Initial balance is 0
    this.services = {
      cropPurchase: true,
      inventoryManagementService: true,
      logisticsAndDistributionService: true,
      supplierCustomerManagementService: true,
      communicationService: true,
      paymentFromConsumer: true,
      paymentToSupplier: true,
    };
  }

  killService(serviceName) {
    if (this.services[serviceName]) {
      this.services[serviceName] = false;
      console.log(`Supplier service ${serviceName} has been killed`);
    }
  }

  checkService(serviceName) {
    if (!this.services[serviceName]) {
      console.log(`Supplier service ${serviceName} is not available`);
    } else {
      console.log(`Congrats, Supplier service ${serviceName} is available`);
    }
  }

  cropPurchase(crop) {
    if (!this.services.cropPurchase) {
      console.log("Crop purchase service is not available");
      return null;
    }
    this.inventory.push(crop);
    console.log(`${this.name} purchased crop ${crop} from farmer`);
  }

  inventoryManagementService() {
    if (!this.services.inventoryManagementService) {
      console.log("Inventory management service is not available");
      return null;
    }
    console.log(`Supplier ${this.name} inventory:`);
    this.inventory.forEach((crop) => {
      console.log(`  - ${crop.name}`);
    });
  }

  logisticsAndDistributionService() {
    if (!this.services.logisticsAndDistributionService) {
      console.log("Logistics and distribution service is not available");
      return null;
    }
    console.log(`Supplier ${this.name} is handling logistics and distribution`);
  }

  supplierCustomerManagementService() {
    if (!this.services.supplierCustomerManagementService) {
      console.log("Supplier customer management service is not available");
      return null;
    }
    console.log(`Supplier ${this.name} is managing customer relationships:`);
    this.customers.forEach((customer) => {
      console.log(`  - ${customer.name}`);
    });
  }

  communicationService(message) {
    if (!this.services.communicationService) {
      console.log("Communication service is not available");
      return null;
    }
    console.log(`Supplier ${this.name} received message: ${message}`);
  }

  paymentFromConsumer(amount) {
    if (!this.services.paymentFromConsumer) {
      console.log("Payment from consumer service is not available");
      return null;
    }
    this.balance += amount;
    console.log(
      `Supplier ${this.name} received payment of ${amount} from consumer`
    );
  }

  paymentToSupplier(amount) {
    if (!this.services.paymentToSupplier) {
      console.log("Payment to supplier service is not available");
      return null;
    }
    this.balance -= amount;
    console.log(
      `Supplier ${this.name} made payment of ${amount} to another supplier`
    );
  }

  getBalance() {
    if (!this.services.getBalance) {
      console.log("Balance retrieval service is not available");
      return null;
    }
    return this.balance;
  }
}
