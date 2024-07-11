import { mongoose } from "mongoose";

const consumerSchema = new mongoose.Schema({
  id: Number,
  name: String,
  email: String,
  suppliers: [{ type: mongoose.Schema.Types.ObjectId, ref: "Supplier" }],
  orders: [{ type: String }],
  deliveries: [{ type: mongoose.Schema.Types.ObjectId, ref: "Delivery" }],
  balance: Number,
  services: {
    cropRequestService: Boolean,
    supplierBrowsingService: Boolean,
    orderPlacementService: Boolean,
    deliveryTrackingService: Boolean,
    communicationService: Boolean,
    paymentToSupplier: Boolean,
  },
});

export default mongoose.model("Consumer", consumerSchema);

export class Consumer {
  constructor(identityInfo) {
    this.id = identityInfo.id;
    this.name = identityInfo.name;
    this.email = identityInfo.email;
    this.suppliers = []; // List of suppliers
    this.orders = []; // List of orders
    this.deliveries = []; // List of deliveries
    this.balance = 0; // Initial balance is 0
    this.services = {
      cropRequestService: true,
      supplierBrowsingService: true,
      orderPlacementService: true,
      deliveryTrackingService: true,
      communicationService: true,
      paymentToSupplier: true,
    };
  }

  killService(serviceName) {
    if (this.services[serviceName]) {
      this.services[serviceName] = false;
      console.log(`Consumer service ${serviceName} has been killed`);
    }
  }

  checkService(serviceName) {
    if (!this.services[serviceName]) {
      console.log(`Consumer service ${serviceName} is not available`);
    } else {
      console.log(`Congrats, Consumer service ${serviceName} is available`);
    }
  }

  cropRequestService(crop) {
    if (!this.services.cropRequestService) {
      console.log("Crop request service is not available");
      return null;
    }
    console.log(`${this.name} requested crop ${crop} from farmer`);
  }

  supplierBrowsingService() {
    if (!this.services.supplierBrowsingService) {
      console.log("Supplier browsing service is not available");
      return null;
    }
    console.log(`Consumer ${this.name} is browsing suppliers:`);
    this.suppliers.forEach((supplier) => {
      console.log(`  - ${supplier.name}`);
    });
  }

  orderPlacementService(order) {
    if (!this.services.orderPlacementService) {
      console.log("Order placement service is not available");
      return null;
    }
    this.orders.push(order);
    console.log(
      `Consumer ${this.name} placed order for ${order.crop.name} with supplier ${order.supplier.name}`
    );
  }

  deliveryTrackingService() {
    if (!this.services.deliveryTrackingService) {
      console.log("Delivery tracking service is not available");
      return null;
    }
    console.log(`Consumer ${this.name} delivery tracking:`);
    this.deliveries.forEach((delivery) => {
      console.log(
        `  - ${delivery.crop.name} from supplier ${delivery.supplier.name} (Status: Pending)`
      );
    });
  }

  communicationService(message) {
    if (!this.services.communicationService) {
      console.log("Communication service is not available");
      return null;
    }
    console.log(`Consumer ${this.name} received message: ${message}`);
  }

  paymentToSupplier(amount, supplier) {
    if (!this.services.paymentToSupplier) {
      console.log("Payment to supplier service is not available");
      return null;
    }
    this.balance -= amount;
    console.log(
      `Consumer ${this.name} paid ${amount} to supplier ${supplier.name}`
    );
  }
}
