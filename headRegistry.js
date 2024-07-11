import mongoose from "mongoose";
import Farmer from "./farmer.js";
import Consumer from "./consumer.js";
import Supplier from "./supplier.js";

mongoose.connection.bufferTimeoutMS = 3000;
mongoose
  .connect(
    "mongodb+srv://deepaksuthar40128:ramramram@cluster0.blcdoln.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB");
  });

export default class HeadRegistry {
  constructor() {
    this.nodes = {};
  }

  createNode(type, identityInfo) {
    switch (type) {
      case "Farmer":
        return new Farmer(identityInfo);
      case "Consumer":
        return new Consumer(identityInfo);
      case "Supplier":
        return new Supplier(identityInfo);
      default:
        throw new Error("Invalid node type");
    }
  }

  deleteNode(nodeId) {
    mongoose.model(nodeId.type).deleteOne({ _id: nodeId.id }, (err) => {
      if (err) console.error(err);
      console.log(`Node ${nodeId.id} deleted from database`);
    });
  }

  getNode(nodeId) {
    return mongoose.model(nodeId.type).findById(nodeId.id);
  }

  addNode(node) {
    node
      .save()
      .then(() => {
        console.log(`Node ${node.id} saved to database`);
      })
      .catch((err) => {
        console.error(err);
      });
  }
}
