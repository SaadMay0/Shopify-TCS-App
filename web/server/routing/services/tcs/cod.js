import { Shopify } from "@shopify/shopify-api";
import db from "../../../db/models/postgres/index.js";
import { getOrder } from "../../../shopify/rest_api/order.js";

import {
  orderObj,
  isFragileProduct,
} from "../helper_functions/shopify/helper.js";

import {
  placeOrder,
  costCenterCod,
  orderCancel,
  orderReverse,
  trackCODorder,
} from "../helper_functions/tcs/cod.js";
import "colors";

export const costCenter = async (req, res) => {
  try {
    const session = await Shopify.Utils.loadCurrentSession(req, res, false);

    const preferences = await db.Preferences.findOne({
      where: { storeId: session.id },
    });

    let body = {
      ...req.body,
      //   userName: preferences.userName,
      //   password: preferences.password,
      userName: "testenvio",
      password: "abc123+",
      accountNo: preferences.accountNo,
    };

    let data = await costCenterCod(preferences.apiKey, body);
    //   let cn = data.data.bookingReply.result.split(":").pop();

    let match = req.body.costCenterCode;


    if (data.data.returnStatus.status == "SUCCESS") {
      const [row, created] = await db.CostCenter.findOrCreate({
        where: { costCenterCode: match, storeId: session.id },
        defaults: {
          ...body,
        },
      });

      console.log(`costCenterCod ${req.body}`);
      res.status(200).send({
        Responce: {
          status: data.data.returnStatus,
          created,
          data: row,
        },
      });
    } else {
      res.status(400).send({
        Responce: {
          status: data.data.returnStatus,
        },
      });
    }
  } catch (err) {
    console.log(`Error   = ${err.name}, ${err}`);
  }
};

export const shipingOrders = async (req, res) => {
  console.log( "shipingOrders".yellow);
  const {
    selectedResources,
    costCenterCode,
    consigneeName,
    consigneeAddress,
    consigneeMobNo,
    consigneeEmail,
    originCity,
    codAmount,
    customerReferenceNo,
    service,
    insurance,
  } = req.body;
  try {
    const session = await Shopify.Utils.loadCurrentSession(req, res, false);
    const preferences = await db.Preferences.findOne({
      where: { storeId: session.id },
    });

    let preferencesObj = {
      userName: preferences.userName,
      password: preferences.password,
      costCenterCode: costCenterCode || preferences.costCenterCode,
      consigneeName: consigneeName || preferences.consigneeName,
      consigneeAddress: consigneeAddress || preferences.consigneeAddress,
      consigneeMobNo: consigneeMobNo || preferences.consigneeMobNo,
      consigneeEmail: consigneeEmail || preferences.consigneeEmail,
      originCityName: originCity || preferences.originCity,
      insuranceValue: insurance || preferences.insurance,
      services: service || preferences.service,
    };

    let responses = [];

    await Promise.all(
      selectedResources.map(async (ele) => {
        const ShopifyOrderId = await db.ShipmentOrder.findOne({
          where: { id: ele, storeId: session.id },
        });
        let order = await getOrder(session, ShopifyOrderId.shopifyOrderId);
        delete order.session;

        let result = await orderObj(session,order);
        delete result.id;
        let isfragile = await isFragileProduct(session, order);


        let body = {
          ...result,
          ...preferencesObj,
          fragile: isfragile || "Yes",
          codAmount: codAmount || "1",
          // customerReferenceNo: customerReferenceNo || "STring",
        };

        let data = await placeOrder(preferences.apiKey, body);


        if (data.data.returnStatus.status == "SUCCESS") {
          let cn = String(
            data.data.bookingReply.result.split(":").pop().trim()
          );
          const result = await db.ShipmentOrder.update(
            {
              ...body,
              isOrderReverse: false,
              isShipingByCN: false,
              shipingByCNFields: {},
              isOrderPlaced: true,
              generatedCN: cn,
              storeId: session.id,
            },
            {
              where: {
                shopifyOrderNbr: String(order.order_number),
                storeId: session.id,
              },
            }
          );
          console.log(`Shiping Order Nbr ${order.order_number} Placed `);
          let obj = {
            [`${order.order_number}`]: {
              Responce: data.data,
              Data: result,
            },
          };
          responses.push(obj);
        } else {
          let obj = {
            [`${order.order_number}`]: {
              Responce: data.data,
              Data: body,
            },
          };
          console.log(`Shiping Order Nbr ${order.order_number} Fail to Placed `);
          responses.push(obj);
        }
      })
    );

    res.status(200).send({
      Responce: responses,
    });

  } catch (err) {
    console.log(`Error   = ${err.name}, ${err}`);
  }
};
export const shipSingleOrder = async (req, res) => {
  console.log( "shipSingleOrder".yellow);
  const {
    orderId,
    costCenterCode,
    consigneeName,
    consigneeAddress,
    consigneeMobNo,
    consigneeEmail,
    originCity,
    destinationCityName,
    weight,
    pieces,
    codAmount,
    customerReferenceNo,
    service,
    productDetails,
    fragile,
    remarks,
    insurance,
  } = req.body;
  try {
    const session = await Shopify.Utils.loadCurrentSession(req, res, false);
    const preferences = await db.Preferences.findOne({
      where: { storeId: session.id },
    });

    const ShopifyOrderId = await db.ShipmentOrder.findOne({
      where: { id: orderId, storeId: session.id },
    });
    // let bestMatch = await BestMatchOfCity("Lahore");
    let order = await getOrder(session, ShopifyOrderId.shopifyOrderId);
    let isOrderFragile = await isFragileProduct(session,order);

    let result = await orderObj(session,order);
    // delete result.id;
    let preferencesObj = {
      userName: preferences.userName,
      password: preferences.password,
      costCenterCode: costCenterCode || preferences.costCenterCode,
      consigneeName: consigneeName || preferences.consigneeName,
      consigneeAddress: consigneeAddress || preferences.consigneeAddress,
      consigneeMobNo: consigneeMobNo || preferences.consigneeMobNo,
      consigneeEmail: consigneeEmail || preferences.consigneeEmail,
      originCityName: originCity || preferences.originCity,
      insuranceValue: insurance || preferences.insurance,
      services: service || preferences.service, 
    };
    let body = {
      ...result,
      ...preferencesObj,
      fragile: isOrderFragile || preferences.fragile, 
      codAmount: codAmount || "1",
      customerReferenceNo: customerReferenceNo || "STring",
    };
    let data = await placeOrder(preferences.apiKey, body);
console.log(data.data.returnStatus,"/////////////////////////".red);

    if (data.data.returnStatus.status == "SUCCESS") {
      let cn = String(data.data.bookingReply.result.split(":").pop().trim());
      const result = await db.ShipmentOrder.update(
        {
          ...body,
          isOrderReverse: false,
          isShipingByCN: false,
          shipingByCNFields: {},
          isOrderPlaced: true,
          generatedCN: cn,
          storeId: session.id,
        },
        {
          where: {
            shopifyOrderNbr: String(order.order_number),
            storeId: session.id,
          },
        }
      );
      console.log(` Ship Single Order ********************************************* ${order.order_number}`.yellow);
      res.status(200).send({
        Responce: {
          Order: order.order_number,
          Status: data.data.returnStatus.status,
          Data: result,
        },
      });
    } else {
       console.log(` Ship Faile to Single Order  ${order.order_number}`.yellow);
      res.status(400).send({
        Responce: {
          Order: order.order_number,
          Status: data.data.returnStatus.status,
          Data: body,
        },
      });
    }
  } catch (err) {
    console.log(`Error   = ${err.name}, ${err}`);
  }
};

export const trackSingleOrder = async (req, res) => {
  console.log("trackSingleOrder".bgYellow);
  try {
    const session = await Shopify.Utils.loadCurrentSession(req, res, false);
    const preferences = await db.Preferences.findOne({
      where: { storeId: session.id },
    });

    let body = {
      ...req.body,
      userName: preferences.userName,
      password: preferences.password,
    };

    let data = await trackCODorder(preferences.apiKey, body);
    //   let cn = data.data.bookingReply.result.split(":").pop();

    if (data.data.returnStatus.status == "SUCCESS") {
      console.log(data.data, "trackSingleOrder Responce".bgBlue);
      res.status(200).send({
        Responce: {
          status: data.data.returnStatus,
          data: data.data.CNDetails,
        },
      });
    } else {
      res.status(400).send({
        Responce: {
          status: data.data.returnStatus,
        },
      });
    }
  } catch (err) {
    console.log(`Error   = ${err.name}, ${err}`);
  }
};
export const trackMultipleOrder = async (req, res) => {
  const { selectedResources } = req.body;
  console.log("trackMultipleOrder".bgYellow);
  try {
    const session = await Shopify.Utils.loadCurrentSession(req, res, false);
    const preferences = await db.Preferences.findOne({
      where: { storeId: session.id },
    });

    let responses = [];

    await Promise.all(
      selectedResources.map(async (ele) => {
        const order = await db.ShipmentOrder.findOne({
          where: { id: String(ele), storeId: session.id },
        });
        let body = {
          referenceNo: order.customerReferenceNo,
          userName: preferences.userName,
          password: preferences.password,
        };
        let data = await trackCODorder(preferences.apiKey, body);

        if (data.data.returnStatus.status == "SUCCESS") {
          let obj = {
            [`${order.shopifyOrderId}`]: {
              status: data.data.returnStatus,
              data: data.data.CNDetails,
            },
          };
          responses.push(obj);
        } else {
          let obj = {
            [`${order.shopifyOrderId}`]: {
              Responce: data.data,
              referenceNo: order.customerReferenceNo,
            },
          };
          responses.push(obj);
        }
      })
    );

    res.status(200).send({
      Responce: responses,
    });
  } catch (err) {
    console.log(`Error   = ${err.name}, ${err}`);
  }
};

export const cancelOrder = async (req, res) => {
  console.log("cancelOrder".bgYellow);

  try {
    const session = await Shopify.Utils.loadCurrentSession(req, res, false);

    const preferences = await db.Preferences.findOne({
      where: { storeId: session.id },
    });

    let body = {
      ...req.body,
      userName: preferences.userName,
      password: preferences.password,
    };

    let data = await orderCancel(preferences.apiKey, body);
    //   let cn = data.data.bookingReply.result.split(":").pop();

    let match = req.body.consignmentNumber;
   

    if (data.data.returnStatus.status == "SUCCESS") {
      const [row, created] = await db.ShipmentOrder.findOrCreate({
        where: { generatedCN: match, storeId: session.id },
        defaults: {},
      });
      if (!created) {
        row.isOrderCancel = true;
        await row.save();
      }
      res.status(200).send({
        Responce: {
          status: data.data.returnStatus,
          row,
        },
      });
    } else {
      res.status(400).send({
        Responce: {
          status: data.data.returnStatus,
        },
      });
    }
  } catch (err) {
    console.log(`Error   = ${err.name}, ${err}`);
  }
};
export const cancelMultipleOrder = async (req, res) => {
  const { selectedResources } = req.body;
  console.log("cancelMultipleOrder".bgYellow);

  try {
    const session = await Shopify.Utils.loadCurrentSession(req, res, false);
    let responses = [];
    const preferences = await db.Preferences.findOne({
      where: { storeId: session.id },
    });
 
    await Promise.all(
      selectedResources.map(async (ele) => {
        console.log("ele =====>", ele);
        let order = await db.ShipmentOrder.findOne({
          where: { id: ele, storeId: session.id },
        });
        let body = {
          generatedCN: order.generatedCN,
          userName: preferences.userName,
          password: preferences.password,
        };
        let data = await orderCancel(preferences.apiKey, body);
        //   let cn = data.data.bookingReply.result.split(":").pop();

        if (data.data.returnStatus.status == "SUCCESS") {
          console.log("SUCCESS is working ".bgYellow);

          const [row, created] = await db.ShipmentOrder.findOrCreate({
            where: { generatedCN: order.generatedCN, storeId: session.id },
            defaults: {},
          });
          if (!created) {
            row.isOrderCancel = true;
            await row.save();
          }

          let obj = {
            [`${order.shopifyOrderId}`]: {
              Responce: data.data,
            },
          };
          responses.push(obj);
        } else {
          console.log("SUCCESS is NOT  Working ".bgYellow);
          let obj = {
            [`${order.shopifyOrderId}`]: {
              Responce: data.data,
            },
          };
          responses.push(obj);
        }
      })
    );

    res.status(200).send({
      Responce: responses,
    });
  } catch (err) {
    console.log(`Error   = ${err.name}, ${err}`);
  }
};

export const reverseOrder = async (req, res) => {
  console.log("reverseOrder".red);

  try {
    const session = await Shopify.Utils.loadCurrentSession(req, res, false);

    const preferences = await db.Preferences.findOne({
      where: { storeId: session.id },
    });

    let body = {
      ...req.body,
      userName: preferences.userName,
      password: preferences.password,
    };

    let data = await orderReverse(preferences.apiKey, body);
    //   let cn = data.data.bookingReply.result.split(":").pop();

    let match = req.body.consignmentNo;
    console.log(
      body,
      preferences.userName,
      "======================".red.bold,
      data.data.returnStatus,
      match
    );

    if (data.data.returnStatus.status == "SUCCESS") {
      const [row, created] = await db.ShipmentOrder.findOrCreate({
        where: { generatedCN: match, storeId: session.id },
        defaults: {},
      });
      if (!created) {
        row.isOrderReverse = true;
        await row.save();
      }
      res.status(200).send({
        Responce: {
          status: data.data.returnStatus,
          row,
        },
      });
    } else {
      res.status(400).send({
        Responce: {
          status: data.data.returnStatus,
        },
      });
    }
  } catch (err) {
    console.log(`Error   = ${err.name}, ${err}`);
  }
};
export const reversMultipleOrder = async (req, res) => {
  const { selectedResources } = req.body;
  console.log("reverseOrderMore".red);

  try {
    const session = await Shopify.Utils.loadCurrentSession(req, res, false);
    let responses = [];
    const preferences = await db.Preferences.findOne({
      where: { storeId: session.id },
    });

    await Promise.all(
      selectedResources.map(async (ele) => {
        console.log("ele =====>", ele);
        let order = await db.ShipmentOrder.findOne({
          where: { id: ele, storeId: session.id },
        });

        let body = {
          generatedCN: order.generatedCN,
          costCenterCode: preferences.costCenterCode,
          consigneeMobNo: preferences.consigneeMobNo,
          userName: preferences.userName,
          password: preferences.password,
        };

        let data = await orderReverse(preferences.apiKey, body);
        //   let cn = data.data.bookingReply.result.split(":").pop();

        if (data.data.returnStatus.status == "SUCCESS") {
          const [row, created] = await db.ShipmentOrder.findOrCreate({
            where: { generatedCN: match, storeId: session.id },
            defaults: {},
          });
          if (!created) {
            row.isOrderReverse = true;
            await row.save();
          }

          let obj = {
            [`${order.shopifyOrderId}`]: {
              Responce: data.data,
            },
          };
          responses.push(obj);
        } else {
          let obj = {
            [`${order.shopifyOrderId}`]: {
              Responce: data.data,
            },
          };
          responses.push(obj);
        }
      })
    );

    res.status(200).send({
      Responce: responses,
    });
  } catch (err) {
    console.log(`Error   = ${err.name}, ${err}`);
  }
};
