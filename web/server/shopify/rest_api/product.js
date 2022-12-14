import { Shopify } from "@shopify/shopify-api";
import {
  Product,
} from "@shopify/shopify-api/dist/rest-resources/2022-07/index.js";


// Product

export const getAllProducts = async (session) => {
  try {
    return await Product.all({
      // limit:1,
      session: session,
    });
  } catch (err) {
    console.log(` Catch Error of Get All Products = ${err.name}`,err);
  }
};

export const getProduct = async (session,id) => {
  try {
    return await Product.find({
      session: session,
      id: id,
    });
  } catch (err) {
    console.log(` Catch Error of Get Product = ${err.name}`, err);
  }
};
