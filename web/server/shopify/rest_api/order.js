import { Shopify } from "@shopify/shopify-api";
import {
  Order,
} from "@shopify/shopify-api/dist/rest-resources/2022-07/index.js";

// Orders


export const getAllOrders = async (session) => {
  try {
    return await Order.all({
      // limit: 1,
      // offset: 1,
      session: session,
      status: "open",
    });
  } catch (err) {
    console.log(` Catch Error of Get All Orders = ${err.name}`, err);
  }
};

export const getOrder = async (session,id) => {
  try {
    return await Order.find({
      session: session,
      id: id,
    });
  } catch (err) {
    console.log(` Catch Error of Get All Orders = ${err.name} `, err);
  }
};



