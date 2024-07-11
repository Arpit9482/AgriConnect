import HeadRegistry from "./headRegistry.js";
import { default as FarmerModel, Farmer } from "./farmer.js";
import { default as ConsumerModel, Consumer } from "./consumer.js";
import { default as SupplierModel, Supplier } from "./supplier.js";

const headRegistry = new HeadRegistry();

const farmer1Doc = headRegistry.createNode("Farmer", {
  id: 1,
  name: "Farmer 1",
  email: "farmer1@example.com",
});
const farmer1 = new Farmer(farmer1Doc);

const consumer1Doc = headRegistry.createNode("Consumer", {
  id: 2,
  name: "Consumer 1",
  email: "consumer1@example.com",
});
const consumer1 = new Consumer(consumer1Doc);

const supplier1Doc = headRegistry.createNode("Supplier", {
  id: 3,
  name: "Supplier 1",
  email: "supplier1@example.com",
});
const supplier1 = new Supplier(supplier1Doc);

headRegistry.addNode(farmer1Doc);
headRegistry.addNode(consumer1Doc);
headRegistry.addNode(supplier1Doc);

// Test cases
supplier1.cropPurchase("Wheat"); 
supplier2.cropPurchase("Wheat"); 
supplier3.cropPurchase("Wheat"); 
consumer1.cropRequestService("Rice"); 

consumer1.killService("cropRequestService");
consumer1.cropRequestService("Wheat");

// Get list of suppliers for a crop
async function getSuppliersForCrop(crop) {
  const suppliers = await SupplierModel.find({ inventory: crop });
  return suppliers;
}

// Get list of consumers for a crop
async function getConsumersForCrop(crop) {
  const consumers = await ConsumerModel.find({ orders: crop });
  return consumers;
}

getSuppliersForCrop("Wheat").then((suppliers) => {
  console.log("Suppliers for Wheat:", suppliers);
});

getConsumersForCrop("Rice").then((consumers) => {
  console.log("Consumers for Rice:", consumers);
});
